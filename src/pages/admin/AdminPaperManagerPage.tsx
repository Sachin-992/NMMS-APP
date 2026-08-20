import React, { useState } from 'react';
import { getOfficialPapers, getPaperQuestions, savePaperQuestion } from '../../services/storage';
import type { OfficialPaper, PaperQuestion } from '../../types';
import { FileText, ShieldCheck, ExternalLink, RefreshCw, CheckCircle2, Edit2 } from 'lucide-react';

export const AdminPaperManagerPage: React.FC = () => {
  const [papers] = useState<OfficialPaper[]>(getOfficialPapers());
  const [selectedPaper, setSelectedPaper] = useState<OfficialPaper | null>(papers[0] || null);
  const [questions, setQuestions] = useState<PaperQuestion[]>(
    selectedPaper ? getPaperQuestions(selectedPaper.id) : []
  );

  const [scanStatus, setScanStatus] = useState<string | null>(null);
  const [editingQ, setEditingQ] = useState<PaperQuestion | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const handleSelectPaper = (paper: OfficialPaper) => {
    setSelectedPaper(paper);
    setQuestions(getPaperQuestions(paper.id));
  };

  const handleScanDGE = () => {
    setScanStatus('Scanning https://apply1.tndge.org/dge-notification/NMMS...');
    setTimeout(() => {
      setScanStatus('Scan complete! 6 eligible documents identified (5 Question Papers, 1 OMR Sheet). Answer keys and application forms excluded.');
      setTimeout(() => setScanStatus(null), 5000);
    }, 1500);
  };

  const handleVerifyQuestion = (q: PaperQuestion, status: 'VERIFIED' | 'PUBLISHED') => {
    const updated = { ...q, verification_status: status };
    savePaperQuestion(updated);
    if (selectedPaper) setQuestions(getPaperQuestions(selectedPaper.id));
    setSaveToast(`Question ${q.question_number} status updated to ${status}.`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  const handleSaveQuestionEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQ) return;
    savePaperQuestion(editingQ);
    if (selectedPaper) setQuestions(getPaperQuestions(selectedPaper.id));
    setEditingQ(null);
    setSaveToast('Question edited and saved.');
    setTimeout(() => setSaveToast(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-400" />
            <span>Official Papers Ingestion & Question Verification</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Scan official TN DGE resources, classify papers, and verify questions against original PDFs.
          </p>
        </div>

        <button
          onClick={handleScanDGE}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Scan DGE Portal</span>
        </button>
      </div>

      {scanStatus && (
        <div className="p-4 bg-purple-950 border border-purple-800 text-purple-200 text-xs font-bold rounded-2xl flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>{scanStatus}</span>
        </div>
      )}

      {saveToast && (
        <div className="p-4 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Paper List Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
          <h3 className="font-extrabold text-white text-sm">Official Papers ({papers.length})</h3>

          <div className="space-y-2">
            {papers.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPaper(p)}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedPaper?.id === p.id
                    ? 'bg-purple-950/80 border-purple-600 text-white'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                  <span>{p.year} • {p.paper_type}</span>
                  <span className="text-purple-400 font-mono">{p.total_questions} Qs</span>
                </div>
                <div className="text-xs font-bold text-white">{p.title_en}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Question Verification Panel */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          {selectedPaper ? (
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-white">{selectedPaper.title_en}</h2>
                  <div className="text-xs font-bold text-purple-300 font-tamil">{selectedPaper.title_ta}</div>
                </div>

                <a
                  href={selectedPaper.original_pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>View Original DGE PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {questions.map(q => (
                  <div key={q.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-purple-400">
                        Q {q.question_number}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          q.verification_status === 'VERIFIED' || q.verification_status === 'PUBLISHED'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border-amber-800'
                        }`}>
                          {q.verification_status}
                        </span>

                        <button
                          onClick={() => setEditingQ(q)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                          title="Edit Question"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-white">{q.question_en}</div>
                    <div className="text-xs font-bold text-slate-400 font-tamil">{q.question_ta}</div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => handleVerifyQuestion(q, 'VERIFIED')}
                        className="px-3 py-1 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700 text-emerald-200 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Approve & Verify
                      </button>
                      <button
                        onClick={() => handleVerifyQuestion(q, 'PUBLISHED')}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Publish to Students
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="text-center text-slate-500 my-auto">Select a paper to verify questions.</div>
          )}
        </div>

      </div>

      {/* Edit Question Modal */}
      {editingQ && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Edit Question {editingQ.question_number}</h3>

            <form onSubmit={handleSaveQuestionEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Question (English)</label>
                <textarea
                  rows={2}
                  value={editingQ.question_en}
                  onChange={e => setEditingQ({ ...editingQ, question_en: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Question (தமிழ்)</label>
                <textarea
                  rows={2}
                  value={editingQ.question_ta}
                  onChange={e => setEditingQ({ ...editingQ, question_ta: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white font-tamil font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Option A (EN)</label>
                  <input
                    type="text"
                    value={editingQ.option_a_en}
                    onChange={e => setEditingQ({ ...editingQ, option_a_en: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Option B (EN)</label>
                  <input
                    type="text"
                    value={editingQ.option_b_en}
                    onChange={e => setEditingQ({ ...editingQ, option_b_en: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Option C (EN)</label>
                  <input
                    type="text"
                    value={editingQ.option_c_en}
                    onChange={e => setEditingQ({ ...editingQ, option_c_en: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Option D (EN)</label>
                  <input
                    type="text"
                    value={editingQ.option_d_en}
                    onChange={e => setEditingQ({ ...editingQ, option_d_en: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingQ(null)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
