import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getQuestions, getSubjects, getTopics, recordMistake, 
  updateDailyMissionProgress, getMistakes
} from '../../services/storage';
import type { Question, Subject, Topic } from '../../types';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  CheckCircle2, XCircle, ArrowRight, 
  HelpCircle, Brain, ShieldCheck, Flame, BookOpen, RotateCcw, Trophy, Award, Filter, Check
} from 'lucide-react';

export const PracticePage: React.FC = () => {
  const { t, language } = useLanguage();
  const { student, updateCurrentStudentXP } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlTopicId = searchParams.get('topicId');
  const subjects: Subject[] = getSubjects();
  const allTopics: Topic[] = getTopics();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('ALL');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'LEARNED' | 'MISTAKES' | 'PYQ' | 'HIGH_PRIORITY'>('ALL');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<number>(0);
  const [totalPracticedCount, setTotalPracticedCount] = useState<number>(0);
  const [mistakeAdded, setMistakeAdded] = useState<boolean>(false);

  // If URL has topicId, resolve subject
  useEffect(() => {
    if (urlTopicId) {
      const topicObj = allTopics.find(t => t.id === urlTopicId);
      if (topicObj) {
        setSelectedSubjectId(topicObj.subject_id);
      }
    }
  }, [urlTopicId]);

  // Load questions based on subject & active filter
  useEffect(() => {
    let loaded: Question[] = [];

    if (activeFilter === 'MISTAKES' && student) {
      const mistakesList = getMistakes(student.id);
      const questionMap = new Map(getQuestions({ verificationStatus: 'ALL' }).map(q => [q.id, q]));
      loaded = mistakesList.map(m => questionMap.get(m.question_id)).filter(Boolean) as Question[];
      if (selectedSubjectId !== 'ALL') {
        loaded = loaded.filter(q => q.subject_id === selectedSubjectId);
      }
    } else {
      loaded = getQuestions({
        subjectId: selectedSubjectId === 'ALL' ? undefined : selectedSubjectId,
        topicId: urlTopicId || undefined,
        pyqOnly: activeFilter === 'PYQ',
        learnedOnly: activeFilter === 'LEARNED',
        priorityOnly: activeFilter === 'HIGH_PRIORITY',
        studentId: student?.id
      });
    }

    setQuestions(loaded);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setMistakeAdded(false);
  }, [selectedSubjectId, activeFilter, urlTopicId, student]);

  const currentQ = questions[currentIndex];
  const currentTopic = currentQ ? allTopics.find(t => t.id === currentQ.topic_id) : null;
  const currentSubject = currentQ ? subjects.find(s => s.id === currentQ.subject_id) : null;

  // Calculate subject-wise question counts
  const allVerifiedQuestions = getQuestions({ verificationStatus: 'ALL' });
  const subjectProgressCounts: Record<string, { total: number }> = {
    'subj-mat': { total: allVerifiedQuestions.filter(q => q.subject_id === 'subj-mat').length },
    'subj-math': { total: allVerifiedQuestions.filter(q => q.subject_id === 'subj-math').length },
    'subj-science': { total: allVerifiedQuestions.filter(q => q.subject_id === 'subj-science').length },
    'subj-social': { total: allVerifiedQuestions.filter(q => q.subject_id === 'subj-social').length }
  };

  const handleOptionSelect = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!isAnswerSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQ || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    setTotalPracticedCount(prev => prev + 1);

    const isCorrect = selectedOption === currentQ.correct_option;

    if (isCorrect) {
      setScoreCount(prev => prev + 1);
      if (student) {
        updateCurrentStudentXP(2);
        updateDailyMissionProgress(student.id, 'practice', 1);
      }
    } else {
      if (student) {
        recordMistake(student.id, currentQ.id, selectedOption);
        setMistakeAdded(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setMistakeAdded(false);
    }
  };

  const handleRetryQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setMistakeAdded(false);
  };

  const handleManualAddMistake = () => {
    if (student && currentQ && selectedOption) {
      recordMistake(student.id, currentQ.id, selectedOption);
      setMistakeAdded(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Brain className="w-7 h-7 text-indigo-600" />
            <span>{t('practice')}</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            {language === 'ta'
              ? 'கற்ற பாடக் கருத்துகளுக்கான பயிற்சி வினாக்கள் & உடனடி தமிழ் விளக்கங்கள்.'
              : 'Practice questions mapped to your learning path with instant bilingual feedback.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs bg-emerald-50 text-emerald-800 font-extrabold px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Score: {scoreCount} Correct</span>
          </span>
        </div>
      </div>

      {/* Subject-Wise Progress Meter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {subjects.map(subj => {
          const stats = subjectProgressCounts[subj.id] || { total: 0 };
          const isSelected = selectedSubjectId === subj.id;
          return (
            <button
              key={subj.id}
              onClick={() => setSelectedSubjectId(isSelected ? 'ALL' : subj.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                  : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {subj.code}
                </span>
                <span className={`text-xs font-bold ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {stats.total}+ Qs
                </span>
              </div>
              <p className="mt-2 text-xs font-extrabold truncate">
                {language === 'ta' ? subj.name_ta : subj.name_en}
              </p>
            </button>
          );
        })}
      </div>

      {/* Smart Learning Journey Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-1 text-slate-500 font-bold">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Filter By:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeFilter === 'ALL'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {language === 'ta' ? 'அனைத்து வினாக்களும்' : 'All Questions'}
          </button>

          <button
            onClick={() => setActiveFilter('LEARNED')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeFilter === 'LEARNED'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'கற்ற பாடங்கள்' : 'Learned Topics'}</span>
          </button>

          <button
            onClick={() => setActiveFilter('PYQ')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeFilter === 'PYQ'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'முந்தைய ஆண்டுகள் (PYQ)' : 'Previous Year'}</span>
          </button>

          <button
            onClick={() => setActiveFilter('HIGH_PRIORITY')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeFilter === 'HIGH_PRIORITY'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'முக்கியமான பகுதிகள்' : 'High Priority'}</span>
          </button>

          <button
            onClick={() => setActiveFilter('MISTAKES')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeFilter === 'MISTAKES'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'தவறான வினாக்கள்' : 'Mistakes'}</span>
          </button>
        </div>
      </div>

      {/* Main Question Session */}
      {!currentQ ? (
        <EmptyState
          icon={HelpCircle}
          title={language === 'ta' ? 'பயிற்சி வினாக்கள் இல்லை' : 'No Practice Questions Available'}
          description={
            activeFilter === 'LEARNED'
              ? 'Complete concepts in the Learn section to unlock topic-specific practice questions!'
              : 'Try changing the subject or filter above to explore more questions.'
          }
          action={{
            label: 'Explore Learn Section',
            onClick: () => navigate('/learn')
          }}
        />
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
          
          {/* Question Top Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold bg-slate-900 text-white px-3 py-1 rounded-full">
                Question {currentIndex + 1} of {questions.length}
              </span>

              {currentSubject && (
                <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-200">
                  {currentSubject.code}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Source Badge */}
              <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {currentQ.source_type === 'OFFICIAL_QUESTION_PAPER'
                    ? `✓ Official PYQ ${currentQ.source_year || ''}`
                    : '✓ Verified NMMS Practice'}
                </span>
              </span>

              {/* Difficulty Badge */}
              <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                currentQ.difficulty === 'EASY'
                  ? 'bg-emerald-100 text-emerald-800'
                  : currentQ.difficulty === 'HARD'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {currentQ.difficulty}
              </span>
            </div>
          </div>

          {/* Topic & Concept Hierarchy Trail */}
          {currentTopic && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs flex items-center gap-2 text-slate-700">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-bold">{language === 'ta' ? currentTopic.title_ta : currentTopic.title_en}</span>
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {currentQ.question_en}
            </h2>
            {currentQ.question_ta && (
              <p className="text-sm font-bold text-indigo-950 font-tamil leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                {currentQ.question_ta}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {(['A', 'B', 'C', 'D'] as const).map(optionKey => {
              const optionTextEn = currentQ[`option_${optionKey.toLowerCase()}_en` as keyof Question] as string;
              const optionTextTa = currentQ[`option_${optionKey.toLowerCase()}_ta` as keyof Question] as string;
              
              const isSelected = selectedOption === optionKey;
              const isCorrectOption = currentQ.correct_option === optionKey;

              let btnStyle = 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrectOption) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-600/20';
              }

              return (
                <button
                  key={optionKey}
                  onClick={() => handleOptionSelect(optionKey)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                    isAnswerSubmitted && isCorrectOption
                      ? 'bg-emerald-600 text-white'
                      : isAnswerSubmitted && isSelected
                      ? 'bg-rose-600 text-white'
                      : isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {optionKey}
                  </span>

                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-semibold">{optionTextEn}</p>
                    {optionTextTa && optionTextTa !== optionTextEn && (
                      <p className="text-xs font-medium text-slate-600 font-tamil">{optionTextTa}</p>
                    )}
                  </div>

                  {isAnswerSubmitted && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit Action */}
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-extrabold text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Answer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              
              {/* Feedback Card */}
              <div className={`p-5 rounded-2xl border ${
                selectedOption === currentQ.correct_option
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <div className="flex items-center gap-2 font-extrabold text-sm mb-2">
                  {selectedOption === currentQ.correct_option ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>✓ Correct Answer! (+2 XP Earned)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>✗ Incorrect Answer (Correct Option: {currentQ.correct_option})</span>
                    </>
                  )}
                </div>

                {/* Explanations */}
                <div className="space-y-2 text-xs font-medium leading-relaxed">
                  <div>
                    <span className="font-extrabold text-slate-900 block mb-0.5">Why? (Explanation):</span>
                    <p className="text-slate-800">{currentQ.explanation_en}</p>
                  </div>

                  {currentQ.explanation_ta && (
                    <div className="pt-2 border-t border-slate-200/60 font-tamil">
                      <span className="font-extrabold text-slate-900 block mb-0.5">தமிழ் விளக்கம்:</span>
                      <p className="text-slate-800">{currentQ.explanation_ta}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRetryQuestion}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-600" />
                    <span>Retry Question</span>
                  </button>

                  {!mistakeAdded && selectedOption !== currentQ.correct_option && (
                    <button
                      onClick={handleManualAddMistake}
                      className="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      + Save to Mistake Book
                    </button>
                  )}

                  {mistakeAdded && (
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-2 rounded-xl flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>In Mistake Book</span>
                    </span>
                  )}
                </div>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/mock-exams')}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Trophy className="w-4 h-4 text-white" />
                    <span>Practice Done — Try Mock Exam</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Smart CTA Banner: Ready for Mock Exam */}
      {totalPracticedCount >= 5 && (
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Ready to test your speed under real exam conditions?</span>
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              You have completed multiple practice questions. Attempt an official-pattern NMMS Mock Exam!
            </p>
          </div>

          <button
            onClick={() => navigate('/mock-exams')}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Take Mock Exam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
