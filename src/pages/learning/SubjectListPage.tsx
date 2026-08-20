import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getSubjects, getTopics } from '../../services/storage';
import { EmptyState } from '../../components/ui/EmptyState';
import { Brain, Calculator, Atom, Globe, BookOpen, ArrowRight } from 'lucide-react';

const iconMap: Record<string, any> = {
  Brain,
  Calculator,
  Atom,
  Globe,
};

const bgColors: Record<string, string> = {
  MAT: 'from-blue-600 to-blue-800 text-white',
  SAT_MATH: 'from-indigo-600 to-indigo-800 text-white',
  SAT_SCIENCE: 'from-emerald-600 to-emerald-800 text-white',
  SAT_SOCIAL: 'from-amber-600 to-amber-800 text-white',
};

const borderColors: Record<string, string> = {
  MAT: 'hover:border-blue-400',
  SAT_MATH: 'hover:border-indigo-400',
  SAT_SCIENCE: 'hover:border-emerald-400',
  SAT_SOCIAL: 'hover:border-amber-400',
};

export const SubjectListPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const subjects = getSubjects();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-600" />
          <span>{language === 'ta' ? 'NMMS பாடங்கள்' : 'NMMS Subjects'}</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          {language === 'ta'
            ? 'மனத்திறன் தேர்வு (MAT) மற்றும் பாடம் சார்ந்த படிப்புத் திறன் தேர்வு (SAT) பாடங்கள்.'
            : 'Explore Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT) subjects.'}
        </p>
      </div>

      {subjects.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No subjects available"
          description="Syllabus subjects will appear here once configured."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjects.map(subj => {
            const Icon = iconMap[subj.icon] || BookOpen;
            const bannerGradient = bgColors[subj.code] || 'from-slate-700 to-slate-900 text-white';
            const borderHover = borderColors[subj.code] || 'hover:border-blue-400';
            const topicsCount = getTopics(subj.id).length;

            return (
              <div
                key={subj.id}
                onClick={() => navigate(`/learn/${subj.code}`)}
                className={`bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group ${borderHover}`}
              >
                {/* Header Banner */}
                <div className={`p-6 bg-gradient-to-br ${bannerGradient} relative overflow-hidden`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-extrabold bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-white">
                      {subj.code}
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold mt-4 leading-snug">
                    {language === 'ta' ? subj.name_ta : subj.name_en}
                  </h2>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                    {language === 'ta' ? subj.description_ta : subj.description_en}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">
                      {topicsCount} {topicsCount === 1 ? 'Topic' : 'Topics'}
                    </span>
                    <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{language === 'ta' ? 'கற்க' : 'Start'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
