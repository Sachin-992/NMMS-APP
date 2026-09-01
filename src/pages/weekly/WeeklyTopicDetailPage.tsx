import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTopics, getConcepts, getQuestions, getMistakes } from '../../services/storage';
import type { Topic, Concept, Question } from '../../types';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { 
  ArrowLeft, Brain, ShieldAlert, CheckCircle2, 
  BookOpenCheck 
} from 'lucide-react';

export const WeeklyTopicDetailPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { student } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [mistakesCount, setMistakesCount] = useState(0);

  const [learnedConceptIds, setLearnedConceptIds] = useState<string[]>([]);
  const [practiceCompleted, setPracticeCompleted] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (!topicId) return;

    const allTopics = getTopics();
    const currentTopic = allTopics.find(t => t.id === topicId);

    if (currentTopic) {
      setTopic(currentTopic);
      const matchedConcepts = getConcepts(topicId);
      setConcepts(matchedConcepts);

      const matchedQuestions = getQuestions({ topicId });
      setQuestions(matchedQuestions);

      if (student) {
        const topicMistakes = getMistakes(student.id).filter(m => !m.resolved && m.question?.topic_id === topicId);
        setMistakesCount(topicMistakes.length);

        // Load progress
        const storageKey = `weekly_topic_progress_${student.id}_${topicId}`;
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setLearnedConceptIds(parsed.learnedConceptIds || []);
            setPracticeCompleted(parsed.practiceCompleted || 0);
            setAccuracy(parsed.accuracy || 0);
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }, [topicId, student]);

  if (!topic) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        {language === 'ta' ? 'பாடம் கண்டறியப்படவில்லை...' : 'Topic not found...'}
      </div>
    );
  }

  const markConceptLearned = (conceptId: string) => {
    if (!learnedConceptIds.includes(conceptId)) {
      const updated = [...learnedConceptIds, conceptId];
      setLearnedConceptIds(updated);

      if (student) {
        const storageKey = `weekly_topic_progress_${student.id}_${topic.id}`;
        localStorage.setItem(storageKey, JSON.stringify({
          learnedConceptIds: updated,
          conceptsLearned: updated.length,
          practiceCompleted,
          accuracy
        }));
      }
    }
    navigate(`/concept/${topic.id}`);
  };

  const getCodeStr = (id: string) => {
    if (id === 'topic-sat-soc-7IG3') return '7.I.G.3';
    if (id === 'topic-sat-soc-8E1') return '8.E.1';
    if (id === 'topic-sat-soc-secularism') return '8.C.3';
    return id;
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Back Breadcrumb */}
      <button
        onClick={() => navigate('/weekly-topics')}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold text-xs transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'ta' ? '< வாராந்திர பாடங்களுக்குத் திரும்பு' : '< Back to Weekly Topics'}</span>
      </button>

      {/* Topic Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-black uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            SAT • {topic.category_id ? topic.category_id.toUpperCase() : 'SOCIAL SCIENCE'}
          </span>
          <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Code: {getCodeStr(topic.id)}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {topic.title_en}
          </h1>
          <h2 className="text-lg font-bold text-slate-600 mt-1">
            {topic.title_ta}
          </h2>
        </div>

        {/* Source citation badge */}
        <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200 font-semibold">
          <BookOpenCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{language === 'ta' ? 'அதிகாரப்பூர்வப் பாடம்:' : 'Verified Textbook Source:'} {topic.source_evidence}</span>
        </div>
      </div>

      {/* WHAT YOU WILL LEARN */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          {language === 'ta' ? 'நீங்கள் கற்றுக்கொள்ளவிருப்பது (WHAT YOU WILL LEARN)' : 'WHAT YOU WILL LEARN'}
        </h3>
        <p className="text-slate-800 font-medium text-sm leading-relaxed">
          {language === 'ta' ? topic.description_ta : topic.description_en}
        </p>
      </div>

      {/* YOUR PROGRESS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          {language === 'ta' ? 'உங்கள் முன்னேற்றம் (YOUR PROGRESS)' : 'YOUR PROGRESS'}
        </h3>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <span className="text-xs text-blue-600 font-bold block mb-1">Concepts</span>
            <span className="text-xl font-extrabold text-blue-900">
              {learnedConceptIds.length} / {concepts.length}
            </span>
          </div>

          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <span className="text-xs text-indigo-600 font-bold block mb-1">Practice</span>
            <span className="text-xl font-extrabold text-indigo-900">
              {practiceCompleted} / {questions.length}
            </span>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <span className="text-xs text-emerald-600 font-bold block mb-1">Accuracy</span>
            <span className="text-xl font-extrabold text-emerald-900">
              {accuracy}%
            </span>
          </div>
        </div>

        <ProgressBar 
          value={learnedConceptIds.length} 
          max={concepts.length > 0 ? concepts.length : 1} 
          color="blue"
          label={language === 'ta' ? 'பாடக் கருத்துக்கள் நிறைவு' : 'Overall Concept Mastery'}
        />
      </div>

      {/* LEARNING PLAN (STEP BY STEP CONCEPTS) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          {language === 'ta' ? 'கற்றல் திட்டம் (LEARNING PLAN)' : 'LEARNING PLAN'}
        </h3>

        <div className="space-y-3">
          {concepts.map((concept, index) => {
            const isLearned = learnedConceptIds.includes(concept.id);
            const isNext = !isLearned && (index === 0 || learnedConceptIds.includes(concepts[index - 1]?.id));

            return (
              <div 
                key={concept.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  isLearned
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : isNext
                    ? 'bg-blue-50/60 border-blue-300 ring-2 ring-blue-400/30'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs shrink-0 ${
                    isLearned
                      ? 'bg-emerald-500 text-white'
                      : isNext
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isLearned ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate">
                      {concept.title_en}
                    </h4>
                    <h5 className="text-xs font-medium text-slate-600 truncate">
                      {concept.title_ta}
                    </h5>
                  </div>
                </div>

                <button
                  onClick={() => markConceptLearned(concept.id)}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs shrink-0 cursor-pointer transition-all ${
                    isLearned
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : isNext
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {isLearned 
                    ? (language === 'ta' ? 'மீண்டும் படி' : 'Review')
                    : (language === 'ta' ? 'படி →' : 'Learn →')}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* PRACTICE & REVIEWS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Practice Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'ta' ? 'வினாக்கள் பயிற்சி' : 'Practice Questions'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {practiceCompleted} / {questions.length} {language === 'ta' ? 'வினாக்கள் முடிந்தது' : 'completed'}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/practice?topicId=${topic.id}`)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>{language === 'ta' ? 'இந்தப் பாடத்தைப் பயிற்சி செய் →' : 'Practice This Topic →'}</span>
          </button>
        </div>

        {/* Review Mistakes Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'ta' ? 'தவறுகள் மறுபார்வை' : 'Review Mistakes'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {mistakesCount} {language === 'ta' ? 'தவறான வினாக்கள் பாக்கி' : 'unresolved mistake(s)'}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/mistakes')}
            className={`w-full py-3 font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mistakesCount > 0
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            disabled={mistakesCount === 0}
          >
            <span>{language === 'ta' ? 'தவறுகளைத் திருத்து →' : 'Review Mistakes →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
