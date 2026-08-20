import type { OfficialSource, GuideFact, GuideFAQ, ChecklistItem } from '../types';

// ===================================================================
// OFFICIAL RESEARCH DATABASE — PUM NMMS CHAMPION
// Primary Reference: Tamil Nadu Directorate of Government Examinations (TN DGE) & Ministry of Education (GoI)
// Source URLs: https://www.dge.tn.gov.in/ | https://www.dge.tn.gov.in/nmms_qb.html | https://dsel.education.gov.in/
// ===================================================================

export class OfficialSourcesRepository {
  static readonly SOURCES: Record<string, OfficialSource> = {
    'dge-2024-paper': {
      id: 'dge-2024-paper',
      title: 'Tamil Nadu DGE NMMS Examination 2024 Question Paper & Candidate Instructions',
      organization: 'Tamil Nadu Directorate of Government Examinations',
      url: 'https://www.dge.tn.gov.in/nmms_qb.html',
      document_year: 2024,
      document_type: 'OFFICIAL_QUESTION_PAPER',
      page_reference: 'Page 1 (Cover Page Instructions)',
      retrieved_at: '2026-08-20',
      verification_status: 'VERIFIED',
      notes: 'Bilingual exam instructions, paper structure, OMR shading guidelines.'
    },
    'dge-2023-paper': {
      id: 'dge-2023-paper',
      title: 'Tamil Nadu DGE NMMS Examination 2023 Question Paper Booklet',
      organization: 'Tamil Nadu Directorate of Government Examinations',
      url: 'https://www.dge.tn.gov.in/nmms_qb.html',
      document_year: 2023,
      document_type: 'OFFICIAL_QUESTION_PAPER',
      page_reference: 'Page 1 & OMR Notice',
      retrieved_at: '2026-08-20',
      verification_status: 'VERIFIED',
      notes: 'Confirmed 90 Qs per paper, rough work prohibited on OMR sheet.'
    },
    'dge-2017-paper': {
      id: 'dge-2017-paper',
      title: 'Tamil Nadu DGE NMMS Examination 2017 Question Paper Booklet',
      organization: 'Tamil Nadu Directorate of Government Examinations',
      url: 'https://www.dge.tn.gov.in/nmms_qb.html',
      document_year: 2017,
      document_type: 'OFFICIAL_QUESTION_PAPER',
      page_reference: 'Historical Instructions Page 1',
      retrieved_at: '2026-08-20',
      verification_status: 'PUBLISHED',
      notes: 'Historical reference for stable 90 Qs structure.'
    },
    'goi-nmms-guidelines': {
      id: 'goi-nmms-guidelines',
      title: 'National Means-cum-Merit Scholarship Scheme (NMMSS) Official Guidelines',
      organization: 'Ministry of Education, Government of India',
      url: 'https://dsel.education.gov.in/',
      document_year: 2024,
      document_type: 'GOVERNMENT_GUIDELINE',
      page_reference: 'Scheme Norms & Eligibility',
      retrieved_at: '2026-08-20',
      verification_status: 'VERIFIED',
      notes: 'Parental income limit (Rs 3,50,000 per annum), Class 8 student eligibility, Rs 12,000/yr scholarship.'
    }
  };
}

export const VERIFIED_GUIDE_FACTS: GuideFact[] = [
  {
    id: 'fact-mat-structure',
    category: 'PATTERN',
    fact_en: 'Mental Ability Test (MAT) contains 90 Multiple Choice Questions (MCQs) for 90 marks with a duration of 90 minutes.',
    fact_ta: 'மனத்திறன் தேர்வு (MAT) 90 வினாக்களைக் கொண்டது. 90 மதிப்பெண்கள், 90 நிமிடங்கள் கால அளவு.',
    value: '90 Qs / 90 Mins / 90 Marks',
    source_id: 'dge-2024-paper',
    status: 'CONFIRMED',
    is_current: true,
    last_verified: '2026-08-20'
  },
  {
    id: 'fact-sat-structure',
    category: 'PATTERN',
    fact_en: 'Scholastic Aptitude Test (SAT) contains 90 MCQs for 90 marks (Mathematics: 20, Science: 35, Social Science: 35) with a duration of 90 minutes.',
    fact_ta: 'படிப்புத் திறன் தேர்வு (SAT) 90 வினாக்களைக் கொண்டது (கணிதம்: 20, அறிவியல்: 35, சமூக அறிவியல்: 35). 90 நிமிடங்கள்.',
    value: '90 Qs (Maths 20, Sci 35, Soc 35) / 90 Mins',
    source_id: 'dge-2024-paper',
    status: 'CONFIRMED',
    is_current: true,
    last_verified: '2026-08-20'
  },
  {
    id: 'fact-pen-type',
    category: 'OMR',
    fact_en: 'Candidates must use BLUE or BLACK BALL POINT PEN only to shade the OMR answer sheet circles.',
    fact_ta: 'OMR விடைத்தாளில் வட்டங்களை நிரப்ப நீலம் அல்லது கருப்பு நிற பந்துமுனைப் பேனா (Ball Point Pen) மட்டுமே பயன்படுத்த வேண்டும்.',
    value: 'Blue / Black Ball Point Pen',
    source_id: 'dge-2024-paper',
    status: 'CONFIRMED',
    is_current: true,
    last_verified: '2026-08-20'
  },
  {
    id: 'fact-rough-work',
    category: 'OMR',
    fact_en: 'Rough work must be done ONLY in the space provided inside the question booklet. DO NOT write or do rough work on the OMR answer sheet.',
    fact_ta: 'தேவையான கணக்கீடுகள் மற்றும் வரைபடப் பணிகளை வினாப் புத்தகத்தில் ஒதுக்கப்பட்ட இடத்தில் மட்டுமே செய்ய வேண்டும். OMR விடைத்தாளில் செய்யக்கூடாது.',
    value: 'Question Booklet Only',
    source_id: 'dge-2023-paper',
    status: 'CONFIRMED',
    is_current: true,
    last_verified: '2026-08-20'
  },
  {
    id: 'fact-negative-marking',
    category: 'PATTERN',
    fact_en: 'Negative marking for wrong answers is NOT specified in current official DGE candidate instructions reviewed.',
    fact_ta: 'தவறான விடைகளுக்கு எதிர்மறை மதிப்பெண் (Negative Marking) இருப்பதாக அதிகாரப்பூர்வ வினாத்தாளில் குறிப்பிடப்படவில்லை.',
    value: 'Not Specified in Official Source',
    source_id: 'dge-2024-paper',
    status: 'NOT_SPECIFIED',
    is_current: true,
    last_verified: '2026-08-20'
  },
  {
    id: 'fact-bilingual-version',
    category: 'PROCEDURE',
    fact_en: 'Question papers are printed bilingually in Tamil and English. In case of any discrepancy in translation, official guidelines recommend referencing the English version.',
    fact_ta: 'வினாத்தாள் தமிழ் மற்றும் ஆங்கில மொழிகளில் அச்சடிக்கப்படுகிறது. மொழியாக்கத்தில் ஏதேனும் முரண்பாடு இருப்பின் ஆங்கில வடிவமே குறிக்கப்பட்டும்.',
    value: 'Bilingual (Tamil & English)',
    source_id: 'dge-2024-paper',
    status: 'CONFIRMED',
    is_current: true,
    last_verified: '2026-08-20'
  },
  {
    id: 'fact-scholarship-amount',
    category: 'ELIGIBILITY',
    fact_en: 'Selected Class 8 students receive a scholarship of Rs 12,000 per annum (Rs 1,000/month) for 4 years from Class 9 to Class 12 under GoI NMMSS scheme.',
    fact_ta: 'தேர்ந்தெடுக்கப்படும் மாணவர்களுக்கு 9 ஆம் வகுப்பு முதல் 12 ஆம் வகுப்பு வரை ஆண்டுக்கு ரூ.12,000 (மாதம் ரூ.1,000) கல்வி உதவித்தொகை வழங்கப்படும்.',
    value: 'Rs. 12,000 / Year (Class 9-12)',
    source_id: 'goi-nmms-guidelines',
    status: 'CONFIRMED',
    is_current: true,
    last_verified: '2026-08-20'
  }
];

export const VERIFIED_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-hall-ticket',
    text_en: 'Printed Official Hall Ticket with candidate Roll Number & Examination Centre details',
    text_ta: 'அதிகாரப்பூர்வ தேர்வுக்கூட நுழைவுச்சீட்டு (Hall Ticket) மற்றும் பதிவெண்',
    category: 'OFFICIAL_REQUIREMENT',
    is_official_requirement: true
  },
  {
    id: 'chk-ball-pen',
    text_en: '2 Good quality Blue or Black Ballpoint Pens (No Gel Pen / No Pencil for OMR)',
    text_ta: '2 நல்ல தரமான நீலம் அல்லது கருப்பு பந்துமுனைப் பேனாக்கள் (Ball Point Pen)',
    category: 'OFFICIAL_REQUIREMENT',
    is_official_requirement: true
  },
  {
    id: 'chk-school-id',
    text_en: 'School Identity Card / Student Identity Proof signed by Headmaster',
    text_ta: 'பள்ளி அடையாள அட்டை (School ID Card) / தலைமையாசிரியர் சான்றளித்த வடிவம்',
    category: 'OFFICIAL_REQUIREMENT',
    is_official_requirement: true
  },
  {
    id: 'chk-writing-pad',
    text_en: 'Clear transparent writing pad without any written markings',
    text_ta: 'எழுத்துக்கள் இல்லாத வெளிப்படையான கார்ட்போர்டு / பேட்',
    category: 'RECOMMENDED_PREPARATION',
    is_official_requirement: false
  },
  {
    id: 'chk-reach-early',
    text_en: 'Reach examination centre at least 45 minutes before the reporting time',
    text_ta: 'தேர்வு மையத்திற்கு 45 நிமிடங்களுக்கு முன்பாகவே சென்றடைதல்',
    category: 'RECOMMENDED_PREPARATION',
    is_official_requirement: false
  }
];

export const HISTORICAL_EXAM_TABLE = [
  {
    year: 2024,
    mat_qs: 90,
    sat_qs: 90,
    duration: '90 Mins each',
    omr_rule: 'Blue/Black Ballpoint Pen, no whitener',
    source: 'TN DGE Official Paper 2024'
  },
  {
    year: 2023,
    mat_qs: 90,
    sat_qs: 90,
    duration: '90 Mins each',
    omr_rule: 'Rough work on booklet only',
    source: 'TN DGE Official Paper 2023'
  },
  {
    year: 2022,
    mat_qs: 90,
    sat_qs: 90,
    duration: '90 Mins each',
    omr_rule: 'Full circle shading required',
    source: 'TN DGE Official Paper 2022'
  },
  {
    year: 2017,
    mat_qs: 90,
    sat_qs: 90,
    duration: '90 Mins each',
    omr_rule: 'Ballpoint pen shading',
    source: 'TN DGE Official Paper 2017'
  }
];

export const EXAM_GUIDE_DATA = {
  previousYearPattern: {
    title_en: 'Previous-Year Official Paper Pattern',
    title_ta: 'முந்தைய ஆண்டு அதிகாரப்பூர்வ வினாத்தாள் அமைப்பு',
    sourceType: 'PREVIOUS_PAPER_PATTERN' as const,
    sourceName: 'TN DGE Official Question Papers (2019-2024)',
    mat: {
      name_en: 'Part I - Mental Ability Test (MAT)',
      name_ta: 'பகுதி I - மனத்திறன் தேர்வு (MAT)',
      questions: 90,
      minutes: 90,
      marks: 90,
      topics_en: ['Reasoning', 'Analogy', 'Classification', 'Pattern Recognition', 'Logical Thinking'],
      topics_ta: ['காரணவியல்', 'ஒப்புமை', 'வகைப்படுத்துதல்', 'வடிவ அங்கீகாரம்', 'தர்க்க சிந்தனை']
    },
    sat: {
      name_en: 'Part II - Scholastic Aptitude Test (SAT)',
      name_ta: 'பகுதி II - படிப்புத் திறன் தேர்வு (SAT)',
      questions: 90,
      minutes: 90,
      marks: 90,
      subjects: [
        { name_en: 'Mathematics', name_ta: 'கணிதம்', qRange: 'Qs 91–110', count: 20 },
        { name_en: 'Science', name_ta: 'அறிவியல்', qRange: 'Qs 111–145', count: 35 },
        { name_en: 'Social Science', name_ta: 'சமூக அறிவியல்', qRange: 'Qs 146–180', count: 35 }
      ]
    }
  },

  questionBookletVsOmr: [
    {
      feature_en: 'Primary Purpose',
      feature_ta: 'முக்கிய நோக்கம்',
      booklet_en: 'Read questions & options',
      booklet_ta: 'வினாக்கள் மற்றும் தேர்வுகளை வாசித்தல்',
      omr_en: 'Record final answers',
      omr_ta: 'இறுதி பதில்களைப் பதிவு செய்தல்'
    },
    {
      feature_en: 'Writing Instrument',
      feature_ta: 'எழுதும் சாதனம்',
      booklet_en: 'Any pen or pencil for self-reference',
      booklet_ta: 'சுய பயன்பாட்டிற்கு எந்த பேனா அல்லது பென்சில்',
      omr_en: 'Black Ballpoint Pen ONLY',
      omr_ta: 'கருப்பு நிற பந்துமுனைப் பேனா மட்டுமே'
    },
    {
      feature_en: 'Rough Work Calculations',
      feature_ta: 'முကြட்டுப் பணிகள் / கணக்கீடுகள்',
      booklet_en: 'ALLOWED (in assigned rough work space) ✓',
      booklet_ta: 'அனுமதிக்கப்பட்டது (ஒதுக்கப்பட்ட இடத்தில்) ✓',
      omr_en: 'STRICTLY PROHIBITED ✕',
      omr_ta: 'கண்டிப்பாக தடை செய்யப்பட்டது ✕'
    },
    {
      feature_en: 'Handling After Exam',
      feature_ta: 'தேர்வுக்குப் பின் கையாளும் முறை',
      booklet_en: 'Retained by candidate (if rules permit)',
      booklet_ta: 'மாணவர்கள் எடுத்துச் செல்லலாம் (விதிகள் அனுமதித்தால்)',
      omr_en: 'Mandatory submission to invigilator',
      omr_ta: 'கண்காணிப்பாளரிடம் கட்டாயம் ஒப்படைக்க வேண்டும்'
    }
  ],

  timeManagementStrategy: {
    sourceType: 'RECOMMENDED_STRATEGY' as const,
    rounds: [
      {
        round_en: 'Round 1: Instant Answers',
        round_ta: 'சுற்று 1: உடனடிப் பதில்கள்',
        desc_en: 'Answer all questions you know immediately within the first 35-40 minutes.',
        desc_ta: 'முதல் 35-40 நிமிடங்களில் உங்களுக்கு உடனடியாகத் தெரிந்த வினாக்களுக்குப் பதிலளிக்கவும்.'
      },
      {
        round_en: 'Round 2: Thinking & Calculation',
        round_ta: 'சுற்று 2: யோசித்துச் செய்யும் வினாக்கள்',
        desc_en: 'Solve questions requiring moderate calculation or pattern analysis.',
        desc_ta: 'சற்று கணக்கீடு அல்லது படிவ பகுப்பாய்வு தேவைப்படும் வினாக்களுக்கு விடையளிக்கவும்.'
      },
      {
        round_en: 'Round 3: Final Review',
        round_ta: 'சுற்று 3: இறுதி மீள்பார்வை',
        desc_en: 'Review all unanswered questions and verify OMR bubble darkenings in the last 10 minutes.',
        desc_ta: 'கடைசி 10 நிமிடங்களில் விடுபட்ட வினாக்களைப் பரிசீலித்து, OMR வட்டங்களை சரிபார்க்கவும்.'
      }
    ],
    stuckCard: {
      title_en: 'Stuck on a difficult question? Don\'t panic!',
      title_ta: 'ஒரு வினாவில் சிக்கிக் கொண்டீர்களா? பதற்றமடைய வேண்டாம்!',
      sub_ta: 'ஒரு கேள்வியில் அதிக நேரம் செலவிட வேண்டாம்.',
      steps_en: [
        '1. Read the question once carefully.',
        '2. Try the obvious step or formula.',
        '3. If still unsure, move to the next question immediately.',
        '4. Return later in Round 3 if time permits.'
      ],
      steps_ta: [
        '1. வினாவை ஒருமுறை கவனமாக வாசியுங்கள்.',
        '2. வெளிப்படையான முறையை முயற்சி செய்யுங்கள்.',
        '3. இன்னமும் உறுதியில்லை எனில், உடனே அடுத்த வினாவிற்குச் செல்லுங்கள்.',
        '4. நேரம் இருப்பின் இறுதியில் மீண்டும் முயற்சி செய்யுங்கள்.'
      ]
    }
  },

  markingSystem: {
    sourceType: 'OFFICIAL_RULE' as const,
    correctAnswerMark: '+1 Mark',
    negativeMarkingNotice_en: 'Negative marking for incorrect answers is NOT specified in official DGE instructions currently reviewed. Do not assume a negative marking rule unless stated in the current official notification.',
    negativeMarkingNotice_ta: 'தவறான விடைகளுக்கு எதிர்மறை மதிப்பெண் (Negative Marking) இருப்பதாக அதிகாரப்பூர்வ வினாத்தாளில் குறிப்பிடப்படவில்லை. தற்போதைய அறிவிப்பில் இருந்தால் மட்டுமே அதனை எடுத்துக்கொள்ள வேண்டும்.'
  },

  mentalPreparation: {
    sourceType: 'RECOMMENDED_STRATEGY' as const,
    dayBefore_en: [
      'Do not start completely new or unfamiliar topics.',
      'Revise key formulas, shortcut tricks, and science concepts.',
      'Keep Hall Ticket, Black Ballpoint Pens, and ID Card ready in your bag.',
      'Sleep early for 8 hours to stay mentally fresh.'
    ],
    dayBefore_ta: [
      'முற்றிலும் புதிய அல்லது அறிமுகமில்லாத தலைப்புகளைப் படிக்கத் தொடங்க வேண்டாம்.',
      'முக்கிய சூத்திரங்கள் மற்றும் அறிவியல் கருத்துக்களை மீள்பார்வை செய்யுங்கள்.',
      'ஹால் டிக்கெட், கருப்பு பந்துமுனைப் பேனாக்கள், ID கார்டு ஆகியவற்றை தயாராக வையுங்கள்.',
      'இரவில் 8 மணி நேரம் நன்றாகத் தூங்குங்கள்.'
    ],
    examMorning_en: [
      'Eat a light, healthy breakfast.',
      'Reach the examination centre 45 minutes before reporting time.',
      'Stay calm and listen attentively to invigilator instructions.',
      'Do not compare your preparation with other students at the hall.'
    ],
    examMorning_ta: [
      'மிதமான ஆரோக்கியமான உணவை உண்ணுங்கள்.',
      'தேர்வு மையத்திற்கு 45 நிமிடங்களுக்கு முன்பாகவே சென்று சேருங்கள்.',
      'அமைதியாக இருந்து, கண்காணிப்பாளரின் அறிவிப்புகளை கவனமாகக் கேளுங்கள்.',
      'மற்ற மாணவர்களுடன் உங்கள் தயாரிப்பை ஒப்பிட்டுப் பார்க்க வேண்டாம்.'
    ],
    mindsetQuotes: [
      { en: 'One difficult question does not decide your result.', ta: 'ஒரு கடினமான கேள்வி உங்கள் முடிவைத் தீர்மானிக்காது.' },
      { en: 'Don\'t panic if another student finishes early.', ta: 'மற்றொரு மாணவர் சீக்கிரம் முடித்தால் பதற்றமடைய வேண்டாம்.' },
      { en: 'Read every option carefully before shading.', ta: 'OMR-ல் குறிக்கும் முன் ஒவ்வொருர்வையும் கவனமாகப் படியுங்கள்.' },
      { en: 'Keep your OMR sheet clean and uncreased.', ta: 'உங்கள் OMR தாளை சுத்தமாகவும் மடியாமலும் வையுங்கள்.' },
      { en: 'Trust your daily preparation.', ta: 'உங்கள் தினசரி பயிற்சியை நம்புங்கள்.' }
    ]
  }
};

export const VERIFIED_FAQS: GuideFAQ[] = [
  {
    id: 'faq-1',
    question_en: 'What is the structure of the NMMS Examination in Tamil Nadu?',
    question_ta: 'தமிழ்நாட்டில் NMMS தேர்வின் அமைப்பு என்ன?',
    answer_en: 'The NMMS exam consists of two parts conducted on the same day: Part 1 - Mental Ability Test (MAT, 90 MCQs, 90 Mins) and Part 2 - Scholastic Aptitude Test (SAT, 90 MCQs, 90 Mins: Maths 20, Science 35, Social Science 35).',
    answer_ta: 'NMMS தேர்வு இரண்டு தாள்களைக் கொண்டது: தாள் 1 - மனத்திறன் தேர்வு (MAT, 90 வினாக்கள், 90 நிமிடங்கள்) மற்றும் தாள் 2 - படிப்புத் திறன் தேர்வு (SAT, 90 வினாக்கள்: கணிதம் 20, அறிவியல் 35, சமூக அறிவியல் 35, 90 நிமிடங்கள்).',
    category: 'PATTERN',
    source_id: 'dge-2024-paper',
    status: 'CONFIRMED'
  },
  {
    id: 'faq-2',
    question_en: 'What pen should I use for marking the OMR sheet?',
    question_ta: 'OMR விடைத்தாளில் விடைகளைக் குறிக்க எந்தப் பேனாவைப் பயன்படுத்த வேண்டும்?',
    answer_en: 'As per official TN DGE candidate instructions, you must use a BLUE or BLACK BALL POINT PEN only. Do NOT use gel pens, fountain pens, or pencils for OMR shading.',
    answer_ta: 'தமிழ்நாடு அரசுத் தேர்வுகள் இயக்கக விதிகளின்படி, நீலம் அல்லது கருப்பு நிற பந்துமுனைப் பேனா (Ball Point Pen) மட்டுமே பயன்படுத்த வேண்டும். ஜெல் பேனா அல்லது பென்சில் பயன்படுத்தக்கூடாது.',
    category: 'OMR',
    source_id: 'dge-2024-paper',
    status: 'CONFIRMED'
  },
  {
    id: 'faq-3',
    question_en: 'Is there negative marking for wrong answers in NMMS?',
    question_ta: 'NMMS தேர்வில் தவறான விடைகளுக்கு எதிர்மறை மதிப்பெண் உண்டாகுமா?',
    answer_en: 'Negative marking is NOT specified in official DGE question paper candidate instructions currently available. Each correct answer carries 1 mark.',
    answer_ta: 'தவறான விடைகளுக்கு எதிர்மறை மதிப்பெண் (Negative Marking) இருப்பதாக தற்போதைய அதிகாரப்பூர்வ DGE வினாத்தாளில் குறிப்பிடப்படவில்லை. ஒவ்வொரு சரியான விடைக்கும் 1 மதிப்பெண்.',
    category: 'PATTERN',
    source_id: 'dge-2024-paper',
    status: 'NOT_SPECIFIED'
  },
  {
    id: 'faq-4',
    question_en: 'Where can I perform calculations and rough work?',
    question_ta: 'கணக்கீடுகள் மற்றும் முကြட்டுப் பணிகளை எங்கே செய்ய வேண்டும்?',
    answer_en: 'Rough work must be done strictly in the space provided inside the Question Booklet. Never write or scribble anything on the OMR Answer Sheet.',
    answer_ta: 'கணக்கீடுகளை வினாப் புத்தகத்தில் (Question Booklet) அதற்காக ஒதுக்கப்பட்ட இடத்தில் மட்டுமே செய்ய வேண்டும். OMR விடைத்தாளில் எதையும் எழுதக்கூடாது.',
    category: 'OMR',
    source_id: 'dge-2023-paper',
    status: 'CONFIRMED'
  },
  {
    id: 'faq-5',
    question_en: 'What are the official eligibility criteria for NMMS scholarship?',
    question_ta: 'NMMS உதவித்தொகை பெறுவதற்கான அதிகாரப்பூர்வ தகுதிகள் என்ன?',
    answer_en: 'Class 8 students studying in Government, Aided, and Local Body schools in Tamil Nadu whose parental annual income does not exceed Rs 3,50,000 per annum are eligible under GoI NMMSS guidelines.',
    answer_ta: 'தமிழ்நாடு அரசு, அரசு உதவிபெறும் மற்றும் ஊராட்சி ஒன்றியப் பள்ளிகளில் 8 ஆம் வகுப்பு பயிலும், பெற்றோரின் ஆண்டு வருமானம் ரூ.3,50,000-க்குள் இருக்கும் மாணவர்கள் தகுதியானவர்கள்.',
    category: 'ELIGIBILITY',
    source_id: 'goi-nmms-guidelines',
    status: 'CONFIRMED'
  }
];

