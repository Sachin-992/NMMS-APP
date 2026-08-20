import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getChecklistState, toggleChecklistState } from '../../services/storage';
import type { ChecklistItem } from '../../types';
import { CheckSquare, Square, Heart } from 'lucide-react';
import { EXAM_GUIDE_DATA } from '../../data/nmms_official_research';

export const ExamChecklistWidget: React.FC = () => {
  const { language } = useLanguage();
  const [items, setItems] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    setItems(getChecklistState());
  }, []);

  const handleToggle = (id: string) => {
    const updated = toggleChecklistState(id);
    setItems(updated);
  };

  const checkedCount = items.filter(i => i.checked).length;

  const fourPhases = [
    {
      phase_en: '1. Before Leaving Home / வீட்டிலிருந்து கிளம்பும் முன்',
      phase_ta: '1. வீட்டிலிருந்து கிளம்பும் முன்',
      items: [
        { id: 'p1-1', text_en: 'Printed Official Hall Ticket with candidate roll number', text_ta: 'அதிகாரப்பூர்வ ஹால் டிக்கெட் (Hall Ticket)' },
        { id: 'p1-2', text_en: '2 Black Ballpoint Pens (good quality, no gel/pencil)', text_ta: '2 கருப்பு பந்துமுனைப் பேனாக்கள் (Ballpoint Pen)' },
        { id: 'p1-3', text_en: 'School Identity Card signed by Headmaster', text_ta: 'பள்ளி அடையாள அட்டை (School ID Card)' },
        { id: 'p1-4', text_en: 'Clear transparent writing pad without markings', text_ta: 'வெளிப்படையான கார்ட்போர்டு / பேட்' }
      ]
    },
    {
      phase_en: '2. At the Examination Centre / தேர்வு மையத்தில்',
      phase_ta: '2. தேர்வு மையத்தில்',
      items: [
        { id: 'p2-1', text_en: 'Reach centre at least 45 minutes early', text_ta: '45 நிமிடங்களுக்கு முன்பாகவே சென்று சேருங்கள்' },
        { id: 'p2-2', text_en: 'Find assigned room & seat number', text_ta: 'ஒதுக்கப்பட்ட அறை மற்றும் இருக்கையைக் கண்டறியுங்கள்' },
        { id: 'p2-3', text_en: 'Listen attentively to invigilator instructions', text_ta: 'கண்காணிப்பாளரின் அறிவிப்புகளைக் கவனமாகக் கேளுங்கள்' }
      ]
    },
    {
      phase_en: '3. During the Examination / தேர்வின் போது',
      phase_ta: '3. தேர்வின் போது',
      items: [
        { id: 'p3-1', text_en: 'Verify Question Booklet serial number', text_ta: 'வினாத்தாள் வரிசை எண்ணைச் சரிபாருங்கள்' },
        { id: 'p3-2', text_en: 'Darken OMR bubbles completely with Black Ballpoint Pen', text_ta: 'OMR வட்டங்களை கருப்பு பேனாவால் முழுமையாக நிரப்புங்கள்' },
        { id: 'p3-3', text_en: 'Do rough work ONLY inside the Question Booklet', text_ta: 'கணக்கீடுகளை வினாப் புத்தகத்தில் மட்டுமே செய்யுங்கள்' }
      ]
    },
    {
      phase_en: '4. Before Submitting OMR / விடைத்தாளைச் சமர்ப்பிக்கும் முன்',
      phase_ta: '4. விடைத்தாளைச் சமர்ப்பிக்கும் முன்',
      items: [
        { id: 'p4-1', text_en: 'Ensure Roll Number & Register Details are shaded correctly', text_ta: 'பதிவெண் மற்றும் விவரங்கள் சரியாக குறிக்கப்பட்டுள்ளதா என சரிபாருங்கள்' },
        { id: 'p4-2', text_en: 'Check that OMR sheet is clean & uncreased', text_ta: 'OMR தாள் சுத்தமாக இருக்கிறதா என சரிபாருங்கள்' },
        { id: 'p4-3', text_en: 'Hand over OMR sheet directly to invigilator', text_ta: 'OMR விடைத்தாளைக் கண்காணிப்பாளரிடம் ஒப்படையுங்கள்' }
      ]
    }
  ];

  return (
    <div className="space-y-6">

      {/* Interactive Checklist Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <span>{language === 'ta' ? 'தேர்வு நாள் 4-படி சரிபார்ப்புப் பட்டியல்' : 'Interactive 4-Phase Exam Checklist'}</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Verify your exam day readiness across all 4 key stages.
            </p>
          </div>

          <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full shadow-xs">
            {checkedCount} Items Checked
          </span>
        </div>

        {/* 4 Phases */}
        <div className="space-y-6">
          {fourPhases.map((phase, pIdx) => (
            <div key={pIdx} className="space-y-3">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider bg-slate-100 px-3 py-1.5 rounded-xl inline-block">
                {phase.phase_en}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {phase.items.map(item => {
                  const isChecked = items.some(i => i.id === item.id && i.checked);

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleToggle(item.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-extrabold text-slate-900 leading-tight">
                          {item.text_en}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-600 font-tamil mt-0.5">
                          {item.text_ta}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXAM-DAY MINDSET CARDS ── */}
      <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-indigo-900">
        <div className="flex items-center gap-2 text-indigo-300 font-extrabold text-xs uppercase tracking-wider">
          <Heart className="w-4 h-4 text-pink-400" />
          <span>YOUR EXAM-DAY MINDSET / தேர்வு நாள் மனநிலை</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {EXAM_GUIDE_DATA.mentalPreparation.mindsetQuotes.map((q, idx) => (
            <div key={idx} className="p-4 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/10 space-y-1">
              <div className="text-xs font-extrabold text-white leading-snug">
                "{q.en}"
              </div>
              <div className="text-[11px] font-bold text-indigo-200 font-tamil leading-snug">
                "{q.ta}"
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
