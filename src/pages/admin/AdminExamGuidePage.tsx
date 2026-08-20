import React, { useState } from 'react';
import { getGuideFacts, saveGuideFact, getGuideSources, getGuideFAQs } from '../../services/storage';
import type { GuideFact, OfficialSource, GuideFAQ } from '../../types';
import { BookOpenCheck, Edit2, CheckCircle2 } from 'lucide-react';

export const AdminExamGuidePage: React.FC = () => {
  const [facts, setFacts] = useState<GuideFact[]>(getGuideFacts());
  const [sources] = useState<OfficialSource[]>(getGuideSources());
  const [faqs] = useState<GuideFAQ[]>(getGuideFAQs());

  const [activeTab, setActiveTab] = useState<'FACTS' | 'SOURCES' | 'FAQS'>('FACTS');
  const [editingFact, setEditingFact] = useState<GuideFact | null>(null);

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const handleSaveFact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFact) return;
    const updated = { ...editingFact, last_verified: new Date().toISOString() };
    saveGuideFact(updated);
    setFacts(getGuideFacts());
    setEditingFact(null);
    setSaveSuccessMsg('Fact updated and verified timestamp refreshed.');
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <BookOpenCheck className="w-6 h-6 text-purple-400" />
          <span>Exam Guide CMS & Official Source Management</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage verified academic facts, official DGE source URLs, and candidate instructions.
        </p>
      </div>

      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('FACTS')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'FACTS' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          Verified Facts ({facts.length})
        </button>
        <button
          onClick={() => setActiveTab('SOURCES')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'SOURCES' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          Official Sources ({sources.length})
        </button>
        <button
          onClick={() => setActiveTab('FAQS')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'FAQS' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          Verified FAQs ({faqs.length})
        </button>
      </div>

      {/* ─── FACTS CMS ─── */}
      {activeTab === 'FACTS' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="font-extrabold text-white text-sm">Exam Guide Fact Repository</h3>

            <div className="space-y-3">
              {facts.map(fact => (
                <div key={fact.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-full">
                        {fact.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        fact.status === 'CONFIRMED' 
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : fact.status === 'HISTORICAL'
                          ? 'bg-amber-950 text-amber-300 border-amber-800'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {fact.status}
                      </span>
                    </div>

                    <button
                      onClick={() => setEditingFact(fact)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white">{fact.fact_en}</div>
                    <div className="text-xs font-bold text-slate-400 font-tamil mt-0.5">{fact.fact_ta}</div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                    <span>Value: <strong className="text-purple-300">{fact.value}</strong></span>
                    <span>Last Verified: {new Date(fact.last_verified).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── SOURCES CMS ─── */}
      {activeTab === 'SOURCES' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="font-extrabold text-white text-sm">Official Sources Database</h3>

            <div className="space-y-3">
              {sources.map(src => (
                <div key={src.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-white text-xs">{src.title}</div>
                    <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                      {src.document_year}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{src.organization}</div>
                  <div className="text-[11px] font-mono text-purple-400 truncate">{src.url}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Fact Modal */}
      {editingFact && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Edit Verified Fact</h3>

            <form onSubmit={handleSaveFact} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Fact Description (English)</label>
                <textarea
                  rows={2}
                  required
                  value={editingFact.fact_en}
                  onChange={e => setEditingFact({ ...editingFact, fact_en: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Fact Description (தமிழ்)</label>
                <textarea
                  rows={2}
                  required
                  value={editingFact.fact_ta}
                  onChange={e => setEditingFact({ ...editingFact, fact_ta: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-tamil font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Status</label>
                  <select
                    value={editingFact.status}
                    onChange={e => setEditingFact({ ...editingFact, status: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white font-bold"
                  >
                    <option value="CONFIRMED">CONFIRMED (Current Official)</option>
                    <option value="HISTORICAL">HISTORICAL (Previous Exams)</option>
                    <option value="NOT_SPECIFIED">NOT SPECIFIED (Unconfirmed)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Summary Value</label>
                  <input
                    type="text"
                    value={editingFact.value}
                    onChange={e => setEditingFact({ ...editingFact, value: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingFact(null)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  Save Fact & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
