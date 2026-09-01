import type { Subject, Topic, Concept, Question, Student, MockExam, Achievement, SystemSettings } from '../types';

import { VERIFIED_MAT_TOPICS, VERIFIED_MAT_CONCEPTS, VERIFIED_MAT_QUESTIONS } from '../data/mat_topic_system';
import { VERIFIED_SAT_TOPICS, VERIFIED_SAT_CONCEPTS, VERIFIED_SAT_QUESTIONS } from '../data/sat_topic_system';
import { MOCK_MAT_EXAM_QUESTIONS } from '../data/mock_mat_questions';
import { MOCK_SAT_EXAM_QUESTIONS } from '../data/mock_sat_questions';

export const INITIAL_SYSTEM_SETTINGS: SystemSettings = {
  exam_date_status: 'NOT_ANNOUNCED',
  exam_date: '',
  exam_date_source: '',
  academic_year: '2026-27',
  school_name: 'PUM School, Echampatti'
};

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'subj-mat',
    code: 'MAT',
    name_en: 'Mental Ability Test (MAT)',
    name_ta: 'மனத்திறன் தேர்வு (MAT)',
    description_en: 'Number reasoning, verbal logic, non-verbal patterns, logical sequences, and spatial perception.',
    description_ta: 'எண் பகுப்பாய்வு, சொல் மற்றும் எழுத்துத் தொடர், வரைபட வடிவங்கள், தர்க்கவியல் மற்றும் காட்சிப் பிம்பங்கள்.',
    icon: 'Brain',
    order_index: 1,
    topics_count: VERIFIED_MAT_TOPICS.length
  },
  {
    id: 'subj-math',
    code: 'SAT_MATH',
    name_en: 'SAT — Mathematics',
    name_ta: 'SAT — கணிதம்',
    description_en: 'Class 7 & 8 mathematics: Number systems, algebra, geometry, and mensuration.',
    description_ta: '7 மற்றும் 8 ஆம் வகுப்பு கணிதம்: எண்கள், இயற்கணிதம், வடிவியல் மற்றும் அளவியல்.',
    icon: 'Calculator',
    order_index: 2,
    topics_count: VERIFIED_SAT_TOPICS.filter(t => t.subject_id === 'subj-math').length
  },
  {
    id: 'subj-science',
    code: 'SAT_SCIENCE',
    name_en: 'SAT — Science',
    name_ta: 'SAT — அறிவியல்',
    description_en: 'Physics, Chemistry, and Biology based on TN Samacheer Kalvi syllabus.',
    description_ta: 'இயற்பியல், வேதியியல் மற்றும் உயிரியல் தமிழ்நாடு சமச்சீர் கல்வி பாடத்திட்டம்.',
    icon: 'Atom',
    order_index: 3,
    topics_count: VERIFIED_SAT_TOPICS.filter(t => t.subject_id === 'subj-science').length
  },
  {
    id: 'subj-social',
    code: 'SAT_SOCIAL',
    name_en: 'SAT — Social Science',
    name_ta: 'SAT — சமூக அறிவியல்',
    description_en: 'History, Geography, Civics, and Economics for NMMS.',
    description_ta: 'வரலாறு, புவியியல், குடிமையியல் மற்றும் பொருளியல் பாடங்கள்.',
    icon: 'Globe',
    order_index: 4,
    topics_count: VERIFIED_SAT_TOPICS.filter(t => t.subject_id === 'subj-social').length
  }
];

export const INITIAL_TOPICS: Topic[] = [
  ...VERIFIED_MAT_TOPICS,
  ...VERIFIED_SAT_TOPICS
];

export const INITIAL_CONCEPTS: Concept[] = [
  ...VERIFIED_MAT_CONCEPTS,
  ...VERIFIED_SAT_CONCEPTS,
  {
    id: 'concept-mat-num-series',
    topic_id: 'topic-mat-1',
    title_en: 'Difference-Based Number Series',
    title_ta: 'வித்தியாச அடிப்படையிலான எண் தொடர்',
    summary_en: 'Find the pattern by checking the difference between adjacent numbers.',
    summary_ta: 'அடுத்தடுத்த எண்களுக்கு இடையேயான வித்தியாசத்தைக் கண்டு விடையைக் கண்டறியவும்.',
    explanation_en: 'In difference-based number series, the numbers increase or decrease by a constant amount or by a sequence (e.g. +2, +4, +6, +8). Always calculate the difference between consecutive terms first.',
    explanation_ta: 'எண் தொடர்களில் அடுத்தடுத்த எண்களுக்கு இடையே உள்ள வேறுபாடு ஒரு குறிப்பிட்ட விதியின்படி (+2, +4, +6...) அதிகரிக்கும். முதலில் அடுத்தடுத்த எண்களைக் கழித்து வேறுபாட்டைக் கண்டறியவும்.',
    example_en: 'Example: 3, 7, 11, 15, ? \nDifference is +4 everywhere. Next number = 15 + 4 = 19.',
    example_ta: 'எடுத்துக்காட்டு: 3, 7, 11, 15, ? \nஒவ்வொரு எண்ணிற்கும் இடையே வித்தியாசம் +4. அடுத்த எண் = 15 + 4 = 19.',
    solved_question: {
      question_en: 'Find the missing number in the series: 5, 10, 17, 26, ?',
      question_ta: 'பின்வரும் தொடரில் விடுபட்ட எண்ணைக் காண்க: 5, 10, 17, 26, ?',
      options_en: ['35', '37', '39', '40'],
      options_ta: ['35', '37', '39', '40'],
      correct_index: 1,
      explanation_en: 'The differences between consecutive terms are +5, +7, +9. The next difference must be +11. So 26 + 11 = 37.',
      explanation_ta: 'எண்களுக்கு இடையேயான வேறுபாடு +5, +7, +9 என ஒற்றை எண்களாக அதிகரிக்கிறது. அடுத்த வேறுபாடு +11 ஆகும். எனவே 26 + 11 = 37.'
    },
    order_index: 1
  },
  {
    id: 'concept-mat-analogy',
    topic_id: 'topic-mat-2',
    title_en: 'Numerical Analogy',
    title_ta: 'எண் ஒப்புமை',
    summary_en: 'Establish the exact logic between the first pair and apply it to the second pair.',
    summary_ta: 'முதல் ஜோடி எண்களுக்கு இடையேயான தர்க்கத்தைக் கண்டறிந்து அதை இரண்டாவது ஜோடிக்கு பயன்படுத்துங்கள்.',
    explanation_en: 'Numerical analogy questions present pairs in the format A : B :: C : ?. Identify whether A is multiplied, squared, cubed, or offset to get B.',
    explanation_ta: 'எண் ஒப்புமை வினாக்களில் A : B :: C : ? என்ற வடிவம் இருக்கும். A-விலிருந்து B எவ்வாறு பெறப்பட்டது (வர்க்கம், கனம், பெருக்கல்) என்பதை அறிந்து C-க்கு பயன்படுத்தவும்.',
    example_en: 'Example: 4 : 16 :: 7 : ? \nLogic: 4² = 16. Therefore, 7² = 49.',
    example_ta: 'எடுத்துக்காட்டு: 4 : 16 :: 7 : ? \nதர்க்கம்: 4² = 16. எனவே, 7² = 49.',
    solved_question: {
      question_en: '8 : 64 :: 11 : ?',
      question_ta: '8 : 64 :: 11 : ?',
      options_en: ['110', '121', '132', '144'],
      options_ta: ['110', '121', '132', '144'],
      correct_index: 1,
      explanation_en: '8 squared is 64 (8² = 64). Similarly, 11 squared is 121 (11² = 121).',
      explanation_ta: '8-ன் வர்க்கம் 64 (8² = 64). அதேபோல் 11-ன் வர்க்கம் 121 (11² = 121).'
    },
    order_index: 1
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  ...VERIFIED_MAT_QUESTIONS,
  ...VERIFIED_SAT_QUESTIONS,
  {
    id: 'q-mat-2024-01',
    subject_id: 'subj-mat',
    topic_id: 'topic-mat-1',
    concept_id: 'concept-mat-num-series',
    question_en: 'Find the next number in the given series: 2, 6, 12, 20, 30, ?',
    question_ta: 'கொடுக்கப்பட்ட தொடரில் அடுத்த எண்ணைக் கண்டறிக: 2, 6, 12, 20, 30, ?',
    option_a_en: '38',
    option_a_ta: '38',
    option_b_en: '40',
    option_b_ta: '40',
    option_c_en: '42',
    option_c_ta: '42',
    option_d_en: '44',
    option_d_ta: '44',
    correct_option: 'C',
    explanation_en: 'Pattern of differences: +4, +6, +8, +10. The next difference is +12. Therefore, 30 + 12 = 42 (Also n² + n logic: 1²+1=2, 2²+2=6, 3²+3=12, 4²+4=20, 5²+5=30, 6²+6=42).',
    explanation_ta: 'வேறுபாடுகளின் வரிசை: +4, +6, +8, +10. அடுத்த வேறுபாடு +12 ஆகும். எனவே 30 + 12 = 42 (மேலும் n² + n விதி: 1²+1=2, 2²+2=6, 3²+3=12, 4²+4=20, 5²+5=30, 6²+6=42).',
    difficulty: 'MEDIUM',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_PAPER',
    source_name: 'Tamil Nadu DGE NMMS Examination 2024',
    source_url: 'https://www.dge.tn.gov.in/nmms_qb.html',
    source_year: 2024,
    source_page: 2,
    verification_status: 'VERIFIED',
    created_by: 'OFFICIAL_DGE_TN',
    verified_by: 'NMMS_VERIFICATION_CELL',
    verified_at: '2026-01-15T10:00:00Z',
    created_at: '2026-01-15T10:00:00Z'
  },
  {
    id: 'q-mat-2024-02',
    subject_id: 'subj-mat',
    topic_id: 'topic-mat-2',
    concept_id: 'concept-mat-analogy',
    question_en: 'Select the related number from given alternatives: 12 : 144 :: 15 : ?',
    question_ta: 'கொடுக்கப்பட்ட மாற்றுக்களிலிருந்து தொடர்புடைய எண்ணைத் தேர்ந்தெடுக்கவும்: 12 : 144 :: 15 : ?',
    option_a_en: '215',
    option_a_ta: '215',
    option_b_en: '225',
    option_b_ta: '225',
    option_c_en: '250',
    option_c_ta: '250',
    option_d_en: '300',
    option_d_ta: '300',
    correct_option: 'B',
    explanation_en: '12 squared is 144 (12² = 144). Similarly, 15 squared is 225 (15² = 225).',
    explanation_ta: '12-ன் வர்க்கம் 144 (12² = 144). அதேபோன்று 15-ன் வர்க்கம் 225 (15² = 225).',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_PAPER',
    source_name: 'Tamil Nadu DGE NMMS Examination 2024',
    source_url: 'https://www.dge.tn.gov.in/nmms_qb.html',
    source_year: 2024,
    source_page: 3,
    verification_status: 'VERIFIED',
    created_by: 'OFFICIAL_DGE_TN',
    verified_by: 'NMMS_VERIFICATION_CELL',
    verified_at: '2026-01-15T10:00:00Z',
    created_at: '2026-01-15T10:00:00Z'
  },
  {
    id: 'q-math-2023-01',
    subject_id: 'subj-math',
    topic_id: 'topic-math-1',
    question_en: 'What is the additive inverse of -7/9?',
    question_ta: '-7/9 இன் கூட்டல் எதிர்மறை எது?',
    option_a_en: '7/9',
    option_a_ta: '7/9',
    option_b_en: '-9/7',
    option_b_ta: '-9/7',
    option_c_en: '9/7',
    option_c_ta: '9/7',
    option_d_en: '0',
    option_d_ta: '0',
    correct_option: 'A',
    explanation_en: 'The additive inverse of a rational number a/b is -a/b, such that their sum equals 0. Therefore, (-7/9) + (7/9) = 0.',
    explanation_ta: 'ஒரு விகிதமுறு எண் a/b இன் கூட்டல் எதிர்மறை -a/b ஆகும். இரண்டின் கூடுதல் 0 வர வேண்டும். எனவே (-7/9) + (7/9) = 0.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_PAPER',
    source_name: 'Tamil Nadu DGE NMMS Examination 2023',
    source_url: 'https://www.dge.tn.gov.in/nmms_qb.html',
    source_year: 2023,
    source_page: 12,
    verification_status: 'VERIFIED',
    created_by: 'OFFICIAL_DGE_TN',
    verified_by: 'NMMS_VERIFICATION_CELL',
    verified_at: '2026-01-15T10:00:00Z',
    created_at: '2026-01-15T10:00:00Z'
  },
  {
    id: 'q-sci-2024-01',
    subject_id: 'subj-science',
    topic_id: 'topic-sci-1',
    question_en: 'What is the SI unit of electric current?',
    question_ta: 'மின்னோட்டத்தின் SI அலகு எது?',
    option_a_en: 'Volt',
    option_a_ta: 'வோல்ட்',
    option_b_en: 'Ampere',
    option_b_ta: 'ஆம்பியர்',
    option_c_en: 'Ohm',
    option_c_ta: 'ஓம்',
    option_d_en: 'Joule',
    option_d_ta: 'ஜூல்',
    correct_option: 'B',
    explanation_en: 'The SI unit of electric current is Ampere (A), named after André-Marie Ampère.',
    explanation_ta: 'மின்னோட்டத்தின் பன்னாட்டு SI அலகு ஆம்பியர் (A) ஆகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_PAPER',
    source_name: 'Tamil Nadu DGE NMMS Examination 2024',
    source_url: 'https://www.dge.tn.gov.in/nmms_qb.html',
    source_year: 2024,
    source_page: 18,
    verification_status: 'VERIFIED',
    created_by: 'OFFICIAL_DGE_TN',
    verified_by: 'NMMS_VERIFICATION_CELL',
    verified_at: '2026-01-15T10:00:00Z',
    created_at: '2026-01-15T10:00:00Z'
  },
  {
    id: 'q-soc-2024-01',
    subject_id: 'subj-social',
    topic_id: 'topic-soc-1',
    question_en: 'Who is known as the Architect of the Indian Constitution?',
    question_ta: 'இந்திய அரசியலமைப்பின் தந்தை / சிற்பி என அழைக்கப்படுபவர் யார்?',
    option_a_en: 'Mahatma Gandhi',
    option_a_ta: 'மகாத்மா காந்தி',
    option_b_en: 'Dr. B.R. Ambedkar',
    option_b_ta: 'டாக்டர் பி.ஆர். அம்பேத்கர்',
    option_c_en: 'Jawaharlal Nehru',
    option_c_ta: 'ஜவாஹர்லால் நேரு',
    option_d_en: 'Sardar Vallabhbhai Patel',
    option_d_ta: 'சர்தார் வல்லபாய் படேல்',
    correct_option: 'B',
    explanation_en: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee of the Constituent Assembly and is regarded as the Chief Architect of the Constitution of India.',
    explanation_ta: 'டாக்டர் பி.ஆர். அம்பேத்கர் இந்திய அரசியலமைப்பு வரைவுக் குழுவின் தலைவராக செயல்பட்டு இந்திய அரசியலமைப்பை உருவாக்கினார்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_PAPER',
    source_name: 'Tamil Nadu DGE NMMS Examination 2024',
    source_url: 'https://www.dge.tn.gov.in/nmms_qb.html',
    source_year: 2024,
    source_page: 24,
    verification_status: 'VERIFIED',
    created_by: 'OFFICIAL_DGE_TN',
    verified_by: 'NMMS_VERIFICATION_CELL',
    verified_at: '2026-01-15T10:00:00Z',
    created_at: '2026-01-15T10:00:00Z'
  }
];

export const DEMO_STUDENT: Student = {
  id: 'std-pum26001',
  student_id: 'PUM26001',
  pin: '4821',
  name: 'Arun Kumar',
  class_section: '8-A',
  medium: 'TA',
  status: 'ACTIVE',
  xp: 380,
  level: 3,
  streak_days: 7,
  last_active_date: new Date().toISOString().split('T')[0],
  created_at: '2026-01-01T00:00:00Z'
};

export const INITIAL_MOCK_EXAMS: MockExam[] = [
  {
    id: 'mock-mat-full-1',
    title_en: 'Official MAT Grand Practice Examination 1',
    title_ta: 'அதிகாரப்பூர்வ MAT மாதிரித் தேர்வு 1',
    type: 'MAT',
    duration_minutes: 45,
    total_questions: 45,
    pass_percentage: 40,
    status: 'PUBLISHED',
    created_at: '2026-01-10T00:00:00Z',
    questions: MOCK_MAT_EXAM_QUESTIONS
  },
  {
    id: 'mock-sat-full-1',
    title_en: 'Official SAT Grand Practice Examination 1',
    title_ta: 'அதிகாரப்பூர்வ SAT மாதிரித் தேர்வு 1',
    type: 'SAT',
    duration_minutes: 45,
    total_questions: 45,
    pass_percentage: 40,
    status: 'PUBLISHED',
    created_at: '2026-01-10T00:00:00Z',
    questions: MOCK_SAT_EXAM_QUESTIONS
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    code: 'ACH_FIRST_CONCEPT',
    title_en: 'First Step to NMMS',
    title_ta: 'NMMS முதல் படி',
    description_en: 'Completed your first concept explanation.',
    description_ta: 'உங்கள் முதல் பாடக் கருத்தைப் படித்து முடித்தீர்கள்.',
    icon: 'BookOpen',
    xp_reward: 20,
    unlocked: true,
    unlocked_at: '2026-01-05T10:00:00Z'
  },
  {
    code: 'ACH_STREAK_7',
    title_en: '7-Day Learning Warrior',
    title_ta: '7 நாள் தொடர் சாதனையாளர்',
    description_en: 'Maintained a 7-day continuous learning streak.',
    description_ta: 'தொடர்ந்து 7 நாட்கள் தினமும் படித்தீர்கள்.',
    icon: 'Flame',
    xp_reward: 50,
    unlocked: true,
    unlocked_at: '2026-01-12T10:00:00Z'
  },
  {
    code: 'ACH_PRACTICE_50',
    title_en: 'Practice Master (50 Qs)',
    title_ta: 'பயிற்சி மாஸ்டர் (50 வினாக்கள்)',
    description_en: 'Solved 50 verified practice questions.',
    description_ta: '50 சரிபார்க்கப்பட்ட வினாக்களுக்கு விடையளித்தீர்கள்.',
    icon: 'CheckCircle2',
    xp_reward: 100,
    unlocked: false
  },
  {
    code: 'ACH_MOCK_FINISHER',
    title_en: 'NMMS Exam Challenger',
    title_ta: 'NMMS மாதிரித் தேர்வு வீரன்',
    description_en: 'Completed a full 90-minute NMMS simulation test.',
    description_ta: '90 நிமிட முழு மாதிரித் தேர்வை வெற்றிகரமாக முடித்தீர்கள்.',
    icon: 'Trophy',
    xp_reward: 150,
    unlocked: false
  }
];
