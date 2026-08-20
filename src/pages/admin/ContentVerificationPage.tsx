import React, { useState, useMemo } from 'react';
import { getQuestions, saveQuestion, getSubjects } from '../../services/storage';
import type { Question, VerificationStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { FileCheck, Search, CheckCircle2, XCircle, AlertTriangle, ExternalLink, Filter } from 'lucide-react';

type FilterStatus = 'ALL' | VerificationStatus;

export const ContentVerificationPage: React.FC = () => {
  const subjects = getSubjects();
  const [questions, setQuestions] = useState<Question[]>(() =>
    getQuestions({ verificationStatus: 'ALL' })
  );
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('ALL');
  const [subjectFilter, setSubjectFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return questions.filter(q => {
      const matchStatus = statusFilter === 'ALL' || q.verification_status === statusFilter;
      const matchSubject = subjectFilter === 'ALL' || q.subject_id === subjectFilter;
      const matchSearch = !search || q.question_en.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSubject && matchSearch;
    });
  }, [questions, statusFilter, subjectFilter, search]);

  const updateStatus = (id: string, status: VerificationStatus) => {
    const q = questions.find(q => q.id === id);
    if (!q) return;
    const updated = { ...q, verification_status: status, verified_at: new Date().toISOString() };
    saveQuestion(updated);
    setQuestions(getQuestions({ verificationStatus: 'ALL' }));
    setExpandedId(null);
    const msg = status === 'VERIFIED'
      ? '✓ Question approved and verified.'
      : status === 'PUBLISHED'
      ? '✓ Question published to students.'
      : status === 'DRAFT'
      ? 'Question returned to draft.'
      : `Status changed to ${status}.`;
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const STATUS_FILTERS: { value: FilterStatus; label: string }[] = [
    { value: 'ALL',           label: 'All' },
    { value: 'DRAFT',         label: 'Draft' },
    { value: 'SOURCE_CHECK',  label: 'Source Check' },
    { value: 'TEACHER_REVIEW',label: 'Teacher Review' },
    { value: 'VERIFIED',      label: 'Verified' },
    { value: 'PUBLISHED',     label: 'Published' },
  ];

  return (
    <div className="space-y-5">

      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-purple-400" />
          Content Review & Verification
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, approve, or reject academic questions before they reach students.
        </p>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
          />
        </div>

        {/* Status tabs + Subject filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === f.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
          <div className="ml-auto">
            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg px-2 py-1.5 focus:outline-none focus:border-purple-500"
            >
              <option value="ALL">All Subjects</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name_en}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {filtered.length} question{filtered.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Questions List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileCheck}
          title="No questions match your filters"
          description="Try changing the status filter or clearing the search."
          className="bg-slate-900 rounded-2xl border border-slate-800"
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(q => {
            const isExpanded = expandedId === q.id;
            const subject = subjects.find(s => s.id === q.subject_id);
            return (
              <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                {/* Card Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="w-full text-left p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <Badge variant={q.verification_status} dot />
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                        {subject?.code ?? q.subject_id}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {q.source_name} {q.source_year} · p.{q.source_page}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200 line-clamp-2 text-left">
                      {q.question_en}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-tamil line-clamp-1 text-left">
                      {q.question_ta}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0 mt-1">{isExpanded ? '▲' : '▼'}</span>
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-slate-800 p-4 space-y-4">

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(['A', 'B', 'C', 'D'] as const).map(key => {
                        const optEn = q[`option_${key.toLowerCase()}_en` as keyof Question] as string;
                        const optTa = q[`option_${key.toLowerCase()}_ta` as keyof Question] as string;
                        const isCorrect = key === q.correct_option;
                        return (
                          <div
                            key={key}
                            className={`p-3 rounded-xl border text-xs ${
                              isCorrect
                                ? 'bg-emerald-950 border-emerald-800 text-emerald-200'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="font-mono font-bold mr-2">{key}.</span>
                            <span>{optEn}</span>
                            {optTa && optTa.trim() !== optEn.trim() && (
                              <div className="font-tamil text-slate-400 text-[11px] mt-0.5 ml-5">{optTa}</div>
                            )}
                            {isCorrect && (
                              <span className="ml-2 text-emerald-400 font-bold">✓ Correct</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="bg-slate-800 rounded-xl p-3 space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">Explanation (EN)</span>
                        <p className="text-slate-200">{q.explanation_en}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">விளக்கம் (TA)</span>
                        <p className="text-slate-200 font-tamil">{q.explanation_ta}</p>
                      </div>
                    </div>

                    {/* Source */}
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="font-bold text-slate-300">Source:</span>
                        <span>{q.source_name}</span>
                        <span>· Year {q.source_year}</span>
                        <span>· Page {q.source_page}</span>
                      </div>
                      {q.source_url && (
                        <a
                          href={q.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Source
                        </a>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => updateStatus(q.id, 'VERIFIED')}
                        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve & Verify
                      </button>
                      <button
                        onClick={() => updateStatus(q.id, 'PUBLISHED')}
                        className="flex items-center gap-1.5 px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Publish to Students
                      </button>
                      <button
                        onClick={() => updateStatus(q.id, 'TEACHER_REVIEW')}
                        className="flex items-center gap-1.5 px-3 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Request Correction
                      </button>
                      <button
                        onClick={() => updateStatus(q.id, 'DRAFT')}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-900/60 hover:bg-red-800/80 text-red-300 text-xs font-bold rounded-lg border border-red-800/50 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Return to Draft
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
