import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getOfficialPapers, 
  getTeacherAnnotation, saveTeacherAnnotation,
  getTeacherNote, saveTeacherNote,
  saveClassroomSession, getClassroomSessions
} from '../../services/storage';
import type { OfficialPaper, TeacherStroke } from '../../types';
import { PDFViewerPanel } from '../../components/classroom/PDFViewerPanel';
import { WhiteboardCanvas } from '../../components/classroom/WhiteboardCanvas';
import { 
  ArrowLeft, Maximize2, Minimize2, CheckCircle2, 
  MessageSquare, ShieldCheck, ExternalLink
} from 'lucide-react';

export const MentorClassroomPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();

  const [paper, setPaper] = useState<OfficialPaper | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'PDF' | 'WHITEBOARD' | 'NOTES'>('PDF');

  // Teacher Whiteboard & Notes State
  const [currentStrokes, setCurrentStrokes] = useState<TeacherStroke[]>([]);
  const [teacherNoteText, setTeacherNoteText] = useState<string>('');
  const [showNotesPanel, setShowNotesPanel] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('Saved ✓');

  // Load paper and resume session
  useEffect(() => {
    if (!paperId) return;
    const papers = getOfficialPapers();
    const found = papers.find(p => p.id === paperId);
    if (found) {
      setPaper(found);

      // Check saved classroom session to resume
      const sessions = getClassroomSessions();
      const session = sessions.find(s => s.paper_id === paperId);
      if (session && session.current_question_number) {
        setCurrentPage(session.current_question_number);
      }
    }
  }, [paperId]);

  // Load annotations & notes whenever paper or page changes
  useEffect(() => {
    if (!paper) return;

    const pageKey = `${paper.id}-page-${currentPage}`;

    // Load annotation for page
    const annot = getTeacherAnnotation(pageKey);
    if (annot) setCurrentStrokes(annot.strokes);
    else setCurrentStrokes([]);

    // Load note for page
    const note = getTeacherNote(pageKey);
    if (note) setTeacherNoteText(note.note_text);
    else setTeacherNoteText('');
  }, [paper, currentPage]);

  // Handle whiteboard stroke updates
  const handleStrokesChange = (newStrokes: TeacherStroke[]) => {
    if (!paper) return;
    setCurrentStrokes(newStrokes);
    const pageKey = `${paper.id}-page-${currentPage}`;
    
    saveTeacherAnnotation({
      id: `annot-${pageKey}`,
      paper_question_id: pageKey,
      teacher_id: 'mentor-1',
      strokes: newStrokes,
      updated_at: new Date().toISOString()
    });

    // Auto-save session
    saveClassroomSession({
      id: `session-${paper.id}`,
      paper_id: paper.id,
      title: `${paper.title_en} - Page ${currentPage}`,
      current_question_number: currentPage,
      teacher_id: 'mentor-1',
      last_accessed_at: new Date().toISOString()
    });

    setSaveStatus('Saved ✓');
  };

  // Handle Teacher Notes Save
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paper) return;
    const pageKey = `${paper.id}-page-${currentPage}`;

    saveTeacherNote({
      id: `note-${pageKey}`,
      paper_question_id: pageKey,
      teacher_id: 'mentor-1',
      note_text: teacherNoteText,
      updated_at: new Date().toISOString()
    });

    setSaveStatus('Note Saved ✓');
    setTimeout(() => setSaveStatus('Saved ✓'), 2500);
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

    if (e.key === 'f' || e.key === 'F') {
      setIsFullscreen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!paper) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-4">
        <h2 className="text-lg font-bold">Paper Not Found</h2>
        <button
          onClick={() => navigate('/official-papers')}
          className="px-4 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl"
        >
          Return to Paper Library
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen bg-slate-950 text-white overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      
      {/* ── CLASSROOM HEADER ── */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4 shrink-0 select-none">
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/official-papers')}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
            title="Exit Classroom"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-purple-300 bg-purple-950 px-2 py-0.5 rounded-full border border-purple-800">
                MENTOR CLASSROOM / ஆசிரியர் வகுப்பு
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Official DGE Source</span>
              </span>
            </div>

            <h1 className="text-xs sm:text-sm font-extrabold text-white leading-tight mt-0.5 truncate max-w-md">
              {paper.title_en}
            </h1>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2">
          
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{saveStatus}</span>
          </span>

          <button
            onClick={() => setShowNotesPanel(!showNotesPanel)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showNotesPanel ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Teacher Notes</span>
          </button>

          <a
            href={paper.original_pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="View Original DGE PDF Link"
          >
            <span className="hidden sm:inline">View Original PDF</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Mobile Tab Bar (<1024px) */}
      <div className="lg:hidden flex bg-slate-900 border-b border-slate-800 text-xs font-bold shrink-0">
        <button
          onClick={() => setMobileTab('PDF')}
          className={`flex-1 py-2.5 text-center cursor-pointer border-b-2 ${
            mobileTab === 'PDF' ? 'border-purple-500 text-white bg-slate-800' : 'border-transparent text-slate-400'
          }`}
        >
          Official PDF
        </button>
        <button
          onClick={() => setMobileTab('WHITEBOARD')}
          className={`flex-1 py-2.5 text-center cursor-pointer border-b-2 ${
            mobileTab === 'WHITEBOARD' ? 'border-purple-500 text-white bg-slate-800' : 'border-transparent text-slate-400'
          }`}
        >
          Whiteboard Workspace
        </button>
        <button
          onClick={() => setMobileTab('NOTES')}
          className={`flex-1 py-2.5 text-center cursor-pointer border-b-2 ${
            mobileTab === 'NOTES' ? 'border-purple-500 text-white bg-slate-800' : 'border-transparent text-slate-400'
          }`}
        >
          Teacher Notes
        </button>
      </div>

      {/* ── MAIN WORKSPACE AREA ── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: Responsive PDF Viewer Panel (55-60% width on Desktop) */}
        <div className={`w-full lg:w-[58%] p-3 lg:p-4 bg-slate-950 flex flex-col ${
          mobileTab === 'PDF' ? 'block' : 'hidden lg:flex'
        }`}>
          <PDFViewerPanel
            pdfUrl={paper.original_pdf_url}
            title={paper.title_en}
            totalPages={paper.total_questions > 90 ? 16 : 12}
            initialPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
            className="flex-1"
          />
        </div>

        {/* RIGHT PANEL: Sticky Whiteboard Workspace (40-45% width on Desktop) */}
        <div className={`w-full lg:w-[42%] p-3 lg:p-4 bg-slate-900 border-l border-slate-800 flex flex-col space-y-3 ${
          mobileTab === 'WHITEBOARD' || mobileTab === 'NOTES' ? 'block' : 'hidden lg:flex'
        }`}>
          
          {/* Context Header above Whiteboard */}
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center justify-between gap-2 shrink-0">
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">
                Explaining Teacher Context
              </span>
              <div className="text-xs font-extrabold text-white truncate">
                {paper.title_en} • Page {currentPage}
              </div>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Start a new clean whiteboard for this page explanation?')) {
                  setCurrentStrokes([]);
                  handleStrokesChange([]);
                }
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer shrink-0"
            >
              New Clean Board
            </button>
          </div>

          {/* Teacher Notes Collapsible Form */}
          {(showNotesPanel || mobileTab === 'NOTES') && (
            <form onSubmit={handleSaveNote} className="bg-slate-950 border border-amber-500/50 rounded-2xl p-4 space-y-3 shadow-xl shrink-0">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  Teacher Notes for Page {currentPage}
                </span>
                <button
                  type="submit"
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Save Note
                </button>
              </div>

              <textarea
                rows={3}
                placeholder="Type step-by-step hints, formulas, or explanation steps for this page..."
                value={teacherNoteText}
                onChange={e => setTeacherNoteText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-medium text-white focus:outline-none focus:border-amber-500"
              />
            </form>
          )}

          {/* Sticky Whiteboard Canvas */}
          <div className="flex-1 min-h-[350px] relative">
            <WhiteboardCanvas
              key={`wb-p${currentPage}`}
              initialStrokes={currentStrokes}
              onChange={handleStrokesChange}
              className="h-full"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
