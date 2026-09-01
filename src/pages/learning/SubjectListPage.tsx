import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getSubjects, getTopics, getConcepts } from '../../services/storage';
import { EmptyState } from '../../components/ui/EmptyState';
import { Brain, Calculator, Atom, Globe, BookOpen, ArrowRight, ShieldCheck, Flame, Info } from 'lucide-react';

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
  const allConcepts = getConcepts();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-600" />
          <span>{language === 'ta' ? 'NMMS பாடங்கள் & தேர்வுப் பகுதிகள்' : 'NMMS Subjects & Portion Explorer'}</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          {language === 'ta'
            ? 'மனத்திறன் தேர்வு (MAT - 90 மதிப்பெண்) மற்றும் படிப்புத் திறன் தேர்வு (SAT - 90 மதிப்பெண்) பாடப் பகுதிகள்.'
            : 'Explore Mental Ability Test (MAT - 90 Marks) and Scholastic Aptitude Test (SAT - 90 Marks) verified subjects.'}
        </p>
      </div>

      {/* 2027 Official Preparation Disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-extrabold block">
            {language === 'ta' ? 'அதிகாரப்பூர்வ TN DGE 2027 தயாரிப்பு வழிகாட்டுதல்:' : 'Official TN DGE 2027 Preparation Guidance:'}
          </span>
          <span>
            {language === 'ta'
              ? 'பாடப் பகுதிகள் தமிழ்நாடு DGE அதிகாரப்பூர்வ NMMS வினாத்தாள்கள் (2018–2024) மற்றும் சமச்சீர் கல்வி 7, 8 பாடத்திட்டத்தின்படி வடிவமைக்கப்பட்டுள்ளது. TN DGE வெளியிடும் அதிகாரப்பூர்வ அறிவிப்பே இறுதி முடிவாகும்.'
              : 'Topic coverage is based on official TN DGE NMMS syllabus patterns (2018–2024) and Samacheer Kalvi Class 7 & 8 portions. The latest official TN DGE notification should always be treated as final authority.'}
          </span>
        </div>
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
            
            const subjTopics = getTopics(subj.id);
            const topicsCount = subjTopics.length;

            const topicIdsSet = new Set(subjTopics.map(t => t.id));
            const conceptsCount = allConcepts.filter(c => topicIdsSet.has(c.topic_id)).length;
            const highPriorityCount = subjTopics.filter(t => t.priority === 'HIGH_PRIORITY').length;

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
                    <span className="text-xs font-extrabold bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-white flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-white" />
                      <span>{subj.code}</span>
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

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">
                        {topicsCount} {topicsCount === 1 ? 'Topic' : 'Topics'}
                      </span>
                      <span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                        {conceptsCount > 0 ? conceptsCount : topicsCount * 2} Concepts
                      </span>
                    </div>

                    {highPriorityCount > 0 && (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{highPriorityCount} High Priority Topics</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Officially Verified
                    </span>
                    <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{language === 'ta' ? 'படிக்க' : 'Start'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
