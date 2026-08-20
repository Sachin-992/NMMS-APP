import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getMistakes } from '../../services/storage';
import { Layers, ArrowRight, BookOpen, HelpCircle } from 'lucide-react';
import { EmptyState } from '../../components/ui/EmptyState';

export const SmartRevisionPage: React.FC = () => {
  const { student } = useAuth();
  const { language } = useLanguage();

  if (!student) return null;

  const mistakes = getMistakes(student.id).filter(m => !m.resolved && m.question);
  const totalPending = mistakes.length;

  // Group by subject via question.subject_id
  const grouped: Record<string, typeof mistakes> = {};
  for (const m of mistakes) {
    const key = m.question?.subject_id ?? 'unknown';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  }

  const subjectLabels: Record<string, { en: string; ta: string; color: string }> = {
    'subj-mat':     { en: 'Mental Ability (MAT)', ta: 'மனத்திறன் தேர்வு (MAT)', color: 'bg-blue-100 text-blue-800' },
    'subj-math':    { en: 'Mathematics',           ta: 'கணிதம்',                 color: 'bg-indigo-100 text-indigo-800' },
    'subj-science': { en: 'Science',               ta: 'அறிவியல்',               color: 'bg-emerald-100 text-emerald-800' },
    'subj-social':  { en: 'Social Science',        ta: 'சமூக அறிவியல்',          color: 'bg-amber-100 text-amber-800' },
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900">
            {language === 'ta' ? 'சிறந்த மீள்பார்வை' : 'Smart Revision'}
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          {language === 'ta'
            ? 'உங்கள் பிழைகளை அடிப்படையாகக் கொண்ட தனிப்பட்ட மீள்பார்வை வரிசை.'
            : 'Your personalised revision queue based on mistakes and weak areas.'}
        </p>
      </div>

      {/* Summary */}
      {totalPending > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-indigo-900 text-sm">
                {totalPending} question{totalPending > 1 ? 's' : ''} need{totalPending === 1 ? 's' : ''} revision
              </div>
              <div className="text-xs text-indigo-700 mt-0.5">
                {language === 'ta' ? 'பிழைப் புத்தகத்தில் இருந்து' : 'From your Mistake Book'}
              </div>
            </div>
            <Link
              to="/mistakes"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              <span>{language === 'ta' ? 'மீண்டும் முயல்' : 'Revise Now'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Subject-wise breakdown */}
      {totalPending > 0 ? (
        <div className="space-y-3">
          {Object.entries(grouped).map(([subjectId, items]) => {
            const label = subjectLabels[subjectId];
            const name = language === 'ta' ? (label?.ta ?? subjectId) : (label?.en ?? subjectId);
            const colorClass = label?.color ?? 'bg-slate-100 text-slate-800';
            return (
              <div key={subjectId} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colorClass}`}>{name}</span>
                  <span className="text-xs font-bold text-slate-500">{items.length} pending</span>
                </div>
                <div className="space-y-2">
                  {items.slice(0, 3).map(m => (
                    <div key={m.id} className="flex items-start gap-2 text-xs text-slate-600">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">
                        {language === 'ta'
                          ? (m.question?.question_ta ?? m.question?.question_en ?? 'Unknown question')
                          : (m.question?.question_en ?? 'Unknown question')}
                      </span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <div className="text-xs text-slate-400 font-medium ml-5">
                      +{items.length - 3} more...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title={language === 'ta' ? 'மீள்பார்வை தேவையில்லை' : 'Nothing to revise!'}
          description={
            language === 'ta'
              ? 'அனைத்து பிழைகளும் தீர்க்கப்பட்டன அல்லது இன்னும் பயிற்சி செய்யவில்லை. பயிற்சி செய்து, தவறான வினாக்கள் இங்கே தோன்றும்.'
              : 'All your mistakes have been resolved, or you haven\'t practiced yet. Practice questions and incorrect answers will appear here for revision.'
          }
          action={{ label: 'Start Practicing', onClick: () => {} }}
        />
      )}
    </div>
  );
};
