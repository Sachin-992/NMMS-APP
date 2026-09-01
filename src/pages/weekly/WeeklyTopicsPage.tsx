import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTopics, getConcepts, getQuestions, getMistakes } from '../../services/storage';
import type { Topic, Concept, Question } from '../../types';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { 
  Sparkles, BookOpen, Brain, ShieldAlert, Award, 
  CheckCircle2, ArrowRight, ChevronRight 
} from 'lucide-react';

export interface WeeklyTopicProgress {
  topic: Topic;
  concepts: Concept[];
  questions: Question[];
  conceptsLearned: number;
  practiceCompleted: number;
  mistakesCount: number;
  accuracy: number;
  status: 'NOT_STARTED' | 'LEARNING' | 'READY_TO_PRACTICE' | 'PRACTICING' | 'NEEDS_REVISION' | 'MASTERED';
}

export const WEEKLY_TOPIC_IDS = [
  'topic-sat-soc-7IG3',        // 7.I.G.3 Population and Settlement
  'topic-sat-soc-8E1',         // 8.E.1 Money, Savings and Investments
  'topic-sat-soc-secularism'   // 8.C.3 Understanding Secularism
];

export const WeeklyTopicsPage: React.FC = () => {
  const { student } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [weeklyItems, setWeeklyItems] = useState<WeeklyTopicProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allTopics = getTopics();
    const allConcepts = getConcepts();
    const allQuestions = getQuestions();

    const mistakes = student ? getMistakes(student.id).filter(m => !m.resolved) : [];

    const items: WeeklyTopicProgress[] = WEEKLY_TOPIC_IDS.map(topicId => {
      const topic = allTopics.find(t => t.id === topicId) || {
        id: topicId,
        subject_id: 'subj-social',
        title_en: topicId === 'topic-sat-soc-7IG3' ? '7.I.G.3 — Population and Settlement' : topicId === 'topic-sat-soc-8E1' ? '8.E.1 — Money, Savings and Investments' : '8.C.3 — Understanding Secularism',
        title_ta: topicId === 'topic-sat-soc-7IG3' ? '7.I.G.3 — மக்கள் தொகை மற்றும் குடியிருப்புகள்' : topicId === 'topic-sat-soc-8E1' ? '8.E.1 — பணம், சேமிப்பு மற்றும் முதலீடுகள்' : '8.C.3 — மதச்சார்பின்மையைப் புரிந்துகொள்ளுதல்',
        description_en: 'Weekly focus learning topic',
        description_ta: 'வாராந்திரக் கற்றல் பாடம்',
        order_index: 1,
        priority: 'HIGH_PRIORITY',
        confidence: 'HIGH',
        syllabus_status: 'EXPLICIT_OFFICIAL',
        years_found: [2024],
        frequency: 'HIGH',
        source_evidence: 'TN Samacheer Kalvi'
      };

      const concepts = allConcepts.filter(c => c.topic_id === topicId);
      const questions = allQuestions.filter(q => q.topic_id === topicId);
      const topicMistakes = mistakes.filter(m => m.question?.topic_id === topicId);

      // Check student progress stored in localStorage
      const storageKey = `weekly_topic_progress_${student?.id || 'guest'}_${topicId}`;
      const saved = localStorage.getItem(storageKey);

      let conceptsLearned = 0;
      let practiceCompleted = 0;
      let accuracy = 0;

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          conceptsLearned = parsed.conceptsLearned || 0;
          practiceCompleted = parsed.practiceCompleted || 0;
          accuracy = parsed.accuracy || 0;
        } catch (e) {
          console.error(e);
        }
      }

      // Determine status
      let status: WeeklyTopicProgress['status'] = 'NOT_STARTED';
      if (conceptsLearned === concepts.length && practiceCompleted >= Math.min(10, questions.length) && accuracy >= 80) {
        status = 'MASTERED';
      } else if (topicMistakes.length > 0) {
        status = 'NEEDS_REVISION';
      } else if (practiceCompleted > 0) {
        status = 'PRACTICING';
      } else if (conceptsLearned >= concepts.length && concepts.length > 0) {
        status = 'READY_TO_PRACTICE';
      } else if (conceptsLearned > 0) {
        status = 'LEARNING';
      }

      return {
        topic,
        concepts,
        questions,
        conceptsLearned,
        practiceCompleted,
        mistakesCount: topicMistakes.length,
        accuracy,
        status
      };
    });

    setWeeklyItems(items);
    setLoading(false);
  }, [student]);

  const totalWeeklyTopics = weeklyItems.length;
  const completedWeeklyTopics = weeklyItems.filter(item => item.status === 'MASTERED').length;

  const getStatusBadge = (status: WeeklyTopicProgress['status']) => {
    switch (status) {
      case 'MASTERED':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>✓ {language === 'ta' ? 'பாடம் தேர்ச்சி பெற்றது' : 'Topic Mastered'}</span>
          </span>
        );
      case 'NEEDS_REVISION':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>⚠ {language === 'ta' ? 'மறுபார்வை தேவை' : 'Needs Revision'}</span>
          </span>
        );
      case 'PRACTICING':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            <Brain className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'பயிற்சியில் உள்ளது' : 'Practicing'}</span>
          </span>
        );
      case 'READY_TO_PRACTICE':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'ta' ? 'பயிற்சிக்குத் தயார்' : 'Ready to Practice'}</span>
          </span>
        );
      case 'LEARNING':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'கற்றுக்கொண்டிருக்கிறார்' : 'Learning'}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <span>○ {language === 'ta' ? 'தொடங்கப்படவில்லை' : 'Not Started'}</span>
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        {language === 'ta' ? 'வாராந்திர பாடங்கள் ஏற்றப்படுகின்றன...' : 'Loading Weekly Focus Topics...'}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>THIS WEEK'S NMMS FOCUS • 31 Aug — 03 Sep 2026</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === 'ta' ? 'இந்த வாரக் கற்றல் மையம் (Weekly Learning Hub)' : 'Weekly Topics Learning Hub'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium">
              {language === 'ta' 
                ? 'இந்த வாரத்திற்கான 3 முக்கிய பாடங்களைக் கற்று, வினாக்களைப் பயிற்சி செய்து NMMS தேர்வுக்குத் தயாராகுங்கள்.'
                : 'Focus on these topics this week and strengthen your NMMS preparation step-by-step.'}
            </p>
          </div>

          {/* Dynamic Progress Indicator */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shrink-0 min-w-[240px] text-center space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span>{language === 'ta' ? 'வாராந்திர முன்னேற்றம்' : 'Weekly Progress'}</span>
              <span className="text-amber-300 font-extrabold">{completedWeeklyTopics} / {totalWeeklyTopics} {language === 'ta' ? 'பாடங்கள்' : 'Topics'}</span>
            </div>
            
            <ProgressBar 
              value={completedWeeklyTopics} 
              max={totalWeeklyTopics} 
              color="amber"
            />

            <div className="text-[11px] text-slate-300 font-medium">
              {completedWeeklyTopics === totalWeeklyTopics 
                ? (language === 'ta' ? '🎉 வாழ்த்துகள்! இந்த வாரப் பாடங்கள் முடிந்தது.' : '🎉 Great job! All weekly topics completed.')
                : (language === 'ta' ? `${totalWeeklyTopics - completedWeeklyTopics} பாடங்கள் பாக்கி உள்ளன` : `${totalWeeklyTopics - completedWeeklyTopics} topic(s) left this week`)}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Journey Roadmap Banner */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between text-xs font-bold text-slate-600 overflow-x-auto gap-2">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg shrink-0">1. WEEKLY TOPIC</span>
        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg shrink-0">2. LEARN CONCEPTS</span>
        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg shrink-0">3. PRACTICE MCQs</span>
        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg shrink-0">4. REVIEW MISTAKES</span>
        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg shrink-0">5. MOCK EXAM</span>
      </div>

      {/* Weekly Topics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeklyItems.map(({ topic, concepts, questions, conceptsLearned, practiceCompleted, mistakesCount, status }) => (
          <div 
            key={topic.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group relative"
          >
            <div className="space-y-3">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  SAT • {topic.category_id ? topic.category_id.toUpperCase() : 'SOCIAL SCIENCE'}
                </span>
                
                {getStatusBadge(status)}
              </div>

              {/* Title & Code */}
              <div>
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block mb-1">
                  Code: {topic.id === 'topic-sat-soc-7IG3' ? '7.I.G.3' : topic.id === 'topic-sat-soc-8E1' ? '8.E.1' : '8.C.3'}
                </span>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {topic.title_en}
                </h2>
                <h3 className="text-sm font-semibold text-slate-600 mt-0.5">
                  {topic.title_ta}
                </h3>
              </div>

              {/* Dynamic Database Numbers */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-150">
                <div>
                  <span className="text-slate-400 block font-medium">Concepts</span>
                  <span className="font-extrabold text-slate-800 text-sm">
                    {conceptsLearned} / {concepts.length} Learned
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Practice MCQs</span>
                  <span className="font-extrabold text-slate-800 text-sm">
                    {practiceCompleted} / {questions.length} Solved
                  </span>
                </div>
              </div>

              {/* Mistakes Alert if any */}
              {mistakesCount > 0 && (
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{mistakesCount} {language === 'ta' ? 'தவறான வினாக்கள் மறுபார்வை செய்ய வேண்டும்' : 'unresolved mistake(s) to review'}</span>
                </div>
              )}
            </div>

            {/* Action CTA Button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => navigate(`/weekly-topics/${topic.id}`)}
                className={`w-full py-3 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                  status === 'MASTERED'
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : status === 'NEEDS_REVISION'
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : status === 'READY_TO_PRACTICE'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>
                  {status === 'MASTERED' 
                    ? (language === 'ta' ? 'பாடத்தை மீண்டும் பார் →' : 'Review Mastered Topic →')
                    : status === 'NEEDS_REVISION'
                    ? (language === 'ta' ? 'தவறுகளைத் திருத்து →' : 'Review Mistakes →')
                    : status === 'READY_TO_PRACTICE'
                    ? (language === 'ta' ? 'பயிற்சியைத் தொடங்கு →' : 'Start Practice →')
                    : (language === 'ta' ? 'கற்றலைத் தொடங்கு →' : 'Start Learning →')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Mock Exam CTA */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-black">
            {language === 'ta' ? 'வாராந்திரக் கற்றல் முடிந்தது! மாதிரித் தேர்வை எழுதுங்கள்' : 'Great Work! Test Yourself in a Full NMMS Mock Exam'}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm font-medium">
            {language === 'ta' 
              ? 'வாராந்திர பாடங்களைப் படித்த பிறகு, 45 வினாடிகள் கொண்ட SAT மாதிரித் தேர்வில் பங்கேற்கவும்.' 
              : 'After completing weekly topics, evaluate your accuracy with full-length 45-mark SAT Mock Exams.'}
          </p>
        </div>

        <button
          onClick={() => navigate('/mock')}
          className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer shrink-0 flex items-center gap-2"
        >
          <Award className="w-5 h-5" />
          <span>{language === 'ta' ? 'மாதிரித் தேர்வு எழுது →' : 'Take SAT Mock Exam →'}</span>
        </button>
      </div>
    </div>
  );
};
