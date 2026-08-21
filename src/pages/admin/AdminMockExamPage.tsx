import React, { useState } from 'react';
import { getMockExams, saveMockExam, getQuestions, getSubjects } from '../../services/storage';
import type { MockExam, ExamType } from '../../types';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Award, CheckCircle2, XCircle, 
  Trash2, Save, ChevronRight, Layers, ShieldCheck 
} from 'lucide-react';

export const AdminMockExamPage: React.FC = () => {
  const [exams, setExams] = useState<MockExam[]>(() => getMockExams());
  const [activeTab, setActiveTab] = useState<'EXAM_LIST' | 'BUILDER'>('EXAM_LIST');
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  // Verified Question Bank for Left Pane
  const verifiedQuestions = getQuestions({ verificationStatus: 'VERIFIED' });
  const subjects = getSubjects();

  // Builder State
  const [builderSubject, setBuilderSubject] = useState<string>('ALL');
  const [builderSearch, setBuilderSearch] = useState<string>('');

  const [examForm, setExamForm] = useState({
    title_en: 'TN DGE Official Pattern Mock Test 2026',
    title_ta: 'தமிழ்நாடு DGE அதிகாரப்பூர்வ மாதிரித் தேர்வு 2026',
    type: 'FULL_SIMULATION' as ExamType,
    duration_minutes: 180,
    total_questions: 180,
    pass_percentage: 40,
    status: 'PUBLISHED' as 'DRAFT' | 'PUBLISHED'
  });

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>(
    verifiedQuestions.slice(0, 10).map(q => q.id)
  );

  // Left Pane Filtered Questions
  const availableQuestions = verifiedQuestions.filter(q => {
    if (builderSubject !== 'ALL' && q.subject_id !== builderSubject) return false;
    if (builderSearch.trim() !== '') {
      const query = builderSearch.toLowerCase();
      if (!q.question_en.toLowerCase().includes(query) && !q.question_ta.includes(query)) return false;
    }
    return true;
  });

  // Center Pane Selected Questions
  const selectedQuestions = verifiedQuestions.filter(q => selectedQuestionIds.includes(q.id));

  // Live Validation Rules Checklist
  const hasVerifiedQuestions = selectedQuestions.every(q => q.verification_status === 'VERIFIED' || q.verification_status === 'PUBLISHED');
  const hasValidCount = selectedQuestions.length > 0;
  const hasDuration = examForm.duration_minutes > 0;
  const noDuplicates = new Set(selectedQuestionIds).size === selectedQuestionIds.length;
  const isFormValid = hasVerifiedQuestions && hasValidCount && hasDuration && noDuplicates;

  const handleAddQuestionToExam = (id: string) => {
    if (!selectedQuestionIds.includes(id)) {
      setSelectedQuestionIds(prev => [...prev, id]);
    }
  };

  const handleRemoveQuestionFromExam = (id: string) => {
    setSelectedQuestionIds(prev => prev.filter(x => x !== id));
  };

  const handleSaveExam = () => {
    if (!isFormValid) return;

    const newExam: MockExam = {
      id: selectedExamId || `mock-exam-${Date.now()}`,
      title_en: examForm.title_en,
      title_ta: examForm.title_ta,
      type: examForm.type,
      duration_minutes: examForm.duration_minutes,
      total_questions: selectedQuestions.length,
      pass_percentage: examForm.pass_percentage,
      status: examForm.status,
      questions: selectedQuestions,
      created_at: new Date().toISOString()
    };

    saveMockExam(newExam);
    setExams(getMockExams());
    setActiveTab('EXAM_LIST');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-400" />
            <span>Mock Exam Creator & Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Configure official NMMS 90-minute & 180-minute full exam simulations with verified question validation.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('EXAM_LIST')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'EXAM_LIST' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Mock Exams ({exams.length})
          </button>
          <button
            onClick={() => {
              setSelectedExamId(null);
              setActiveTab('BUILDER');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'BUILDER' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            + Create New Exam
          </button>
        </div>
      </div>

      {/* TAB 1: MOCK EXAMS LIST & ANALYTICS */}
      {activeTab === 'EXAM_LIST' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Mock Exams</span>
              <div className="text-2xl font-extrabold text-white">{exams.length} Exams</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Published Active Exams</span>
              <div className="text-2xl font-extrabold text-emerald-400">
                {exams.filter(e => e.status === 'PUBLISHED').length} Published
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Question Pool</span>
              <div className="text-2xl font-extrabold text-purple-400">{verifiedQuestions.length} Questions</div>
            </div>
          </div>

          {/* Exam Cards Grid */}
          {exams.length === 0 ? (
            <EmptyState
              icon={Award}
              title="No mock exams created"
              description="Click '+ Create New Exam' to configure an official NMMS mock exam."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exams.map(ex => (
                <div key={ex.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-md">
                  <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold text-purple-300 bg-purple-950/80 border border-purple-800 px-2.5 py-0.5 rounded-full uppercase">
                        {ex.type}
                      </span>
                      <h3 className="text-base font-extrabold text-white mt-1">{ex.title_en}</h3>
                      <p className="text-xs font-bold text-slate-400 font-tamil">{ex.title_ta}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      ex.status === 'PUBLISHED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {ex.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px] font-bold">Duration</div>
                      <div className="font-extrabold text-white">{ex.duration_minutes} Mins</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px] font-bold">Questions</div>
                      <div className="font-extrabold text-white">{ex.questions?.length || ex.total_questions} Qs</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px] font-bold">Pass Mark</div>
                      <div className="font-extrabold text-emerald-400">{ex.pass_percentage}%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-bold text-slate-500">ID: {ex.id}</span>
                    <button
                      onClick={() => {
                        setSelectedExamId(ex.id);
                        setExamForm({
                          title_en: ex.title_en,
                          title_ta: ex.title_ta,
                          type: ex.type,
                          duration_minutes: ex.duration_minutes,
                          total_questions: ex.total_questions,
                          pass_percentage: ex.pass_percentage,
                          status: ex.status
                        });
                        setSelectedQuestionIds(ex.questions?.map(q => q.id) || []);
                        setActiveTab('BUILDER');
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>Edit Exam</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: 3-PANE PROFESSIONAL MOCK EXAM BUILDER */}
      {activeTab === 'BUILDER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* LEFT PANE: VERIFIED QUESTION BANK (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 flex flex-col h-[750px]">
            <div className="space-y-1 border-b border-slate-800 pb-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Question Bank</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Only verified questions can be added to exams.
              </p>
            </div>

            {/* Left Pane Controls */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Search verified questions..."
                value={builderSearch}
                onChange={e => setBuilderSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />

              <select
                value={builderSubject}
                onChange={e => setBuilderSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="ALL">All Subjects</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name_en}</option>
                ))}
              </select>
            </div>

            {/* Question Pick List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {availableQuestions.map(q => {
                const isAdded = selectedQuestionIds.includes(q.id);
                return (
                  <div key={q.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-purple-400 font-mono">{q.id}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                        {q.subject_id === 'subj-mat' ? 'MAT' : q.subject_id}
                      </span>
                    </div>
                    <p className="text-xs text-white font-medium line-clamp-2">{q.question_en}</p>
                    
                    <button
                      onClick={() => handleAddQuestionToExam(q.id)}
                      disabled={isAdded}
                      className={`w-full py-1.5 rounded-xl font-extrabold text-[11px] transition-all cursor-pointer ${
                        isAdded 
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? 'Added to Exam' : '+ Add Question'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER PANE: SELECTED EXAM QUESTIONS (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 flex flex-col h-[750px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Selected Questions ({selectedQuestions.length})</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">Reorder or preview questions included in this exam.</p>
              </div>

              {selectedQuestions.length > 0 && (
                <button
                  onClick={() => setSelectedQuestionIds([])}
                  className="text-xs font-bold text-red-400 hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {selectedQuestions.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-500 font-medium">
                  No questions selected yet. Add questions from the left pane.
                </div>
              ) : (
                selectedQuestions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs relative group">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-purple-300">Q{idx + 1}. {q.id}</span>
                      <button
                        onClick={() => handleRemoveQuestionFromExam(q.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer p-1"
                        title="Remove question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs font-bold text-white leading-relaxed">{q.question_en}</p>

                    <div className="p-2 bg-slate-900 rounded-xl text-[11px] text-emerald-400 font-bold border border-slate-800">
                      Correct Answer: Option {q.correct_option}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT PANE: EXAM CONFIGURATION & VALIDATION CHECKLIST (3 Cols) */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-white border-b border-slate-800 pb-3">
                Exam Settings
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Exam Title (English)</label>
                <input
                  type="text"
                  value={examForm.title_en}
                  onChange={e => setExamForm(prev => ({ ...prev, title_en: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Exam Type</label>
                <select
                  value={examForm.type}
                  onChange={e => setExamForm(prev => ({ ...prev, type: e.target.value as ExamType }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-bold"
                >
                  <option value="FULL_SIMULATION">Full NMMS Simulation (180 Mins)</option>
                  <option value="MAT">MAT Only (90 Mins)</option>
                  <option value="SAT">SAT Only (90 Mins)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={examForm.duration_minutes}
                    onChange={e => setExamForm(prev => ({ ...prev, duration_minutes: Number(e.target.value) }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Pass %</label>
                  <input
                    type="number"
                    value={examForm.pass_percentage}
                    onChange={e => setExamForm(prev => ({ ...prev, pass_percentage: Number(e.target.value) }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-bold"
                  />
                </div>
              </div>

              {/* Live Validation Checklist */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-1">Validation Checklist</div>
                <div className={`text-xs font-semibold flex items-center gap-1.5 ${hasVerifiedQuestions ? 'text-emerald-400' : 'text-red-400'}`}>
                  {hasVerifiedQuestions ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <span>All questions verified</span>
                </div>
                <div className={`text-xs font-semibold flex items-center gap-1.5 ${hasValidCount ? 'text-emerald-400' : 'text-red-400'}`}>
                  {hasValidCount ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <span>{selectedQuestions.length} questions included</span>
                </div>
                <div className={`text-xs font-semibold flex items-center gap-1.5 ${hasDuration ? 'text-emerald-400' : 'text-red-400'}`}>
                  {hasDuration ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <span>Duration set ({examForm.duration_minutes} Mins)</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveExam}
              disabled={!isFormValid}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Publish Exam to Students</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
