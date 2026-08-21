import React, { useState } from 'react';
import { getQuestions, saveQuestion, getSubjects, getTopics } from '../../services/storage';
import type { Question, VerificationStatus, SourceType, Difficulty } from '../../types';
import { 
  Upload, FileCheck, Search, Plus, CheckCircle2, XCircle, 
  ShieldCheck, FileText 
} from 'lucide-react';

export const QuestionImporterPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(() => getQuestions({ verificationStatus: 'ALL' }));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'BANK' | 'PDF_IMPORT' | 'MANUAL_ENTRY'>('BANK');

  // Filters
  const [filterSubject, setFilterSubject] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterSource, setFilterSource] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // PDF Extraction Queue Simulation State
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractedQueue, setExtractedQueue] = useState<Array<{
    id: string;
    question_en: string;
    question_ta: string;
    options_en: string[];
    correct_option: 'A' | 'B' | 'C' | 'D';
    page_num: number;
    extracted_status: 'QUEUED' | 'VERIFIED' | 'REJECTED';
  }>>([]);

  // Manual Add Form State
  const [manualForm, setManualForm] = useState({
    subject_id: 'subj-mat',
    topic_id: '',
    question_en: '',
    question_ta: '',
    option_a_en: '',
    option_b_en: '',
    option_c_en: '',
    option_d_en: '',
    correct_option: 'A' as 'A' | 'B' | 'C' | 'D',
    explanation_en: '',
    explanation_ta: '',
    source_type: 'OFFICIAL_QUESTION_PAPER' as SourceType,
    source_name: 'Tamil Nadu DGE Official Question Paper',
    source_year: 2024,
    difficulty: 'MEDIUM' as Difficulty,
    verification_status: 'VERIFIED' as VerificationStatus
  });

  const subjects = getSubjects();
  const topics = getTopics();

  // Filtered Questions list
  const filteredQuestions = questions.filter(q => {
    if (filterSubject !== 'ALL' && q.subject_id !== filterSubject) return false;
    if (filterStatus !== 'ALL' && q.verification_status !== filterStatus) return false;
    if (filterSource !== 'ALL' && q.source_type !== filterSource) return false;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchText = q.question_en.toLowerCase().includes(query) || q.question_ta.includes(query) || q.id.toLowerCase().includes(query);
      if (!matchText) return false;
    }
    return true;
  });

  // Single Question Status Update
  const handleStatusChange = (questionId: string, newStatus: VerificationStatus) => {
    const updated = questions.map(q => q.id === questionId ? { ...q, verification_status: newStatus } : q);
    setQuestions(updated);
    const targetQ = updated.find(q => q.id === questionId);
    if (targetQ) saveQuestion(targetQ);
  };

  // Bulk Operations
  const handleBulkSelectAll = () => {
    if (selectedIds.length === filteredQuestions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredQuestions.map(q => q.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBulkVerify = () => {
    const updated = questions.map(q => selectedIds.includes(q.id) ? { ...q, verification_status: 'VERIFIED' as VerificationStatus } : q);
    setQuestions(updated);
    updated.filter(q => selectedIds.includes(q.id)).forEach(q => saveQuestion(q));
    setSelectedIds([]);
  };

  const handleBulkReject = () => {
    const updated = questions.map(q => selectedIds.includes(q.id) ? { ...q, verification_status: 'DRAFT' as VerificationStatus } : q);
    setQuestions(updated);
    updated.filter(q => selectedIds.includes(q.id)).forEach(q => saveQuestion(q));
    setSelectedIds([]);
  };

  // Simulate PDF Extraction
  const handleSimulatePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsExtracting(true);

    setTimeout(() => {
      setExtractedQueue([
        {
          id: `pdf-ext-1`,
          question_en: 'If 2 + 5 = 12, 3 + 6 = 21, 4 + 7 = 32, then 5 + 8 = ?',
          question_ta: '2 + 5 = 12, 3 + 6 = 21, 4 + 7 = 32 எனில் 5 + 8 = ?',
          options_en: ['45', '48', '52', '55'],
          correct_option: 'A',
          page_num: 1,
          extracted_status: 'QUEUED'
        },
        {
          id: `pdf-ext-2`,
          question_en: 'Which instrument is used to measure atmospheric pressure?',
          question_ta: 'வளிமண்டல அழுத்தத்தை அளவிடப் பயன்படும் கருவி எது?',
          options_en: ['Thermometer', 'Barometer', 'Hydrometer', 'Anemometer'],
          correct_option: 'B',
          page_num: 2,
          extracted_status: 'QUEUED'
        }
      ]);
      setIsExtracting(false);
    }, 1200);
  };

  const handleAcceptExtracted = (extId: string) => {
    const item = extractedQueue.find(x => x.id === extId);
    if (!item) return;

    const newQ: Question = {
      id: `q-pdf-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      subject_id: 'subj-mat',
      topic_id: 'topic-mat-1',
      question_en: item.question_en,
      question_ta: item.question_ta,
      option_a_en: item.options_en[0] || '',
      option_a_ta: item.options_en[0] || '',
      option_b_en: item.options_en[1] || '',
      option_b_ta: item.options_en[1] || '',
      option_c_en: item.options_en[2] || '',
      option_c_ta: item.options_en[2] || '',
      option_d_en: item.options_en[3] || '',
      option_d_ta: item.options_en[3] || '',
      correct_option: item.correct_option,
      explanation_en: 'Extracted from official TN DGE paper PDF.',
      explanation_ta: 'அதிகாரப்பூர்வ தமிழ்நாடு DGE வினாத்தாளிலிருந்து பெறப்பட்டது.',
      difficulty: 'MEDIUM',
      question_type: 'MCQ',
      source_type: 'OFFICIAL_QUESTION_PAPER',
      source_name: 'TN DGE Official Paper PDF',
      source_url: 'https://dge.tn.gov.in',
      source_year: 2024,
      source_page: item.page_num,
      verification_status: 'VERIFIED',
      created_at: new Date().toISOString()
    };

    saveQuestion(newQ);
    setQuestions(prev => [newQ, ...prev]);
    setExtractedQueue(prev => prev.map(x => x.id === extId ? { ...x, extracted_status: 'VERIFIED' } : x));
  };

  // Handle Manual Form Submit
  const handleSaveManualQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.question_en.trim()) return;

    const newQ: Question = {
      id: `q-manual-${Date.now()}`,
      subject_id: manualForm.subject_id,
      topic_id: manualForm.topic_id || 'topic-mat-1',
      question_en: manualForm.question_en,
      question_ta: manualForm.question_ta || manualForm.question_en,
      option_a_en: manualForm.option_a_en,
      option_a_ta: manualForm.option_a_en,
      option_b_en: manualForm.option_b_en,
      option_b_ta: manualForm.option_b_en,
      option_c_en: manualForm.option_c_en,
      option_c_ta: manualForm.option_c_en,
      option_d_en: manualForm.option_d_en,
      option_d_ta: manualForm.option_d_en,
      correct_option: manualForm.correct_option,
      explanation_en: manualForm.explanation_en || 'Official reasoning logic.',
      explanation_ta: manualForm.explanation_ta || 'அதிகாரப்பூர்வ தர்க்க விளக்கம்.',
      difficulty: manualForm.difficulty,
      question_type: 'MCQ',
      source_type: manualForm.source_type,
      source_name: manualForm.source_name,
      source_url: 'https://dge.tn.gov.in',
      source_year: manualForm.source_year,
      source_page: 1,
      verification_status: manualForm.verification_status,
      created_at: new Date().toISOString()
    };

    saveQuestion(newQ);
    setQuestions(prev => [newQ, ...prev]);
    setActiveTab('BANK');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Upload className="w-6 h-6 text-purple-400" />
            <span>Question Bank & Import Workspace</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Manage verified TN DGE NMMS question papers, PDF extractions, and practice question banks.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('BANK')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'BANK' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Question Bank ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('PDF_IMPORT')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'PDF_IMPORT' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            PDF Upload & Extract
          </button>
          <button
            onClick={() => setActiveTab('MANUAL_ENTRY')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'MANUAL_ENTRY' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            + Add Question
          </button>
        </div>
      </div>

      {/* TAB 1: QUESTION BANK & BULK OPERATIONS */}
      {activeTab === 'BANK' && (
        <div className="space-y-5">
          
          {/* Filters Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search question text or ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Subject Filter */}
              <select
                value={filterSubject}
                onChange={e => setFilterSubject(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="ALL">All Subjects</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name_en}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="ALL">All Verification Statuses</option>
                <option value="VERIFIED">VERIFIED</option>
                <option value="UNDER_REVIEW">UNDER REVIEW</option>
                <option value="DRAFT">DRAFT</option>
              </select>

              {/* Source Filter */}
              <select
                value={filterSource}
                onChange={e => setFilterSource(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="ALL">All Question Sources</option>
                <option value="OFFICIAL_QUESTION_PAPER">Official Question Paper</option>
                <option value="TEACHER_CREATED_FROM_OFFICIAL_PATTERN">2027 Pattern Practice</option>
              </select>
            </div>

            {/* Bulk Actions Control Bar */}
            {selectedIds.length > 0 && (
              <div className="flex items-center justify-between p-3 bg-purple-950/60 border border-purple-800/80 rounded-2xl">
                <span className="text-xs font-bold text-purple-200">
                  {selectedIds.length} questions selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBulkVerify}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Bulk Verify</span>
                  </button>
                  <button
                    onClick={handleBulkReject}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Bulk Reject</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Question List Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredQuestions.length && filteredQuestions.length > 0}
                  onChange={handleBulkSelectAll}
                  className="rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                />
                <span>Select All ({filteredQuestions.length} Questions)</span>
              </div>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-500 font-medium">
                No questions found matching your filter criteria.
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80">
                {filteredQuestions.map(q => {
                  const isSelected = selectedIds.includes(q.id);
                  const isVerified = q.verification_status === 'VERIFIED' || q.verification_status === 'PUBLISHED';

                  return (
                    <div key={q.id} className={`p-4 transition-all ${isSelected ? 'bg-purple-950/20' : 'hover:bg-slate-800/40'}`}>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(q.id)}
                          className="mt-1 rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                        />

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center flex-wrap gap-2 text-xs">
                            <span className="font-extrabold text-purple-400 font-mono">{q.id}</span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold text-[10px]">
                              {q.subject_id === 'subj-mat' ? 'MAT' : q.subject_id}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              isVerified ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}>
                              {q.verification_status}
                            </span>

                            {q.source_type === 'OFFICIAL_QUESTION_PAPER' && (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                <span>Official Source: TN DGE</span>
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white">{q.question_en}</p>
                            {q.question_ta && q.question_ta !== q.question_en && (
                              <p className="text-xs font-bold text-slate-400 font-tamil">{q.question_ta}</p>
                            )}
                          </div>

                          {/* Options Preview */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                            {['A', 'B', 'C', 'D'].map((letter) => {
                              const optEnKey = `option_${letter.toLowerCase()}_en` as keyof Question;
                              const isCorrect = q.correct_option === letter;
                              return (
                                <div
                                  key={letter}
                                  className={`p-2 rounded-xl text-xs font-semibold ${
                                    isCorrect 
                                      ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-200' 
                                      : 'bg-slate-950 border border-slate-800 text-slate-400'
                                  }`}
                                >
                                  {letter}. {String(q[optEnKey] || '')}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {q.verification_status !== 'VERIFIED' ? (
                            <button
                              onClick={() => handleStatusChange(q.id, 'VERIFIED')}
                              className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all cursor-pointer"
                              title="Verify Question"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(q.id, 'DRAFT')}
                              className="p-2 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-400 hover:text-white transition-all cursor-pointer"
                              title="Mark as Draft"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: PDF UPLOAD & EXTRACTION QUEUE */}
      {activeTab === 'PDF_IMPORT' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
              <Upload className="w-8 h-8" />
            </div>

            <div className="space-y-1 max-w-md mx-auto">
              <h2 className="text-lg font-extrabold text-white">Upload Official TN DGE NMMS Question Paper PDF</h2>
              <p className="text-xs text-slate-400 font-medium">
                Upload official previous-year or model paper PDFs to extract questions into the review queue.
              </p>
            </div>

            <label className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer">
              <FileText className="w-4 h-4" />
              <span>{isExtracting ? 'Extracting Questions...' : 'Select PDF File'}</span>
              <input type="file" accept=".pdf" onChange={handleSimulatePdfUpload} className="hidden" />
            </label>
          </div>

          {/* Extraction Review Queue */}
          {extractedQueue.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>Extracted Questions Review Queue</span>
              </h3>

              <div className="space-y-3">
                {extractedQueue.map(item => (
                  <div key={item.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-purple-400">Page {item.page_num}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        item.extracted_status === 'VERIFIED' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {item.extracted_status}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white">{item.question_en}</p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold text-slate-400">Answer: Option {item.correct_option}</span>
                      {item.extracted_status !== 'VERIFIED' && (
                        <button
                          onClick={() => handleAcceptExtracted(item.id)}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          Verify & Save to Bank
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MANUAL QUESTION ENTRY */}
      {activeTab === 'MANUAL_ENTRY' && (
        <form onSubmit={handleSaveManualQuestion} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Plus className="w-5 h-5 text-purple-400" />
            <span>Add New Question Manually</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Subject</label>
              <select
                value={manualForm.subject_id}
                onChange={e => setManualForm(prev => ({ ...prev, subject_id: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name_en}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Topic</label>
              <select
                value={manualForm.topic_id}
                onChange={e => setManualForm(prev => ({ ...prev, topic_id: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                {topics.filter(t => t.subject_id === manualForm.subject_id).map(t => (
                  <option key={t.id} value={t.id}>{t.title_en}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Source Type</label>
              <select
                value={manualForm.source_type}
                onChange={e => setManualForm(prev => ({ ...prev, source_type: e.target.value as SourceType }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="OFFICIAL_QUESTION_PAPER">Official Question Paper</option>
                <option value="TEACHER_CREATED_FROM_OFFICIAL_PATTERN">2027 Pattern Practice</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Question (English)</label>
              <textarea
                required
                rows={2}
                value={manualForm.question_en}
                onChange={e => setManualForm(prev => ({ ...prev, question_en: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter English question text..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Question (Tamil)</label>
              <textarea
                rows={2}
                value={manualForm.question_ta}
                onChange={e => setManualForm(prev => ({ ...prev, question_ta: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-tamil"
                placeholder="Enter Tamil question text..."
              />
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Option A</label>
              <input
                type="text"
                required
                value={manualForm.option_a_en}
                onChange={e => setManualForm(prev => ({ ...prev, option_a_en: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Option B</label>
              <input
                type="text"
                required
                value={manualForm.option_b_en}
                onChange={e => setManualForm(prev => ({ ...prev, option_b_en: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Option C</label>
              <input
                type="text"
                required
                value={manualForm.option_c_en}
                onChange={e => setManualForm(prev => ({ ...prev, option_c_en: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Option D</label>
              <input
                type="text"
                required
                value={manualForm.option_d_en}
                onChange={e => setManualForm(prev => ({ ...prev, option_d_en: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Correct Option & Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Correct Answer</label>
              <select
                value={manualForm.correct_option}
                onChange={e => setManualForm(prev => ({ ...prev, correct_option: e.target.value as 'A' | 'B' | 'C' | 'D' }))}
                className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-extrabold focus:outline-none focus:border-purple-500"
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Save Question to Bank
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
