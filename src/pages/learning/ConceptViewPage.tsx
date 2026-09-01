import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { getConcepts, getTopics, updateDailyMissionProgress, markTopicLearned } from '../../services/storage';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  ArrowLeft, Lightbulb, HelpCircle, 
  Sparkles, ArrowRight, RefreshCw, BookOpen, AlertTriangle, CheckCircle2, Flame, Award, Trophy
} from 'lucide-react';

// Helper component to cleanly format Markdown text with Tips & Tricks cards, Common Mistakes boxes, and Exponents
const FormattedExplanation: React.FC<{ text: string; isTamil?: boolean }> = ({ text, isTamil }) => {
  if (!text) return null;

  // Clean up LaTeX / math escape artifacts
  const cleanedText = text
    .replace(/\\times/g, '×')
    .replace(/\$\s*times\s*/g, ' × ')
    .replace(/\$\s*imes\s*/g, ' × ')
    .replace(/\$n\^2, n\^3\$/g, 'n², n³')
    .replace(/\$n\^2\$/g, 'n²')
    .replace(/\$n\^3\$/g, 'n³')
    .replace(/\$1\^2\$/g, '1²')
    .replace(/\$20\^2\$/g, '20²')
    .replace(/\$2\^N\$/g, '2ⁿ')
    .replace(/\$N\$/g, 'N')
    .replace(/\$/g, '');

  const sections = cleanedText.split(/\n(?=###|---)/g).filter(s => s.trim());

  return (
    <div className="space-y-4">
      {sections.map((sec, idx) => {
        const trimmed = sec.replace(/^---/, '').trim();
        if (!trimmed) return null;

        const isTips = trimmed.includes('Tips') || trimmed.includes('குறுக்கு வழிகள்') || trimmed.includes('💡');
        const isMistakes = trimmed.includes('Mistakes') || trimmed.includes('தவறு') || trimmed.includes('⚠️');

        const headingMatch = trimmed.match(/^###\s*(.*)/);
        const headingText = headingMatch ? headingMatch[1].trim() : null;
        const bodyText = headingMatch ? trimmed.replace(/^###\s*.*(\n|$)/, '').trim() : trimmed;

        const lines = bodyText.split('\n').filter(l => l.trim());

        if (isTips) {
          return (
            <div key={idx} className="p-5 bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/90 rounded-2xl space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm border-b border-amber-200/80 pb-2">
                <Lightbulb className="w-5 h-5 text-amber-600 fill-amber-500 shrink-0" />
                <span>{headingText || (isTamil ? 'எளிய குறுக்கு வழிகள் & ஷார்ட்கட்கள் (Tips & Tricks)' : 'Tips, Tricks & Shortcuts')}</span>
              </div>
              <div className="space-y-2.5">
                {lines.map((line, lIdx) => {
                  const lineTrim = line.trim();
                  if (!lineTrim) return null;

                  const isNumbered = /^\d+\./.test(lineTrim);
                  const cleanLine = lineTrim.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '');
                  const boldParts = cleanLine.split(/\*\*(.*?)\*\*/g);

                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 text-xs text-amber-950 font-medium leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-200/60 shadow-2xs">
                      {isNumbered ? (
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {lineTrim.match(/^\d+/)?.[0] || lIdx + 1}
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5 ml-1" />
                      )}
                      <div className="flex-1">
                        {boldParts.map((part, pIdx) => 
                          pIdx % 2 === 1 ? (
                            <strong key={pIdx} className="font-extrabold text-amber-900">{part}</strong>
                          ) : (
                            <span key={pIdx}>{part}</span>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (isMistakes) {
          return (
            <div key={idx} className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 text-xs text-rose-950 shadow-2xs">
              <div className="flex items-center gap-2 font-extrabold text-rose-900 text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{headingText || (isTamil ? 'தவிர்க்க வேண்டிய தவறுகள்' : 'Common Mistakes to Avoid')}</span>
              </div>
              <p className="font-semibold leading-relaxed pl-6">
                {bodyText.replace(/^-\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
              </p>
            </div>
          );
        }

        return (
          <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs text-slate-800">
            {headingText && (
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                <span>{headingText}</span>
              </h4>
            )}
            <div className="space-y-1.5 font-medium leading-relaxed">
              {lines.map((line, lIdx) => {
                const parts = line.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={lIdx}>
                    {parts.map((p, pIdx) => 
                      pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-slate-900">{p}</strong> : <span key={pIdx}>{p}</span>
                    )}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ConceptViewPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { language } = useLanguage();
  const { student, updateCurrentStudentXP } = useAuth();
  const navigate = useNavigate();

  // Active step state for 5-step topic learning path
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({ 1: true });

  let concepts = getConcepts(topicId);

  // Fallback: If no concepts exist for this topicId, construct a dynamic bilingual concept module
  if (concepts.length === 0 && topicId) {
    const allTopics = getTopics();
    const currentTopic = allTopics.find(t => t.id === topicId) || {
      id: topicId,
      title_en: 'Mental Ability & Visual Reasoning',
      title_ta: 'மனத்திறன் & வரைபடப் பகுப்பாய்வு',
      description_en: 'Master pattern recognition, visual logic, and official NMMS shortcuts.',
      description_ta: 'வடிவங்கள், வரைபடங்கள் மற்றும் NMMS தேர்வின் எளிய குறுக்கு வழிகளைக் கற்றல்.',
      source_evidence: 'TN DGE Official NMMS Question Paper Pattern'
    };

    concepts = [
      {
        id: `concept-${currentTopic.id}`,
        topic_id: currentTopic.id,
        title_en: `${currentTopic.title_en} — Concept & Tips`,
        title_ta: `${currentTopic.title_ta} — எளிய விளக்கம் & குறுக்கு வழிகள்`,
        summary_en: currentTopic.description_en,
        summary_ta: currentTopic.description_ta,
        explanation_en: `
### 📌 Concept Overview
${currentTopic.description_en}

---

### 💡 Tips, Tricks & Shortcuts for NMMS Students

1. **Pattern Identification**: Always check the relation between consecutive terms or shapes first.
2. **Option Elimination Shortcut**: Eliminate choices that violate basic properties (even/odd, prime numbers, or angle rotations).
3. **Speed Strategy**: Allocate no more than 45 to 60 seconds per MAT question.
        `.trim(),
        explanation_ta: `
### 📌 பாடக் கருத்து விளக்கம்
${currentTopic.description_ta}

---

### 💡 NMMS மாணவர்களுக்கான எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **விதியை முதன்முதலில் காணுதல்**: அடுத்தடுத்த எண்கள் அல்லது வடிவங்களுக்கு இடையேயான தொடர்பை முதலில் கவனியுங்கள்.
2. **ஆப்ஷன் நீக்கல் குறுக்கு வழி**: தவறான ஆப்ஷன்களை நீக்கினால் விடையை மிக வேகமாகத் தேர்ந்தெடுக்கலாம்!
3. **வேக உத்தி**: ஒரு MAT வினாவிற்கு 45 முதல் 60 வினாடிகளுக்கு மேல் செலவிட வேண்டாம்.
        `.trim(),
        example_en: `Worked Practice Example for ${currentTopic.title_en}:\nFollow step-by-step reasoning to master this topic for NMMS.`,
        example_ta: `${currentTopic.title_ta} மாதிரி எடுத்துக்காட்டு:\nதேர்வில் அதிக மதிப்பெண் பெற இந்த படிமுறை வழியைப் பின்பற்றுங்கள்.`,
        solved_question: {
          question_en: `Official-Pattern Sample Question for ${currentTopic.title_en}: Identify the option that completes the logic.`,
          question_ta: `${currentTopic.title_ta} மாதிரி வினா: சரியான தர்க்கத்தைச் சார்ந்த விடையைத் தேர்ந்தெடுக்கவும்.`,
          options_en: ['Option A (Correct Logic)', 'Option B', 'Option C', 'Option D'],
          options_ta: ['விருப்பம் A (சரியான விடை)', 'விருப்பம் B', 'விருப்பம் C', 'விருப்பம் D'],
          correct_index: 0,
          explanation_en: `Detailed Solution: Option A satisfies the official NMMS reasoning pattern for ${currentTopic.title_en}.`,
          explanation_ta: `விளக்கவுரை: விருப்பம் A என்பது ${currentTopic.title_ta} அதிகாரப்பூர்வ NMMS அமைப்போடு பொருந்துகிறது.`
        },
        order_index: 1
      }
    ];
  }

  const [currentIndex] = useState(0);
  const [selectedTryOption, setSelectedTryOption] = useState<number | null>(null);
  const [isTrySubmitted, setIsTrySubmitted] = useState(false);
  const [completedConcepts, setCompletedConcepts] = useState<Record<string, boolean>>({});

  const concept = concepts[currentIndex];

  if (!concept) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Loading Concept..."
        description="Preparing lesson content."
        action={{ label: 'Back to Subjects', onClick: () => navigate('/learn') }}
      />
    );
  }

  const solved = concept.solved_question;

  const handleOptionSelect = (idx: number) => {
    if (!isTrySubmitted) {
      setSelectedTryOption(idx);
    }
  };

  const handleTrySubmit = () => {
    if (selectedTryOption === null) return;
    setIsTrySubmitted(true);

    if (student && solved && selectedTryOption === solved.correct_index) {
      if (!completedConcepts[concept.id]) {
        updateCurrentStudentXP(10);
        updateDailyMissionProgress(student.id, 'concept', 1);
        setCompletedConcepts(prev => ({ ...prev, [concept.id]: true }));
      }
    }
  };

  const handleResetTry = () => {
    setSelectedTryOption(null);
    setIsTrySubmitted(false);
  };

  // Clean 5-step topic learning path details (Steps 4 & 5 removed as requested)
  const stepsList = [
    { step: 1, name_en: 'Concept', name_ta: 'கருத்து', icon: BookOpen, desc_en: 'Core Rules & Tips', desc_ta: 'விதிகள் & குறிப்புகள்' },
    { step: 2, name_en: 'Example', name_ta: 'எடுத்துக்காட்டு', icon: Flame, desc_en: 'Worked Demonstration', desc_ta: 'மாதிரி எடுத்துக்காட்டு' },
    { step: 3, name_en: 'Solved Qs', name_ta: 'தீர்க்கப்பட்டவை', icon: HelpCircle, desc_en: 'Try Yourself Question', desc_ta: 'நீங்களே முயலுங்கள்' },
    { step: 4, name_en: 'Mini Quiz', name_ta: 'விரைவுத் தேர்வு', icon: Sparkles, desc_en: 'Retention Check', desc_ta: 'சுய சோதனைத் தேர்வு' },
    { step: 5, name_en: 'Mastery', name_ta: 'தேர்ச்சி', icon: Trophy, desc_en: 'Topic Completed & Rewards', desc_ta: 'பாடத் தேர்ச்சி & சான்றிதழ்' }
  ];

  const currentStepInfo = stepsList[currentStep - 1];

  useEffect(() => {
    if (currentStep === 5 && student && topicId) {
      markTopicLearned(student.id, topicId);
    }
  }, [currentStep, student, topicId]);

  const handleStepChange = (targetStep: number) => {
    setCurrentStep(targetStep);
    setCompletedSteps(prev => ({ ...prev, [targetStep]: true }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      handleStepChange(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Topics</span>
        </button>

        <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Step {currentStep} of 5 — {language === 'ta' ? currentStepInfo.name_ta : currentStepInfo.name_en}</span>
        </div>
      </div>

      {/* 5-Step Interactive Clickable Topic Learning Path Stepper */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1.5 text-blue-700">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{language === 'ta' ? 'NMMS 5-படிமுறைக் கற்றல் பாதை (சொடுக்கி நிலைக்குச் செல்லவும்)' : 'NMMS 5-Step Topic Learning Path (Click to Navigate)'}</span>
          </span>
          <span className="text-[11px] text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full font-extrabold">
            {Math.round((currentStep / 5) * 100)}% Complete
          </span>
        </div>

        {/* Clickable 5-Step Progress Bar */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          {stepsList.map((s) => {
            const isActive = s.step === currentStep;
            const isCompleted = completedSteps[s.step];

            return (
              <button
                key={s.step}
                onClick={() => handleStepChange(s.step)}
                title={`Step ${s.step}: ${s.name_en} — ${s.desc_en}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer relative group ${
                  isActive 
                    ? 'bg-blue-600 ring-2 ring-blue-300 ring-offset-1 scale-y-125' 
                    : isCompleted 
                    ? 'bg-emerald-500 hover:bg-emerald-600' 
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
              />
            );
          })}
        </div>

        {/* Interactive Step Labels Grid */}
        <div className="grid grid-cols-5 text-center text-[11px] font-bold text-slate-500 pt-1">
          {stepsList.map((s) => {
            const isActive = s.step === currentStep;
            return (
              <button
                key={s.step}
                onClick={() => handleStepChange(s.step)}
                className={`px-1 py-1 rounded-lg transition-all cursor-pointer truncate ${
                  isActive 
                    ? 'text-blue-700 font-extrabold bg-blue-50' 
                    : 'hover:text-slate-800'
                }`}
              >
                {s.step}. {language === 'ta' ? s.name_ta : s.name_en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Card for Active Step */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        
        {/* Topic Header Title */}
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              Step {currentStep}: {language === 'ta' ? currentStepInfo.name_ta : currentStepInfo.name_en}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            {concept.title_en}
          </h1>
          <p className="text-base font-bold text-blue-800 font-tamil mt-1">
            {concept.title_ta}
          </p>
        </div>

        {/* STEP 1: Core Concept & Explanations & Tips */}
        {currentStep === 1 && (
          <div className="space-y-5">
            {concept.explanation_en && (
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>English Explanation & Rules</span>
                </h3>
                <FormattedExplanation text={concept.explanation_en} isTamil={false} />
              </div>
            )}

            {concept.explanation_ta && (
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 font-tamil">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span>தமிழ்ப் பாட விளக்கம் & எளிய குறுக்கு வழிகள்</span>
                </h3>
                <FormattedExplanation text={concept.explanation_ta} isTamil={true} />
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Worked Example */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-amber-50/80 to-orange-50/50 border border-amber-200/90 rounded-3xl space-y-4 shadow-2xs">
              <h3 className="text-sm font-extrabold text-amber-900 flex items-center gap-2 border-b border-amber-200/80 pb-2.5">
                <Flame className="w-5 h-5 text-amber-600 fill-amber-500" />
                <span>Step-by-Step Worked Demonstration / மாதிரி எடுத்துக்காட்டு</span>
              </h3>
              
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-900 whitespace-pre-line leading-relaxed">
                  {concept.example_en || `Worked Example for ${concept.title_en}:\nFollow step-by-step logic to identify patterns accurately.`}
                </p>
                {concept.example_ta && (
                  <p className="text-xs font-bold text-slate-900 whitespace-pre-line leading-relaxed font-tamil pt-2 border-t border-amber-200/60">
                    {concept.example_ta}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-2xl text-xs text-blue-950 font-medium space-y-1">
              <strong className="font-extrabold text-blue-900 block">💡 Key Takeaway for NMMS Exam:</strong>
              <p>Always verify the formula or pattern on at least two terms before picking your answer on the OMR sheet.</p>
            </div>
          </div>
        )}

        {/* STEP 3: Solved Interactive Question */}
        {currentStep === 3 && (
          <div className="space-y-4">
            {solved ? (
              <div className="p-6 bg-indigo-50/50 border border-indigo-200/90 rounded-3xl space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {language === 'ta' ? 'நீங்களே முயலுங்கள்' : 'Try Yourself Interactive Question'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full">
                    +10 XP Reward
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-slate-900">{solved.question_en}</p>
                  <p className="text-xs font-bold text-indigo-950 font-tamil">{solved.question_ta}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {solved.options_en.map((optEn, idx) => {
                    const optTa = solved.options_ta[idx];
                    const isSelected = selectedTryOption === idx;
                    const isCorrect = idx === solved.correct_index;

                    let style = 'bg-white border-slate-200 hover:border-indigo-300 text-slate-900';
                    if (isTrySubmitted) {
                      if (isCorrect) {
                        style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        style = 'bg-red-100 border-red-500 text-red-950 font-bold';
                      }
                    } else if (isSelected) {
                      style = 'bg-indigo-100 border-indigo-600 text-indigo-950 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${style}`}
                      >
                        <div className="font-semibold">{optEn}</div>
                        {optTa && optTa.trim() !== optEn.trim() && (
                          <div className="font-tamil font-bold opacity-90 mt-0.5">{optTa}</div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {!isTrySubmitted ? (
                  <button
                    onClick={handleTrySubmit}
                    disabled={selectedTryOption === null}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Check Answer & Claim XP
                  </button>
                ) : (
                  <div className="space-y-3 pt-2">
                    <div className={`p-4 rounded-xl text-xs font-semibold ${
                      selectedTryOption === solved.correct_index 
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                        : 'bg-red-100 text-red-950 border border-red-300'
                    }`}>
                      <div className="font-bold mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{selectedTryOption === solved.correct_index ? 'Correct! +10 XP Earned 🎉' : 'Incorrect. Review explanation below:'}</span>
                      </div>
                      <p className="mt-1 font-medium">{solved.explanation_en}</p>
                      <p className="mt-1 font-bold font-tamil">{solved.explanation_ta}</p>
                    </div>

                    <button
                      onClick={handleResetTry}
                      className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer mx-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Try Question Again
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Solved question loading...</p>
            )}
          </div>
        )}

        {/* STEP 4: Retention Mini Quiz */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="p-6 bg-blue-50/60 border border-blue-200/90 rounded-3xl space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-blue-200/70 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="font-extrabold text-blue-950 text-sm sm:text-base">
                    Topic Knowledge Check & Retention Quiz
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                  Quick Check
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-800">
                <p className="font-semibold leading-relaxed">
                  Before claiming topic mastery, verify that you remember the key shortcut rules:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium">
                  <li>Can you identify whether a series requires difference rules or square rules within 10 seconds?</li>
                  <li>Have you memorized the key shortcuts for this topic?</li>
                  <li>Do you eliminate options that break basic rules first?</li>
                </ul>
              </div>

              <button
                onClick={() => handleStepChange(5)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Complete Quiz & Claim Topic Mastery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Topic Mastery & Graduation */}
        {currentStep === 5 && (
          <div className="p-8 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-blue-50/40 border border-emerald-200 rounded-3xl text-center space-y-5 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900">
                Topic Learning Path Completed! 🎉
              </h2>
              <p className="text-sm font-bold text-emerald-800 font-tamil">
                {concept.title_ta} — பாடக் கருத்து வெற்றிகரமாகக் கற்கப்பட்டது!
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-950 text-xs font-extrabold px-4 py-2 rounded-full border border-emerald-300">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Topic Marked Learned • Ready for Practice Questions</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate(`/practice?topicId=${topicId || ''}`)}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice This Topic ({language === 'ta' ? 'பயிற்சி வினாக்கள்' : 'Practice Qs'})</span>
              </button>

              <button
                onClick={() => navigate('/learn')}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Back to All Topics
              </button>
            </div>
          </div>
        )}

        {/* Bottom 5-Step Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          
          {/* Previous Step Button */}
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'ta' ? 'முந்தைய நிலை' : 'Previous Step'}</span>
          </button>

          {/* Next Step Button */}
          {currentStep < 5 ? (
            <button
              onClick={handleNextStep}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>
                {language === 'ta' 
                  ? `அடுத்த நிலை: ${stepsList[currentStep].name_ta}` 
                  : `Next Step: ${stepsList[currentStep].name_en}`
                }
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/practice')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Practice Questions</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
