import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import type { GuideFAQ } from '../../types';
import { Presentation, AlertTriangle } from 'lucide-react';
import { SourceBadgeModal } from '../../components/ui/SourceBadgeModal';
import { OMRTrainingWidget } from './OMRTrainingWidget';
import { ExamChecklistWidget } from './ExamChecklistWidget';
import { EXAM_GUIDE_DATA, VERIFIED_FAQS } from '../../data/nmms_official_research';
import { getOfficialPapers } from '../../services/storage';

export const ExamGuidePage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('OVERVIEW');

  const officialPapers = getOfficialPapers();

  const tabs = [
    { id: 'OVERVIEW', label_en: 'Overview', label_ta: 'முன்னோட்டம்' },
    { id: 'STRUCTURE', label_en: 'Exam Structure', label_ta: 'தேர்வு அமைப்பு' },
    { id: 'OMR', label_en: 'OMR Guide', label_ta: 'OMR வழிகாட்டி' },
    { id: 'STRATEGY', label_en: 'How to Attempt', label_ta: 'தேர்வு உத்திகள்' },
    { id: 'PROCEDURE', label_en: 'Exam Hall Procedure', label_ta: 'தேர்வறை நடைமுறைகள்' },
    { id: 'ITEMS', label_en: 'What to Bring', label_ta: 'எடுத்துச் செல்ல வேண்டியவை' },
    { id: 'CHECKLIST', label_en: 'Checklist & Mindset', label_ta: 'சரிபார்ப்பு & மனநிலை' },
    { id: 'PAPERS', label_en: 'Previous Exams', label_ta: 'முந்தைய வினாத்தாள்கள்' },
    { id: 'FAQ', label_en: 'Verified FAQ', label_ta: 'கேள்வி பதில்கள்' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* ── HERO BANNER ── */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-blue-800/50 space-y-4 relative overflow-hidden">
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-800/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-700/50 px-3 py-1 rounded-full">
              PUM NMMS Exam Readiness Centre
            </span>
            <SourceBadgeModal sourceType="CURRENT_NOTIFICATION" label="✓ Source Verified" />
          </div>

          <div className="text-xs text-blue-200 font-medium">
            PUM School, Echampatti • Class 8 Aspirants
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-3xl font-black leading-tight tracking-tight">
            {language === 'ta' ? 'NMMS தேர்வு அதிகாரப்பூர்வ வழிகாட்டி 2026–27' : 'Official TN NMMS Examination Guide'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 font-medium max-w-2xl mt-1.5 leading-relaxed font-tamil">
            தமிழ்நாடு அரசுத் தேர்வுகள் இயக்ககம் (TN DGE) மற்றும் முந்தைய அதிகாரப்பூர்வ வினாத்தாள்களை அடிப்படையாகக் கொண்ட சரிபார்க்கப்பட்ட வழிகாட்டி.
          </p>
        </div>

        {/* Source Hierarchy Legend Banner */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-slate-400 font-bold">Source Hierarchy:</span>
          <span className="bg-blue-950 text-blue-300 px-2.5 py-0.5 rounded-md border border-blue-800 font-semibold">1. Latest DGE Notification</span>
          <span className="bg-indigo-950 text-indigo-300 px-2.5 py-0.5 rounded-md border border-indigo-800 font-semibold">2. Previous-Year Papers</span>
          <span className="bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-md border border-emerald-800 font-semibold">3. OMR Rules</span>
        </div>

      </div>

      {/* ── HORIZONTALLY SCROLLABLE NAVIGATION TABS ── */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm overflow-x-auto flex items-center gap-1 scrollbar-none">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-colors shrink-0 cursor-pointer ${
              activeTab === t.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {language === 'ta' ? t.label_ta : t.label_en}
          </button>
        ))}
      </div>

      {/* ── TAB 1: OVERVIEW ── */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-extrabold text-slate-900">
                What is the NMMS Examination? / NMMS தேர்வு என்றால் என்ன?
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                The National Means-cum-Merit Scholarship (NMMS) scheme is implemented in Tamil Nadu by the Directorate of Government Examinations (TN DGE) for Class 8 students studying in Government and Aided schools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
                <SourceBadgeModal sourceType="PREVIOUS_PAPER_PATTERN" />
                <h3 className="font-extrabold text-blue-950 text-sm">Two Examination Papers ( conducted on same day)</h3>
                <p className="text-xs font-semibold text-blue-900 leading-relaxed">
                  <strong>Part I: MAT</strong> (90 Questions / 90 Mins / 90 Marks)<br/>
                  <strong>Part II: SAT</strong> (90 Questions / 90 Mins / 90 Marks)
                </p>
              </div>

              <div className="p-5 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2">
                <SourceBadgeModal sourceType="OFFICIAL_RULE" />
                <h3 className="font-extrabold text-purple-950 text-sm">OMR Shading & Evaluation</h3>
                <p className="text-xs font-semibold text-purple-900 leading-relaxed">
                  Answers are recorded on an OMR Answer Sheet using a <strong>Black Ballpoint Pen</strong>. Optical scanners evaluate full dark circle shading.
                </p>
              </div>

              <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                <SourceBadgeModal sourceType="RECOMMENDED_STRATEGY" />
                <h3 className="font-extrabold text-amber-950 text-sm">Scholarship Benefit</h3>
                <p className="text-xs font-semibold text-amber-900 leading-relaxed">
                  Selected Class 8 candidates receive <strong>Rs. 12,000 / year</strong> (Rs. 1,000/month) for 4 years from Class 9 to Class 12.
                </p>
              </div>

              <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                <SourceBadgeModal sourceType="OFFICIAL_RULE" />
                <h3 className="font-extrabold text-emerald-950 text-sm">Question Booklet Rough Work</h3>
                <p className="text-xs font-semibold text-emerald-900 leading-relaxed">
                  Rough work must be done inside the Question Booklet only. Rough work on OMR sheet is strictly prohibited.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ── TAB 2: EXAM STRUCTURE ── */}
      {activeTab === 'STRUCTURE' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Official Exam Structure & Subject Breakdown</h2>
              <p className="text-xs text-slate-500 font-medium">Based on Tamil Nadu DGE official previous-year question papers.</p>
            </div>
            <SourceBadgeModal sourceType="PREVIOUS_PAPER_PATTERN" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD 1: MAT */}
            <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-md space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full uppercase">
                    PART I
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">Mental Ability Test (MAT)</h3>
                  <div className="text-xs font-bold text-slate-500 font-tamil">மனத்திறன் தேர்வு (MAT)</div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-blue-600">90 Marks</div>
                  <div className="text-[11px] font-bold text-slate-500">90 Qs • 90 Mins</div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Key Focus Areas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {EXAM_GUIDE_DATA.previousYearPattern.mat.topics_en.map((topic, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white border border-slate-300 font-bold text-slate-800 rounded-xl">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-600 font-semibold bg-blue-50 p-3 rounded-xl border border-blue-100">
                Measures non-verbal reasoning, pattern completion, coding-decoding, and logical problem solving for Class 8 students.
              </div>
            </div>

            {/* CARD 2: SAT */}
            <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-md space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full uppercase">
                    PART II
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">Scholastic Aptitude Test (SAT)</h3>
                  <div className="text-xs font-bold text-slate-500 font-tamil">படிப்புத் திறன் தேர்வு (SAT)</div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-purple-600">90 Marks</div>
                  <div className="text-[11px] font-bold text-slate-500">90 Qs • 90 Mins</div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Previous-Year Subject Distribution (20 + 35 + 35 = 90):</span>
                
                <div className="space-y-2 text-xs">
                  {EXAM_GUIDE_DATA.previousYearPattern.sat.subjects.map((sub, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                      <div>
                        <span className="font-extrabold text-slate-900">{sub.name_en}</span>
                        <span className="text-[10px] text-slate-500 font-tamil ml-2">({sub.name_ta})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-500">{sub.qRange}</span>
                        <span className="px-2 py-0.5 bg-purple-100 font-black text-purple-900 rounded-lg">{sub.count} Qs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-600 font-semibold bg-purple-50 p-3 rounded-xl border border-purple-100">
                Covers Class 7 and Class 8 Tamil Nadu State Board syllabus for Mathematics, Science, and Social Science.
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ── TAB 3: OMR GUIDE ── */}
      {activeTab === 'OMR' && (
        <div className="space-y-6">
          <OMRTrainingWidget />
        </div>
      )}

      {/* ── TAB 4: HOW TO ATTEMPT ── */}
      {activeTab === 'STRATEGY' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">How to Use Your 90 Minutes (Recommended Strategy)</h2>
                <p className="text-xs text-slate-500 font-medium">Recommended exam strategy for Class 8 students. Not an official exam rule.</p>
              </div>
              <SourceBadgeModal sourceType="RECOMMENDED_STRATEGY" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {EXAM_GUIDE_DATA.timeManagementStrategy.rounds.map((r, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    {r.round_en.split(':')[0]}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm">{r.round_en}</h4>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">{r.desc_en}</p>
                  <p className="text-[11px] font-semibold text-slate-500 font-tamil">{r.desc_ta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STUCK CARD */}
          <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-300 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>{EXAM_GUIDE_DATA.timeManagementStrategy.stuckCard.title_en}</span>
            </div>

            <p className="text-xs font-bold text-amber-900 font-tamil">
              {EXAM_GUIDE_DATA.timeManagementStrategy.stuckCard.sub_ta}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-amber-950 pt-2 border-t border-amber-200">
              {EXAM_GUIDE_DATA.timeManagementStrategy.stuckCard.steps_en.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-white/80 rounded-xl border border-amber-200">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* MARKING SYSTEM & NEGATIVE MARKING NOTICE */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-400">Marking System / மதிப்பெண் வழங்கல்</span>
              <SourceBadgeModal sourceType="OFFICIAL_RULE" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-emerald-400">+1 Mark</span>
              <span className="text-xs text-slate-300 font-semibold">for each correct answer marked on the OMR sheet.</span>
            </div>

            <p className="text-xs font-semibold text-slate-300 bg-slate-800 p-3 rounded-xl border border-slate-700 leading-relaxed">
              ⚠️ {EXAM_GUIDE_DATA.markingSystem.negativeMarkingNotice_en}
            </p>
          </div>

        </div>
      )}

      {/* ── TAB 5: EXAM HALL PROCEDURE ── */}
      {activeTab === 'PROCEDURE' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Exam Hall Expected Sequence / தேர்வறை நடைமுறைகள்</h2>
              <p className="text-xs text-slate-500 font-medium">Standard sequence based on TN DGE candidate guidelines.</p>
            </div>
            <SourceBadgeModal sourceType="OFFICIAL_RULE" />
          </div>

          <div className="space-y-3">
            {[
              { step: 1, title_en: 'Reach Centre Early', title_ta: 'தேர்வு மையத்திற்கு முன்னதாகவே செல்லுதல்', desc: 'Reach at least 45 minutes before reporting time.' },
              { step: 2, title_en: 'Sit in Assigned Seat', title_ta: 'ஒதுக்கப்பட்ட இருக்கையில் அமர்தல்', desc: 'Check roll number on table.' },
              { step: 3, title_en: 'Listen to Invigilator', title_ta: 'கண்காணிப்பாளர் அறிவிப்புகளைக் கேட்டல்', desc: 'Follow all announcements carefully.' },
              { step: 4, title_en: 'Receive Question Booklet & OMR', title_ta: 'வினாத்தாள் & OMR பெறுதல்', desc: 'Check booklet serial number matches.' },
              { step: 5, title_en: 'Shade Details Carefully', title_ta: 'விவரங்களை OMR-ல் சரியாகக் குறித்தல்', desc: 'Use Black Ballpoint Pen only.' },
              { step: 6, title_en: 'Start Exam on Signal', title_ta: 'அறிவிப்பு வந்ததும் எழுதத் தொடங்குதல்', desc: 'Read instructions on cover page.' },
              { step: 7, title_en: 'Submit OMR Directly', title_ta: 'OMR தாளை நேரடியாக ஒப்படைத்தல்', desc: 'Hand over OMR sheet before leaving.' }
            ].map(s => (
              <div key={s.step} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{s.title_en} ({s.title_ta})</h4>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 6: WHAT TO BRING ── */}
      {activeTab === 'ITEMS' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-extrabold text-slate-900">What to Bring & What is NOT Allowed</h2>
              <p className="text-xs text-slate-500 font-medium">Categorized by official source requirements. Do not assume unconfirmed items.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* OFFICIALLY REQUIRED */}
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-3xl space-y-3">
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                  Officially Required
                </span>
                <ul className="text-xs font-bold text-emerald-950 space-y-2">
                  <li className="flex items-center gap-1.5">✓ Printed Official Hall Ticket</li>
                  <li className="flex items-center gap-1.5">✓ 2 Black Ballpoint Pens</li>
                  <li className="flex items-center gap-1.5">✓ School ID Card</li>
                </ul>
              </div>

              {/* CENTRE SPECIFIC */}
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-3xl space-y-3">
                <span className="text-[10px] font-black text-blue-800 bg-blue-200 px-2.5 py-0.5 rounded-full uppercase">
                  Centre-Specific / Recommended
                </span>
                <ul className="text-xs font-bold text-blue-950 space-y-2">
                  <li className="flex items-center gap-1.5">✓ Clear writing pad (no markings)</li>
                  <li className="flex items-center gap-1.5">✓ Transparent water bottle</li>
                </ul>
              </div>

              {/* DO NOT ASSUME */}
              <div className="p-5 bg-red-50 border border-red-200 rounded-3xl space-y-3">
                <span className="text-[10px] font-black text-red-800 bg-red-200 px-2.5 py-0.5 rounded-full uppercase">
                  Do Not Assume Allowed
                </span>
                <ul className="text-xs font-bold text-red-950 space-y-2">
                  <li className="flex items-center gap-1.5">✕ Calculators (PROHIBITED)</li>
                  <li className="flex items-center gap-1.5">✕ Mobile Phones / Smartwatches</li>
                  <li className="flex items-center gap-1.5">✕ Loose paper / Whitener</li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ── TAB 7: CHECKLIST & MINDSET ── */}
      {activeTab === 'CHECKLIST' && (
        <div className="space-y-6">
          <ExamChecklistWidget />
        </div>
      )}

      {/* ── TAB 8: PREVIOUS EXAMS ── */}
      {activeTab === 'PAPERS' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Learn From Official Previous-Year Question Papers</h2>
                <p className="text-xs text-slate-500 font-medium">Study authentic official papers published by the Tamil Nadu DGE.</p>
              </div>
              <SourceBadgeModal sourceType="PREVIOUS_PAPER_PATTERN" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {officialPapers.map(paper => (
                <div key={paper.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      {paper.year} • {paper.paper_type}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700">✓ Official DGE Source</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm">{paper.title_en}</h3>
                  <p className="text-xs text-slate-500 font-medium font-tamil">{paper.title_ta}</p>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <a
                      href={paper.original_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl text-center transition-colors inline-flex items-center justify-center gap-1"
                    >
                      <span>View PDF ↗</span>
                    </a>

                    <button
                      onClick={() => navigate(`/classroom/${paper.id}`)}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl text-center transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Presentation className="w-3.5 h-3.5" />
                      <span>{language === 'ta' ? 'வகுப்பறையைத் திற →' : 'Open Classroom →'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ── TAB 9: VERIFIED FAQ ── */}
      {activeTab === 'FAQ' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-extrabold text-slate-900">Verified Frequently Asked Questions (FAQ)</h2>
              <p className="text-xs text-slate-500 font-medium">All answers derived strictly from official DGE sources and candidate guidelines.</p>
            </div>

            <div className="space-y-4">
              {VERIFIED_FAQS.map((faq: GuideFAQ) => (
                <div key={faq.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-sm">Q: {faq.question_en}</h3>
                    <SourceBadgeModal sourceType="OFFICIAL_RULE" />
                  </div>
                  <p className="text-xs font-bold text-slate-500 font-tamil">Q: {faq.question_ta}</p>
                  
                  <div className="p-3 bg-white rounded-xl border border-slate-200 mt-2 space-y-1 text-xs font-semibold text-slate-800">
                    <p>{faq.answer_en}</p>
                    <p className="text-slate-600 font-tamil">{faq.answer_ta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
