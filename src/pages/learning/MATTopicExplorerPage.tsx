import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTopics } from '../../services/storage';
import { MAT_CATEGORIES } from '../../data/mat_topic_system';
import type { MATCategoryCode, TopicPriority } from '../../types';
import { 
  Brain, Calculator, BookOpen, Sparkles, Layers, 
  ChevronRight, ShieldCheck, Flame, Star, Target, CheckCircle2, AlertTriangle, Search
} from 'lucide-react';

const categoryIconMap: Record<MATCategoryCode, React.FC<{ className?: string }>> = {
  NUMBER_REASONING: Calculator,
  VERBAL_REASONING: BookOpen,
  NON_VERBAL_REASONING: Sparkles,
  LOGICAL_REASONING: Brain,
  SPATIAL_VISUAL: Layers
};

export const MATTopicExplorerPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const matTopics = getTopics('subj-mat');

  // Filter topics based on active tab and search
  const filteredTopics = matTopics.filter(topic => {
    const matchesCat = selectedCategory === 'ALL' || topic.category_code === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      topic.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.title_ta.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const getPriorityBadge = (priority?: TopicPriority) => {
    switch (priority) {
      case 'HIGH_PRIORITY':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
            <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
            <span>{language === 'ta' ? 'உயர்ந்த முன்னுரிமை' : 'HIGH PRIORITY'}</span>
          </span>
        );
      case 'MEDIUM_PRIORITY':
        return (
          <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-800 border border-indigo-200 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
            <Star className="w-3 h-3 text-indigo-600 fill-indigo-400" />
            <span>{language === 'ta' ? 'நடுத்தர முன்னுரிமை' : 'MEDIUM PRIORITY'}</span>
          </span>
        );
      case 'FOUNDATION':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
            <Target className="w-3 h-3 text-blue-600" />
            <span>{language === 'ta' ? 'அடிப்படைத் தலைப்பு' : 'FOUNDATION'}</span>
          </span>
        );
    }
  };

  const getDifficultyBadge = (level?: string) => {
    const isHard = level === 'HARD';
    const isEasy = level === 'EASY';
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
        isHard ? 'bg-red-50 text-red-700 border-red-200' :
        isEasy ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
        'bg-slate-100 text-slate-700 border-slate-200'
      }`}>
        {level || 'MEDIUM'}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/learn" className="hover:text-blue-600 transition-colors">Subjects</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Mental Ability Test (MAT)</span>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{language === 'ta' ? 'அதிகாரப்பூர்வ வினாத்தாள் ஆராய்ச்சி அடிப்படையில்' : 'Verified Official TN DGE NMMS Topic Structure'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {language === 'ta' ? 'மனத்திறன் தேர்வு (MAT) — பாடங்கள் சான்றளிக்கப்பட்ட மையம்' : 'Mental Ability Test (MAT) — Verified Topic Explorer'}
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            {language === 'ta' 
              ? 'தமிழ்நாடு DGE NMMS முந்தைய ஆண்டு வினாத்தாள்கள் (2018–2021) மற்றும் அதிகாரப்பூர்வ பாடத்திட்டத்தின் அடிப்படையில் 20 சான்றளிக்கப்பட்ட தலைப்புகள் 5 பிரிவுகளாக வகைப்படுத்தப்பட்டுள்ளன.'
              : 'Master 20 verified MAT reasoning topics categorized into 5 core reasoning domains, structured directly from official TN DGE previous-year question papers.'}
          </p>

          {/* Stat Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-extrabold">
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>20 Verified Topics</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-300" />
              <span>5 Reasoning Domains</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>High-Priority Exam Topics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Integrity Notice Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            {language === 'ta' ? 'தேர்வு தயாரிப்பு வழிகாட்டி அறிவிப்பு (2026–27)' : 'Important 2027 Preparation Guidance'}
          </p>
          <p className="text-amber-800 leading-relaxed font-medium">
            {language === 'ta'
              ? 'இங்குள்ள தலைப்புகள் மற்றும் முன்னுரிமை நிலைகள் முந்தைய ஆண்டு TN DGE NMMS வினாத்தாள்களில் தொடர்ந்து கேட்கப்பட்ட வினாக்களின் அடிப்படையில் அமைக்கப்பட்டவை. "2027 தேர்வில் இந்த வினாவே வரும்" போன்ற பொய்யான உறுதிமொழிகளை நாங்கள் வழங்குவதில்லை.'
              : 'Topic priorities and structural categories are derived strictly from recurring question patterns in official TN DGE NMMS papers (2018–2021). We prepare students based on official empirical evidence, not predictions.'}
          </p>
        </div>
      </div>

      {/* Search & Category Filter Tabs */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={language === 'ta' ? 'தலைப்பைத் தேடுக (எ.கா: எண் தொடர், குறியீடு)...' : 'Search MAT topic (e.g. Number Series, Coding)...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {language === 'ta' ? 'அனைத்து தலைப்புகள் (20)' : 'All Topics (20)'}
          </button>

          {MAT_CATEGORIES.map(cat => {
            const Icon = categoryIconMap[cat.code] || Brain;
            const count = matTopics.filter(t => t.category_code === cat.code).length;
            const isActive = selectedCategory === cat.code;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.code)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{language === 'ta' ? cat.name_ta : cat.name_en}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Topics Grouped by Category */}
      <div className="space-y-8">
        {MAT_CATEGORIES.filter(cat => selectedCategory === 'ALL' || selectedCategory === cat.code).map(cat => {
          const categoryTopics = filteredTopics.filter(t => t.category_code === cat.code);
          if (categoryTopics.length === 0) return null;

          const Icon = categoryIconMap[cat.code] || Brain;

          return (
            <div key={cat.id} className="space-y-4">
              
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {language === 'ta' ? cat.name_ta : cat.name_en}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {language === 'ta' ? cat.description_ta : cat.description_en}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200 shrink-0">
                  {categoryTopics.length} {language === 'ta' ? 'தலைப்புகள்' : 'Topics'}
                </span>
              </div>

              {/* Topic Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryTopics.map(topic => {
                  return (
                    <div
                      key={topic.id}
                      onClick={() => navigate(`/concept/${topic.id}`)}
                      className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2.5">
                        
                        {/* Priority + Difficulty Row */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          {getPriorityBadge(topic.priority)}
                          {getDifficultyBadge(topic.difficulty_level)}
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                            {topic.title_en}
                          </h3>
                          <p className="text-xs font-bold text-slate-500 font-tamil mt-0.5">
                            {topic.title_ta}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                          {language === 'ta' ? topic.description_ta : topic.description_en}
                        </p>

                        {/* Official Evidence Pill */}
                        {topic.source_evidence && (
                          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-[11px] text-slate-700 flex items-start gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <span className="font-extrabold text-slate-800">
                                {language === 'ta' ? 'அதிகாரப்பூர்வ சான்று:' : 'Official Evidence:'}
                              </span>
                              <p className="text-[10px] text-slate-600 font-medium">
                                {topic.source_evidence}
                              </p>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Footer CTA */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-500">
                          {topic.questions_count || 10} Questions Available
                        </span>
                        <span className="font-extrabold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>{language === 'ta' ? 'பாடத்தைக் கற்க' : 'Learn Topic'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
