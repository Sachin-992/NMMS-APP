import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    app_name: 'PUM NMMS Champion',
    tagline: 'Learn Smart. Practice Daily. Crack NMMS.',
    school_name: 'PUM School, Echampatti',
    dashboard: 'Dashboard',
    learn: 'Learn',
    practice: 'Practice',
    revision: 'Revision',
    mistakes: 'Mistake Book',
    mock_exams: 'Mock Exams',
    exam_guide: 'Exam Guide',
    official_papers: 'Official Papers',
    mentor_classroom: 'Mentor Classroom',
    open_classroom: 'Open Classroom →',
    progress: 'Progress',
    leaderboard: 'Leaderboard',
    achievements: 'Achievements',
    profile: 'Profile',
    admin_portal: 'Admin Portal',
    logout: 'Logout',
    switch_lang: 'தமிழ்',

    vanakkam: 'Vanakkam',
    nmms_journey: 'Your NMMS Journey',
    overall_progress: 'Overall Syllabus Coverage',
    todays_mission: "Today's Mission",
    performance_summary: 'Performance Overview',
    weak_areas: 'Areas Needing Attention',
    school_rank: 'Your Rank in PUM School',
    start_mission: 'Start Today\'s Mission',
    mat_title: 'Mental Ability Test (MAT)',
    sat_title: 'Scholastic Aptitude Test (SAT)',

    start_learning: 'Start Learning',
    try_yourself: 'Try Yourself',
    next_question: 'Next Question',
    submit_exam: 'Submit Exam',
    mark_review: 'Mark for Review',
    previous: 'Previous',
    retry_mistake: 'Try Again',
    view_explanation: 'View Explanation',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    source: 'Official Source',

    admin_dashboard: 'Admin Overview',
    student_management: 'Student Management',
    content_verification: 'Content Review & Verification',
    mock_creator: 'Mock Exam Creator',
    analytics: 'School Analytics',
    create_student: 'Create New Student',
    import_questions: 'Import Verified Questions',
    publish: 'Publish',
    verify: 'Approve & Verify',
  },
  ta: {
    app_name: 'PUM NMMS சாம்பியன்',
    tagline: 'சிறப்பாகக் கற்போம். தினமும் பயிற்சி செய்வோம். NMMS வெல்வோம்.',
    school_name: 'ஊ.ஒ.ந. பள்ளி, எச்சம்பட்டி',
    dashboard: 'முகப்பு',
    learn: 'கற்றல்',
    practice: 'பயிற்சி',
    revision: 'மீள்பார்வை',
    mistakes: 'பிழைப் புத்தகம்',
    mock_exams: 'மாதிரித் தேர்வுகள்',
    exam_guide: 'தேர்வு வழிகாட்டி',
    official_papers: 'அதிகாரப்பூர்வ வினாத்தாள்கள்',
    mentor_classroom: 'ஆசிரியர் வழிகாட்டும் வகுப்பு',
    open_classroom: 'வகுப்பறையைத் திற →',
    progress: 'முன்னேற்றம்',
    leaderboard: 'தரவரிசை',
    achievements: 'சாதனைகள்',
    profile: 'சுயவிவரம்',
    admin_portal: 'நிர்வாகி பகுதி',
    logout: 'வெளியேறு',
    switch_lang: 'English',

    vanakkam: 'வணக்கம்',
    nmms_journey: 'உங்கள் NMMS கல்விப் பயணம்',
    overall_progress: 'ஒட்டுமொத்த பாடத்திட்ட நிறைவு',
    todays_mission: 'இன்றைய இலக்கு',
    performance_summary: 'செயல்திறன் சுருக்கம்',
    weak_areas: 'கூடுதல் கவனம் தேவைப்படும் பகுதிகள்',
    school_rank: 'பள்ளியில் உங்கள் தரவரிசை',
    start_mission: 'இன்றைய இலக்கைத் தொடங்கு',
    mat_title: 'மனத்திறன் தேர்வு (MAT)',
    sat_title: 'படிப்புத் திறன் தேர்வு (SAT)',

    start_learning: 'கற்கத் தொடங்கு',
    try_yourself: 'நீங்களே முயலுங்கள்',
    next_question: 'அடுத்த வினா',
    submit_exam: 'தேர்வை சமர்ப்பி',
    mark_review: 'மறுபரிசீலனைக்குக் குறி',
    previous: 'முந்தையது',
    retry_mistake: 'மீண்டும் முயல்க',
    view_explanation: 'விளக்கம் காண்க',
    correct: 'சரி! 🎉',
    incorrect: 'தவறு',
    source: 'அரசு அதிகாரப்பூர்வ ஆதாரம்',

    admin_dashboard: 'நிர்வாகி முதன்மைப் பக்கம்',
    student_management: 'மாணவர் மேலாண்மை',
    content_verification: 'பாட உள்ளடக்க சரிபார்ப்பு',
    mock_creator: 'மாதிரித் தேர்வு உருவாக்கம்',
    analytics: 'பள்ளி பகுப்பாய்வு',
    create_student: 'புதிய மாணவர் சேர்க்கை',
    import_questions: 'வினாக்களை இறக்குமதி செய்',
    publish: 'வெளியிடு',
    verify: 'சரிபார்த்து உறுதிசெய்',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('pum_nmms_lang');
    return (saved === 'ta' || saved === 'en') ? saved : 'ta';
  });

  useEffect(() => {
    localStorage.setItem('pum_nmms_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
