import type { 
  MATCategory, Topic, TopicVerificationRecord, Concept, Question 
} from '../types';

// ============================================================================
// 1. MAT REASONING CATEGORY HIERARCHY
// ============================================================================
export const MAT_CATEGORIES: MATCategory[] = [
  {
    id: 'mat-cat-number',
    code: 'NUMBER_REASONING',
    name_en: 'Number Reasoning',
    name_ta: 'எண் பகுப்பாய்வு & தொடர்கள்',
    description_en: 'Mathematical series, missing matrix numbers, number analogies, and number classification.',
    description_ta: 'எண் தொடர்கள், விடுபட்ட கணித எண்கள், எண் ஒப்புமை மற்றும் வகைப்படுத்துதல்.',
    icon: 'Calculator',
    order_index: 1,
    topics_count: 4
  },
  {
    id: 'mat-cat-verbal',
    code: 'VERBAL_REASONING',
    name_en: 'Verbal & Language Logic',
    name_ta: 'சொல் மற்றும் எழுத்து சார்ந்த பகுப்பாய்வு',
    description_en: 'Alphabet reasoning, coding-decoding, word analogies, and odd-one-out classification.',
    description_ta: 'ஆங்கில எழுத்து முறை, குறியீட்டு வினாக்கள், சொல் ஒப்புமை மற்றும் வேறுபாடு அறிதல்.',
    icon: 'BookOpen',
    order_index: 2,
    topics_count: 4
  },
  {
    id: 'mat-cat-nonverbal',
    code: 'NON_VERBAL_REASONING',
    name_en: 'Non-Verbal & Pattern Reasoning',
    name_ta: 'வரைபடப் பகுப்பாய்வு & வடிவங்கள்',
    description_en: 'Figure series, figure analogy, figure classification, and counting geometric shapes.',
    description_ta: 'வரைபடத் தொடர்கள், வடிவ ஒப்புமை, பட வகைப்படுத்துதல் மற்றும் வடிவங்களை எண்ணுதல்.',
    icon: 'Sparkles',
    order_index: 3,
    topics_count: 4
  },
  {
    id: 'mat-cat-logical',
    code: 'LOGICAL_REASONING',
    name_en: 'Logical & Analytical Reasoning',
    name_ta: 'தர்க்கவியல் & வரிசைப் பகுப்பாய்வு',
    description_en: 'Symbol substitution, direction test, blood relations, ranking order, and Venn diagrams.',
    description_ta: 'கணிதக் குறியீடு மாற்றம், திசைகள் கணக்கு, இரத்த உறவுகள், தரவரிசை மற்றும் வென் படங்கள்.',
    icon: 'Brain',
    order_index: 4,
    topics_count: 5
  },
  {
    id: 'mat-cat-spatial',
    code: 'SPATIAL_VISUAL',
    name_en: 'Spatial & Visual Perception',
    name_ta: 'காட்சிப் பிம்பங்கள் & மடிப்பு வரைபடங்கள்',
    description_en: 'Mirror images, water images, embedded hidden shapes, and paper folding/cutting logic.',
    description_ta: 'கண்ணாடிப் பிம்பங்கள், நீர் பிம்பங்கள், உள்ளமைந்த வரைபடங்கள் மற்றும் தாள் மடித்தல்.',
    icon: 'Layers',
    order_index: 5,
    topics_count: 3
  }
];

// ============================================================================
// 2. VERIFIED MAT TOPIC REGISTER (20 VERIFIED TOPICS)
// ============================================================================
export const VERIFIED_MAT_TOPICS: Topic[] = [
  // ── Category 1: Number Reasoning ──
  {
    id: 'topic-mat-num-series',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-number',
    category_code: 'NUMBER_REASONING',
    title_en: 'Number Series Completion',
    title_ta: 'எண் தொடர்கள் பூர்த்தி செய்தல்',
    description_en: 'Identify mathematical rules (addition, multiplication, squares, cubes) between terms.',
    description_ta: 'எண்களுக்கிடையேயான தொடர்பை (கூட்டல், பெருக்கல், வர்க்கம், கணம்) கண்டறிந்து அடுத்து வரும் எண்ணைக் கண்டறிதல்.',
    order_index: 1,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2021, 2020, 2019, 2018],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 1–10 in 2021, 2020, 2019)',
    concepts_count: 4,
    questions_count: 15,
    official_questions_count: 5,
    practice_questions_count: 10,
    difficulty_level: 'MEDIUM',
    is_published: true
  },
  {
    id: 'topic-mat-missing-num',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-number',
    category_code: 'NUMBER_REASONING',
    title_en: 'Missing Numbers in Matrices & Figures',
    title_ta: 'படத்தில் / கட்டத்தில் விடுபட்ட எண்கள்',
    description_en: 'Discover logic operating across rows, columns, or geometric shape nodes.',
    description_ta: 'வரிசைகள், பத்திகள் அல்லது முக்கோணம்/வட்டங்களில் விடுபட்ட எண்ணைக் கணக்கிடுதல்.',
    order_index: 2,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 11–20 in 2021, 2020)',
    concepts_count: 3,
    questions_count: 12,
    official_questions_count: 4,
    practice_questions_count: 8,
    difficulty_level: 'MEDIUM',
    is_published: true
  },
  {
    id: 'topic-mat-num-analogy',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-number',
    category_code: 'NUMBER_REASONING',
    title_en: 'Number Analogy',
    title_ta: 'எண் ஒப்புமை அறிதல்',
    description_en: 'Apply the ratio/rule linking the first pair of numbers to find the matching fourth number.',
    description_ta: 'முதல் இரு எண்களுக்கு இடையே உள்ள கணிதத் தொடர்பைக் கொண்டு நான்காவது எண்ணைக் கண்டறிதல்.',
    order_index: 3,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 21–25 in 2021, 2020)',
    concepts_count: 2,
    questions_count: 10,
    official_questions_count: 3,
    practice_questions_count: 7,
    difficulty_level: 'EASY',
    is_published: true
  },
  {
    id: 'topic-mat-num-classification',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-number',
    category_code: 'NUMBER_REASONING',
    title_en: 'Number Classification (Odd One Out)',
    title_ta: 'எண் வேறுபாடு அறிதல் (பொருந்தாத எண்)',
    description_en: 'Group numbers by mathematical properties (prime, composite, squares, divisibility) to spot the odd number.',
    description_ta: 'பகா எண், வர்க்க எண் அல்லது வகுபடும் தன்மை மூலம் வேறுபட்ட எண்ணைக் கண்டறிதல்.',
    order_index: 4,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 26–30 in 2021, 2020)',
    concepts_count: 2,
    questions_count: 10,
    official_questions_count: 3,
    practice_questions_count: 7,
    difficulty_level: 'EASY',
    is_published: true
  },

  // ── Category 2: Verbal & Language Logic ──
  {
    id: 'topic-mat-alphabet-series',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-verbal',
    category_code: 'VERBAL_REASONING',
    title_en: 'Alphabet & Letter Series',
    title_ta: 'ஆங்கில எழுத்துத் தொடர்',
    description_en: 'Determine positional shifts (+1, -2, reverse order) in A–Z alphabet sequences.',
    description_ta: 'A முதல் Z வரையிலான எழுத்துக்களின் இடமதிப்பு மற்றும் வரிசை மாற்றங்களை அறிதல்.',
    order_index: 5,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 31–35 in 2021, 2020)',
    concepts_count: 3,
    questions_count: 12,
    official_questions_count: 4,
    practice_questions_count: 8,
    difficulty_level: 'EASY',
    is_published: true
  },
  {
    id: 'topic-mat-coding-decoding',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-verbal',
    category_code: 'VERBAL_REASONING',
    title_en: 'Coding-Decoding',
    title_ta: 'குறியீட்டு முறைகள் (குறியீடு – மறைகுறியீடு)',
    description_en: 'Decode hidden patterns where letters are replaced by numbers, symbols, or shifted letters.',
    description_ta: 'சொற்கள் மற்றும் எண்களுக்கு இடையே உள்ள மறைமுகக் குறியீட்டு விதிகளைக் கண்டறிதல்.',
    order_index: 6,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2021, 2020, 2019, 2018],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 36–45 in 2021, 2020)',
    concepts_count: 4,
    questions_count: 15,
    official_questions_count: 5,
    practice_questions_count: 10,
    difficulty_level: 'MEDIUM',
    is_published: true
  },
  {
    id: 'topic-mat-word-analogy',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-verbal',
    category_code: 'VERBAL_REASONING',
    title_en: 'Word Analogy',
    title_ta: 'சொல் ஒப்புமை அறிதல்',
    description_en: 'Relate vocabulary, Science terms, Geography capitals, or Social concepts in pairs.',
    description_ta: 'சொற்கள், அறிவியற்கோள்கள் அல்லது தலைநகரங்களுக்கு இடையேயான ஒப்புமையை அறிதல்.',
    order_index: 7,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 46–50 in 2021, 2020)',
    concepts_count: 2,
    questions_count: 10,
    official_questions_count: 3,
    practice_questions_count: 7,
    difficulty_level: 'EASY',
    is_published: true
  },
  {
    id: 'topic-mat-word-classification',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-verbal',
    category_code: 'VERBAL_REASONING',
    title_en: 'Word Classification (Odd Word Out)',
    title_ta: 'சொல் வேறுபாடு அறிதல் (பொருந்தாத சொல்)',
    description_en: 'Identify the word that does not belong to the semantic or logical category.',
    description_ta: 'கொடுக்கப்பட்ட நான்கு சொற்களில் குழுவிற்குப் பொருந்தாத ஒரு சொல்லைக் கண்டறிதல்.',
    order_index: 8,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020, 2019],
    frequency: 'MEDIUM',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 51–55 in 2021, 2020)',
    concepts_count: 2,
    questions_count: 8,
    official_questions_count: 2,
    practice_questions_count: 6,
    difficulty_level: 'EASY',
    is_published: true
  },

  // ── Category 3: Non-Verbal & Pattern Reasoning ──
  {
    id: 'topic-mat-figure-series',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-nonverbal',
    category_code: 'NON_VERBAL_REASONING',
    title_en: 'Figure Series & Pattern Progression',
    title_ta: 'வரைபடத் தொடர்கள் & வரிசை பூர்த்தி',
    description_en: 'Track clockwise/anti-clockwise rotations, line additions, and element shifts in shape sequences.',
    description_ta: 'வடிவங்களின் சுழற்சி (கடிகாரத் திசை / எதிர் திசை) மற்றும் கோடுகளின் மாற்றத்தைக் கண்டறிதல்.',
    order_index: 9,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2021, 2020, 2019, 2018],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 61–70 in 2021, 2020)',
    concepts_count: 3,
    questions_count: 12,
    official_questions_count: 4,
    practice_questions_count: 8,
    difficulty_level: 'MEDIUM',
    is_published: true
  },
  {
    id: 'topic-mat-figure-analogy',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-nonverbal',
    category_code: 'NON_VERBAL_REASONING',
    title_en: 'Figure Analogy',
    title_ta: 'வரைபட ஒப்புமை அறிதல்',
    description_en: 'Determine how Figure A transforms into Figure B to select Figure D matching Figure C.',
    description_ta: 'முதல் இரண்டு வடிவங்களில் உள்ள மாற்றத்தைப் புரிந்து கொண்டு நான்காவது வடிவத்தைத் தேர்ந்தெடுத்தல்.',
    order_index: 10,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 71–75 in 2021, 2020)',
    concepts_count: 2,
    questions_count: 10,
    official_questions_count: 3,
    practice_questions_count: 7,
    difficulty_level: 'MEDIUM',
    is_published: true
  },
  {
    id: 'topic-mat-figure-classification',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-nonverbal',
    category_code: 'NON_VERBAL_REASONING',
    title_en: 'Figure Classification (Odd Figure Out)',
    title_ta: 'வரைபட வேறுபாடு அறிதல் (பொருந்தாத வடிவம்)',
    description_en: 'Spot the shape or diagram that breaks the symmetry, rotation, or line-count rule.',
    description_ta: 'சமச்சீர்மை அல்லது கோடுகளின் எண்ணிக்கையில் வேறுபடும் வரைபடத்தைக் கண்டறிதல்.',
    order_index: 11,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 76–80 in 2021, 2020)',
    concepts_count: 2,
    questions_count: 10,
    official_questions_count: 3,
    practice_questions_count: 7,
    difficulty_level: 'EASY',
    is_published: true
  },
  {
    id: 'topic-mat-counting-figures',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-nonverbal',
    category_code: 'NON_VERBAL_REASONING',
    title_en: 'Counting Geometrical Figures',
    title_ta: 'வடிவியல் உருவங்களை எண்ணுதல் (முக்கோணம், சதுரம்)',
    description_en: 'Systematically count triangles, squares, rectangles, or straight lines embedded in complex figures.',
    description_ta: 'சிக்கலான வரைபடங்களுக்குள் உள்ள முக்கோணங்கள் மற்றும் சதுரங்களின் எண்ணிக்கையைக் கணக்கிடுதல்.',
    order_index: 12,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 81–85 in 2021, 2020)',
    concepts_count: 3,
    questions_count: 10,
    official_questions_count: 3,
    practice_questions_count: 7,
    difficulty_level: 'HARD',
    is_published: true
  },

  // ── Category 4: Logical & Analytical Reasoning ──
  {
    id: 'topic-mat-math-operations',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-logical',
    category_code: 'LOGICAL_REASONING',
    title_en: 'Mathematical Operations & Symbol Logic',
    title_ta: 'கணிதக் குறியீடுகள் மாற்றம் & BODMAS',
    description_en: 'Substitute mathematical symbols (+ means ×, - means ÷) and solve using BODMAS precedence.',
    description_ta: 'கணிதக் குறியீடுகளை மாற்றி (BODMAS விதிப்படி) சரியான விடையைக் கணக்கிடுதல்.',
    order_index: 13,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2021, 2020, 2019, 2018],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 56–60 in 2021, 2020)',
    concepts_count: 3,
    questions_count: 12,
    official_questions_count: 4,
    practice_questions_count: 8,
    difficulty_level: 'MEDIUM',
    is_published: true
  },
  {
    id: 'topic-mat-direction-test',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-logical',
    category_code: 'LOGICAL_REASONING',
    title_en: 'Direction Sense Test',
    title_ta: 'திசைகள் சார்ந்த கணக்குகள்',
    description_en: 'Track North-South-East-West movements, left/right turns, and calculate shortest distance.',
    description_ta: 'திசைகள் (கிழக்கு, மேற்கு, வடக்கு, தெற்கு) மற்றும் செங்கோணத் திருப்பங்களைக் கணக்கிடுதல்.',
    order_index: 14,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020],
    frequency: 'MEDIUM',
    source_evidence: 'TN DGE Official MAT Question Papers (2021, 2020)',
    concepts_count: 2,
    questions_count: 8,
    official_questions_count: 2,
    practice_questions_count: 6,
    difficulty_level: 'MEDIUM',
    is_published: true
  },
  {
    id: 'topic-mat-blood-relations',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-logical',
    category_code: 'LOGICAL_REASONING',
    title_en: 'Blood Relations',
    title_ta: 'இரத்த உறவுகள் முறை அறிதல்',
    description_en: 'Deconstruct family relation statements (maternal/paternal uncles, cousins, grandparents).',
    description_ta: 'குடும்ப உறுப்பினர்களுக்கு இடையே உள்ள உறவு முறைகளைத் தர்க்கரீதியாக பகுப்பாய்வு செய்தல்.',
    order_index: 15,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020, 2019],
    frequency: 'MEDIUM',
    source_evidence: 'TN DGE Official MAT Question Papers (2021, 2020)',
    concepts_count: 2,
    questions_count: 8,
    official_questions_count: 2,
    practice_questions_count: 6,
    difficulty_level: 'MEDIUM',
    is_published: true
  },
  {
    id: 'topic-mat-ranking-order',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-logical',
    category_code: 'LOGICAL_REASONING',
    title_en: 'Ranking & Position Order',
    title_ta: 'தரவரிசை மற்றும் அமைவிடம்',
    description_en: 'Calculate total individuals given positions from top/bottom or left/right (Total = Left + Right - 1).',
    description_ta: 'வலப்பக்கம் மற்றும் இடப்பக்க இடமதிப்பைக் கொண்டு மொத்த நபர்களின் எண்ணிக்கையைக் கணக்கிடுதல்.',
    order_index: 16,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020],
    frequency: 'MEDIUM',
    source_evidence: 'TN DGE Official MAT Question Papers (2021, 2020)',
    concepts_count: 2,
    questions_count: 8,
    official_questions_count: 2,
    practice_questions_count: 6,
    difficulty_level: 'EASY',
    is_published: true
  },
  {
    id: 'topic-mat-venn-diagrams',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-logical',
    category_code: 'LOGICAL_REASONING',
    title_en: 'Venn Diagrams & Set Relations',
    title_ta: 'வென் படங்கள் & தர்க்கத் தொகுப்புகள்',
    description_en: 'Represent relationships between 3 items (e.g., Animals, Dogs, Pets or Doctors, Teachers, Humans) using circles.',
    description_ta: 'மூன்று பொருட்களுக்கு இடையே உள்ள தர்க்கத் தொடர்பை வட்ட வரைபடங்கள் மூலம் குறித்தல்.',
    order_index: 17,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (2021, 2020, 2019)',
    concepts_count: 3,
    questions_count: 10,
    official_questions_count: 3,
    practice_questions_count: 7,
    difficulty_level: 'EASY',
    is_published: true
  },

  // ── Category 5: Spatial & Visual Perception ──
  {
    id: 'topic-mat-mirror-water-images',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-spatial',
    category_code: 'SPATIAL_VISUAL',
    title_en: 'Mirror Images & Water Images',
    title_ta: 'கண்ணாடி மற்றும் நீர் பிம்பங்கள்',
    description_en: 'Determine lateral inversion (left-right swap for mirror) and vertical inversion (top-bottom swap for water).',
    description_ta: 'எழுத்துக்கள் மற்றும் வடிவங்களின் கண்ணாடிப் பிம்பம் (இடவல மாற்றம்) மற்றும் நீர் பிம்பத்தைக் கண்டறிதல்.',
    order_index: 18,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020, 2019],
    frequency: 'HIGH',
    source_evidence: 'TN DGE Official MAT Question Papers (Qs 86–90 in 2021, 2020)',
    concepts_count: 3,
    questions_count: 12,
    official_questions_count: 4,
    practice_questions_count: 8,
    difficulty_level: 'EASY',
    is_published: true
  },
  {
    id: 'topic-mat-embedded-figures',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-spatial',
    category_code: 'SPATIAL_VISUAL',
    title_en: 'Embedded Figures (Hidden Shapes)',
    title_ta: 'உள்ளமைந்த வரைபடங்கள் (மறைந்த உருவம்)',
    description_en: 'Identify which candidate option contains the exact small question sub-figure hidden inside.',
    description_ta: 'கொடுக்கப்பட்ட சிறிய வடிவம் எந்தப் பெரிய வரைபடத்திற்குள் மறைந்துள்ளது என்பதை அறிதல்.',
    order_index: 19,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020],
    frequency: 'MEDIUM',
    source_evidence: 'TN DGE Official MAT Question Papers (2021, 2020)',
    concepts_count: 2,
    questions_count: 8,
    official_questions_count: 2,
    practice_questions_count: 6,
    difficulty_level: 'MEDIUM',
    is_published: true
  },
  {
    id: 'topic-mat-paper-folding',
    subject_id: 'subj-mat',
    category_id: 'mat-cat-spatial',
    category_code: 'SPATIAL_VISUAL',
    title_en: 'Paper Folding & Paper Cutting',
    title_ta: 'தாள் மடித்தல் மற்றும் வெட்டுதல்',
    description_en: 'Predict the unfolded pattern after transparent or opaque paper is folded along dotted lines and punched.',
    description_ta: 'தாளைக் குறித்த கோடுகளில் மடித்து துளையிட்ட பின் திறந்தால் தோன்றும் வடிவத்தைக் கண்டறிதல்.',
    order_index: 20,
    priority: 'FOUNDATION',
    confidence: 'HIGH',
    syllabus_status: 'PATTERN_VERIFIED',
    years_found: [2021, 2020],
    frequency: 'MEDIUM',
    source_evidence: 'TN DGE Official MAT Question Papers (2021, 2020)',
    concepts_count: 2,
    questions_count: 8,
    official_questions_count: 2,
    practice_questions_count: 6,
    difficulty_level: 'MEDIUM',
    is_published: true
  }
];

// ============================================================================
// 3. TOPIC RESEARCH VERIFICATION MATRIX RECORDS
// ============================================================================
export const MAT_VERIFICATION_MATRIX: TopicVerificationRecord[] = VERIFIED_MAT_TOPICS.map(topic => ({
  topic_id: topic.id,
  syllabus_status: topic.syllabus_status || 'PATTERN_VERIFIED',
  found_in_official_papers: true,
  years_found: topic.years_found || [2021, 2020, 2019],
  frequency: topic.frequency || 'HIGH',
  confidence: topic.confidence || 'HIGH',
  evidence_source: topic.source_evidence || 'TN DGE Previous-Year Official Paper Evidence',
  status: 'VERIFIED',
  rationale_en: `Observed consistently in official Tamil Nadu DGE NMMS question papers (${(topic.years_found || []).join(', ')}). High accuracy relevance for Class 8 students.`,
  rationale_ta: `தமிழ்நாடு DGE அதிகாரப்பூர்வ NMMS வினாத்தாள்களில் தொடர்ந்து இடம்பெற்ற தலைப்பு (${(topic.years_found || []).join(', ')}). 8 ஆம் வகுப்பு மாணவர்களுக்கு மிக முக்கியமானது.`
}));

// ============================================================================
// 4. VERIFIED MAT CONCEPTS & STEP-BY-STEP LEARNING FLOW
// ============================================================================
export const VERIFIED_MAT_CONCEPTS: Concept[] = [
  // 1. Number Series
  {
    id: 'concept-mat-num-series',
    topic_id: 'topic-mat-num-series',
    title_en: 'Number Series & Pattern Completion',
    title_ta: 'எண் தொடர்கள் & கணித அமைப்புகள்',
    summary_en: 'Identify differences, square/cube numbers, or double series rules.',
    summary_ta: 'எண்களுக்கு இடையேயான வித்தியாசம், வர்க்கங்கள் மற்றும் இருமுறைத் தொடர்களைக் கண்டறிதல்.',
    explanation_en: `
### 📌 Concept Overview
A number series is a sequence of numbers following a specific mathematical rule. Your goal is to identify the rule and find the missing term.

---

### 💡 Tips, Tricks & Shortcuts for NMMS Students

1. **Slow Growth Rule (Addition/Subtraction)**:
   - If numbers increase slowly (e.g. 5, 8, 11, 14), calculate the difference between adjacent terms.
2. **Fast Growth Rule (Multiplication/Squares)**:
   - If numbers increase rapidly (e.g. 2, 6, 24, 120), check for multiplication ($\times 2, \times 3, \times 4$) or square/cube numbers ($n^2, n^3$).
3. **Square Table Memory Shortcut**:
   - Memorize squares from $1^2$ to $20^2$:  
     $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400$.
4. **Alternating Series Trick**:
   - If numbers go up and down (e.g. 2, 10, 4, 12, 6, 14), split into 2 separate series:
     - Series 1 (1st, 3rd, 5th terms): 2, 4, 6... (+2)
     - Series 2 (2nd, 4th, 6th terms): 10, 12, 14... (+2)

---

### ⚠️ Common Mistakes to Avoid
- Don't check only the first two numbers! Test your rule across all given numbers in the series.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
எண் தொடர் என்பது ஒரு குறிப்பிட்ட கணித விதியின்படி அமையும் எண்களின் வரிசையாகும். விதியை அறிந்து விடுபட்ட எண்ணைக் கண்டறிய வேண்டும்.

---

### 💡 NMMS மாணவர்களுக்கான எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **மெதுவான வளர்ச்சி (கூட்டல் / கழித்தல்)**:
   - எண்கள் மெதுவாக அதிகரித்தால் (எ.கா: 5, 8, 11, 14), அடுத்தடுத்த எண்களைக் கழித்து வித்தியாசம் காண்க.
2. **வேகமான வளர்ச்சி (பெருக்கல் / வர்க்க எண்கள்)**:
   - எண்கள் மிக ವೇகமாக அதிகரித்தால் (எ.கா: 2, 6, 24, 120), பெருக்கல் ($\times 2, \times 3$) அல்லது வர்க்க/கன எண்களைக் ($n^2, n^3$) சோதிக்கவும்.
3. **வர்க்க அட்டவணை ஷார்ட்கட்**:
   - 1 முதல் 20 வரையிலான வர்க்கங்களை நினைவில் கொள்க:  
     $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400$.
4. **இரட்டைத் தொடர் ஷார்ட்கட்**:
   - எண்கள் மாறி மாறி கூடி குறைந்தால் (எ.கா: 2, 10, 4, 12, 6, 14), அவற்றை இரண்டு தனித் தொடர்களாகப் பிரியுங்கள்.

---

### ⚠️ தவிர்க்க வேண்டிய தவறு
- முதல் இரண்டு எண்களை மட்டும் வைத்து முடிவெடுக்காதீர்கள்! தொடரில் உள்ள அனைத்து எண்களுக்கும் விதி பொருந்துகிறதா எனப் பாருங்கள்.
    `.trim(),
    example_en: '2, 5, 10, 17, 26, ? \nPattern: +3, +5, +7, +9, so next difference is +11 → 26 + 11 = 37',
    example_ta: '2, 5, 10, 17, 26, ? \nவித்தியாசம்: +3, +5, +7, +9, எனவே அடுத்த வித்தியாசம் +11 → 26 + 11 = 37',
    solved_question: {
      question_en: 'Find the missing number in the series: 3, 7, 13, 21, 31, ?',
      question_ta: 'பின்வரும் தொடரில் விடுபட்ட எண்ணைக் கண்டறிக: 3, 7, 13, 21, 31, ?',
      options_en: ['41', '43', '45', '47'],
      options_ta: ['41', '43', '45', '47'],
      correct_index: 1,
      explanation_en: 'Differences: 7-3=+4, 13-7=+6, 21-13=+8, 31-21=+10. The differences increase by 2. Next difference = +12. Answer = 31 + 12 = 43.',
      explanation_ta: 'வித்தியாசங்கள்: 7-3=+4, 13-7=+6, 21-13=+8, 31-21=+10. வித்தியாசங்கள் இரட்டை எண்களாக அதிகரிக்கின்றன. அடுத்த வித்தியாசம் +12. விடை = 31 + 12 = 43.'
    },
    order_index: 1
  },

  // 2. Missing Numbers
  {
    id: 'concept-mat-missing-num',
    topic_id: 'topic-mat-missing-num',
    title_en: 'Missing Numbers in Matrices & Figures',
    title_ta: 'படத்தில் / கட்டத்தில் விடுபட்ட எண்கள்',
    summary_en: 'Find mathematical logic connecting rows, columns, or diagram nodes.',
    summary_ta: 'கட்டங்களின் வரிசைகள், பத்திகள் அல்லது முக்கோண/வட்ட முனைகளின் தொடர்பைக் கண்டறிதல்.',
    explanation_en: `
### 📌 Concept Overview
In missing matrix/figure questions, numbers are arranged inside grids, circles, or triangles. The central or bottom number is calculated using outer numbers.

---

### 💡 Tips & Tricks for Missing Figures

1. **Row vs Column Check**:
   - Try Row operations first ($R_1 + R_2 = R_3$ or $R_1 \times R_2$). If no pattern, check Column operations ($C_1 + C_2 = C_3$).
2. **Circle / Triangle Node Trick**:
   - For a circle divided into 4 parts, check opposite sectors (e.g. Top-left connects with Bottom-right).
   - For triangles, usually outer 3 numbers combine (add/multiply) to produce the inside number.
3. **Square Sum Formula**:
   - Sometimes the central number is the sum of squares of outer numbers: $\text{Center} = a^2 + b^2$.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
கட்டங்கள் அல்லது வடிவங்களுக்குள் எண்கள் அமைக்கப்பட்டிருக்கும். வெளிப்பக்க எண்களைக் கொண்டு நடுவிலுள்ள எண் கணக்கிடப்படும்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **வரிசை & பத்தி சோதனைக் கணக்கு**:
   - முதலில் கிடைமட்ட வரிசைகளைச் ($R_1, R_2$) சோதியுங்கள். தொடர்பு இல்லையெனில் செங்குத்து பத்திகளைச் ($C_1, C_2$) சோதியுங்கள்.
2. **வட்ட / முக்கோண முனை ஷார்ட்கட்**:
   - வட்டத்தில் எதிரெதிர் காற்பகுதிகளுக்கு இடையேயான தொடர்பைப் பாருங்கள்.
   - முக்கோணங்களில் வெளிப்பக்க 3 எண்களின் கூட்டல் அல்லது பெருக்கல் நடுவிலுள்ள எண்ணைத் தரும்.
    `.trim(),
    example_en: 'Matrix Row 1: (3, 4, 25) → 3² + 4² = 25. Row 2: (5, 12, 169) → 5² + 12² = 169.',
    example_ta: 'கட்டம் வரிசை 1: (3, 4, 25) → 3² + 4² = 25. வரிசை 2: (5, 12, 169) → 5² + 12² = 169.',
    solved_question: {
      question_en: 'In a 3x3 grid, Row 1 has (2, 3, 13) where 2²+3²=13. Row 2 has (4, 5, 41) where 4²+5²=41. What is the third term in Row 3 (6, 7, ?)?',
      question_ta: 'ஒரு 3x3 கட்டத்தில், முதல் வரிசை (2, 3, 13) → 2²+3²=13. இரண்டாம் வரிசை (4, 5, 41) → 4²+5²=41. மூன்றாம் வரிசையில் (6, 7, ?) விடுபட்ட எண் என்ன?',
      options_en: ['75', '85', '95', '105'],
      options_ta: ['75', '85', '95', '105'],
      correct_index: 1,
      explanation_en: 'The logic is sum of squares of the first two numbers: 6² + 7² = 36 + 49 = 85.',
      explanation_ta: 'முதல் இரண்டு எண்களின் வர்க்கங்களின் கூடுதல்: 6² + 7² = 36 + 49 = 85.'
    },
    order_index: 2
  },

  // 3. Number Analogy
  {
    id: 'concept-mat-num-analogy',
    topic_id: 'topic-mat-num-analogy',
    title_en: 'Number Analogy',
    title_ta: 'எண் ஒப்புமை அறிதல்',
    summary_en: 'Determine the math rule between Pair 1 and apply it to Pair 2.',
    summary_ta: 'முதல் ஜோடி எண்களின் தொடர்பைக் கொண்டு இரண்டாம் ஜோடிக்குரிய எண்ணைக் கண்டறிதல்.',
    explanation_en: `
### 📌 Concept Overview
Number Analogy is written as $A : B :: C : ?$. You must find how $A$ becomes $B$, then apply that exact rule to $C$.

---

### 💡 Tips & Tricks for Number Analogy

1. **Common Ratio / Multiplier Rule**:
   - Check if $B = A \times k$ or $B = A \times k \pm m$.
2. **Cube & Square Shift Trick**:
   - Check if $B = A^2 - 1$ or $B = A^3 + 1$.
   - Example: $5 : 24 :: 7 : ?$ $\rightarrow$ $5^2 - 1 = 24$, so $7^2 - 1 = 48$.
3. **Digit Sum Trick**:
   - If numbers are large (e.g. $123 : 6 :: 234 : ?$), add the individual digits: $1+2+3 = 6$, so $2+3+4 = 9$.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
எண் ஒப்புமை $A : B :: C : ?$ என்ற வடிவில் இருக்கும். $A$-விலிருந்து $B$ எவ்வாறு பெறப்பட்டது என்ற விதியை $C$-க்கு பயன்படுத்த வேண்டும்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **வர்க்கம் / கனம் கழித்தல் ஷார்ட்கட்**:
   - $B = A^2 - 1$ அல்லது $B = A^3 + 1$ எனச் சோதியுங்கள்.
   - எ.கா: $5 : 24 :: 7 : ?$ $\rightarrow$ $5^2 - 1 = 24$, எனவே $7^2 - 1 = 48$.
2. **இலக்கங்களின் கூடுதல் ஷார்ட்கட்**:
   - பெரிய எண்கள் இருந்தால் இலக்கங்களைக் கூட்டுங்கள்: $123 : 6 \rightarrow 1+2+3 = 6$.
    `.trim(),
    example_en: '6 : 35 :: 9 : ? \nRule: 6² - 1 = 35, so 9² - 1 = 80.',
    example_ta: '6 : 35 :: 9 : ? \nவிதி: 6² - 1 = 35, எனவே 9² - 1 = 80.',
    solved_question: {
      question_en: '8 : 63 :: 10 : ?',
      question_ta: '8 : 63 :: 10 : ?',
      options_en: ['98', '99', '100', '101'],
      options_ta: ['98', '99', '100', '101'],
      correct_index: 1,
      explanation_en: '8² - 1 = 64 - 1 = 63. Similarly, 10² - 1 = 100 - 1 = 99.',
      explanation_ta: '8² - 1 = 64 - 1 = 63. அதேபோல, 10² - 1 = 100 - 1 = 99.'
    },
    order_index: 3
  },

  // 4. Number Classification
  {
    id: 'concept-mat-num-classification',
    topic_id: 'topic-mat-num-classification',
    title_en: 'Number Classification (Odd One Out)',
    title_ta: 'எண் வேறுபாடு அறிதல் (பொருந்தாத எண்)',
    summary_en: 'Find the one number that does not share the property of the other three.',
    summary_ta: 'மற்ற மூன்று எண்களின் பொதுப் பண்பைக் கொண்டிராத ஒரு எண்கைக் கண்டறிதல்.',
    explanation_en: `
### 📌 Concept Overview
Out of four given options, three numbers belong to a group based on a common mathematical rule, while one number does not.

---

### 💡 Tips & Tricks for Odd One Out

1. **Prime vs Composite Rule**:
   - Check if 3 options are Prime Numbers and 1 is Composite (or vice versa). Prime numbers up to 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.
2. **Divisibility Rule Trick**:
   - Test divisibility by 3 (sum of digits divisible by 3) or by 5/11.
3. **Square/Cube Test**:
   - Three options are perfect squares, one is not.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
நான்கு எண்களில் மூன்று எண்கள் ஒரு பொதுவான கணித விதியைப் பின்பற்றும். பொருந்தாத ஒரு எண்ணை நீக்க வேண்டும்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **பகா எண் ஷார்ட்கட்**:
   - 3 எண்கள் பகா எண்களாகவும் 1 எண் பகு எண்ணாகவும் உள்ளதா எனப் பாருங்கள்.
2. **வகுபடும் தன்மை ஷார்ட்கட்**:
   - 3 அல்லது 5-ஆல் வகுபடும் தன்மையைச் சோதியுங்கள்.
    `.trim(),
    example_en: 'Options: 17, 23, 29, 35. Solution: 17, 23, 29 are Prime numbers; 35 is a Composite number (divisible by 5 and 7). Odd one is 35.',
    example_ta: 'தேர்வுகள்: 17, 23, 29, 35. தீர்வு: 17, 23, 29 பகா எண்கள்; 35 ஒரு பகு எண் (5 மற்றும் 7-ஆல் வகுபடும்). பொருந்தாதது 35.',
    solved_question: {
      question_en: 'Find the odd number out: 49, 64, 81, 95',
      question_ta: 'பொருந்தாத எண்ணைக் கண்டறிக: 49, 64, 81, 95',
      options_en: ['49', '64', '81', '95'],
      options_ta: ['49', '64', '81', '95'],
      correct_index: 3,
      explanation_en: '49=7², 64=8², 81=9² are all perfect squares. 95 is not a perfect square.',
      explanation_ta: '49=7², 64=8², 81=9² ஆகியவை வர்க்க எண்கள். 95 வர்க்க எண் அல்ல.'
    },
    order_index: 4
  },

  // 5. Alphabet Series
  {
    id: 'concept-mat-alphabet-series',
    topic_id: 'topic-mat-alphabet-series',
    title_en: 'Alphabet & Letter Series',
    title_ta: 'ஆங்கில எழுத்துத் தொடர்',
    summary_en: 'Use letter position numbers (A=1 to Z=26) to find sequence logic.',
    summary_ta: 'எழுத்துக்களின் இடமதிப்பு எண்களைக் (A=1 முதல் Z=26) கொண்டு தொடரைக் கண்டறிதல்.',
    explanation_en: `
### 📌 Concept Overview
Letter series questions use English alphabet positions. Converting letters into numerical positions makes solving instant!

---

### 💡 Tips & Tricks (EJOTY Magic Formula)

1. **Memorize EJOTY**:
   - **E = 5, J = 10, O = 15, T = 20, Y = 25**
   - Example: Want position of 'S'? It is right before T(20), so S = 19!
2. **Forward Position Map**:
   - A=1, B=2, C=3, D=4, E=5 ... Z=26.
3. **Reverse Alphabet Rule**:
   - $\text{Reverse Position} = 27 - \text{Forward Position}$.
   - Example: Reverse position of A(1) = 27 - 1 = 26 (Z).
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
ஆங்கில எழுத்துக்களின் இடமதிப்பை எண்களாக மாற்றினால் வினாக்களை மிக വേகமாகத் தீர்க்கலாம்.

---

### 💡 எளிய குறுக்கு வழிகள் (EJOTY சூத்திரம்)

1. **EJOTY வார்த்தையை நினைவில் கொள்க**:
   - **E = 5, J = 10, O = 15, T = 20, Y = 25**
   - எ.கா: 'S'-ன் இடமதிப்பு வேண்டும் எனில், T(20)-க்கு முந்தைய எழுத்து, எனவே S = 19!
2. **எதிரெதிர் எழுத்துக்கள் கூடுதல் 27 விதிக் குறுக்கு வழி**:
   - ஒரு எழுத்தின் நேர் இடமதிப்பு + எதிர் இடமதிப்பு = 27. (எ.கா: A(1) + Z(26) = 27).
    `.trim(),
    example_en: 'A, C, F, J, O, ? \nPositions: 1, 3, 6, 10, 15 (+2, +3, +4, +5). Next is +6 → 15 + 6 = 21 (U).',
    example_ta: 'A, C, F, J, O, ? \nஇடமதிப்பு: 1, 3, 6, 10, 15 (+2, +3, +4, +5). அடுத்த இடமதிப்பு 15 + 6 = 21 (U).',
    solved_question: {
      question_en: 'Find the next letter in the series: B, E, H, K, N, ?',
      question_ta: 'பின்வரும் எழுத்துத் தொடரில் அடுத்து வரும் எழுத்து எது: B, E, H, K, N, ?',
      options_en: ['P', 'Q', 'R', 'S'],
      options_ta: ['P', 'Q', 'R', 'S'],
      correct_index: 1,
      explanation_en: 'Letter positions: B(2), E(5), H(8), K(11), N(14). Each letter moves +3 forward. Next position = 14 + 3 = 17, which is Q.',
      explanation_ta: 'எழுத்துக்களின் இடமதிப்பு: B(2), E(5), H(8), K(11), N(14). ஒவ்வொரு எழுத்தும் +3 நகர்கிறது. அடுத்த இடமதிப்பு 14 + 3 = 17 (Q).'
    },
    order_index: 5
  },

  // 6. Coding-Decoding
  {
    id: 'concept-mat-coding-decoding',
    topic_id: 'topic-mat-coding-decoding',
    title_en: 'Coding-Decoding',
    title_ta: 'குறியீட்டு முறைகள்',
    summary_en: 'Decode hidden rules where letters are shifted or replaced by numbers.',
    summary_ta: 'எழுத்துக்கள் எண்களாகவோ வேறு எழுத்துக்களாகவோ மாற்றப்படும் விதிகளைக் கண்டறிதல்.',
    explanation_en: `
### 📌 Concept Overview
A word is coded into another word or number pattern based on a rule. You must decipher the rule and apply it to the target word.

---

### 💡 Tips & Tricks for Coding-Decoding

1. **Letter Shift (+k or -k)**:
   - Compare first letter of original word to first letter of coded word. (e.g. APPLE $\rightarrow$ BQQMF is +1 shift).
2. **Reverse Order Coding**:
   - Write the original word backwards. (e.g. SMART $\rightarrow$ TRAMS).
3. **Opposite Letter Pairs Trick**:
   - Memorize opposite letter pairs:
     - **A-Z** (Azad), **B-Y** (Boy), **C-X** (Crux), **D-W** (Dew), **E-V** (Evening), **F-U** (Fun), **G-T** (GT road), **H-S** (High School), **I-R** (Indian Railway), **J-Q** (Jungle Queen), **K-P** (Kanpur), **L-O** (Love), **M-N** (Man).
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
ஒரு சொல் குறிப்பிட்ட விதியின்படி மற்றொரு சொல்லாகவோ எண்ணாகவோ மாற்றப்பட்டிருக்கும். விதியை அறிந்து கேட்கப்பட்ட சொல்லிற்குப் பிரதியிட வேண்டும்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **எதிரெதிர் எழுத்து ஜோடிகள் நினைவூட்டல் ஷார்ட்கட்**:
   - **A-Z**, **B-Y** (Boy), **C-X**, **D-W** (Dew), **E-V** (Evening), **F-U** (Fun), **G-T** (GT Road), **H-S** (High School), **I-R** (Indian Railway), **K-P** (Kanpur), **L-O** (Love), **M-N** (Man).
    `.trim(),
    example_en: 'If MANGO is coded as NZOHP (+1 shift), then APPLE is coded as BQQMF.',
    example_ta: 'MANGO என்பது NZOHP என எழுதப்பட்டால் (+1 நகர்வு), APPLE என்பது BQQMF எனக் குறியிடப்படும்.',
    solved_question: {
      question_en: 'If PEN is coded as 35 (P=16 + E=5 + N=14 = 35), how is BOOK coded?',
      question_ta: 'PEN என்பதன் குறியீடு 35 (P=16 + E=5 + N=14 = 35) எனில், BOOK என்பதன் குறியீடு என்ன?',
      options_en: ['41', '43', '47', '51'],
      options_ta: ['41', '43', '47', '51'],
      correct_index: 1,
      explanation_en: 'Sum of position numbers: B(2) + O(15) + O(15) + K(11) = 2 + 15 + 15 + 11 = 43.',
      explanation_ta: 'இடமதிப்பு எண்களின் கூடுதல்: B(2) + O(15) + O(15) + K(11) = 2 + 15 + 15 + 11 = 43.'
    },
    order_index: 6
  },

  // 7. Word Analogy
  {
    id: 'concept-mat-word-analogy',
    topic_id: 'topic-mat-word-analogy',
    title_en: 'Word Analogy',
    title_ta: 'சொல் ஒப்புமை அறிதல்',
    summary_en: 'Connect word pairs by synonyms, antonyms, capitals, or Science concepts.',
    summary_ta: 'சொற்களின் தொடர்பை (தலைநகரம், அறிவியல் கோட்பாடு, எதிர்ச்சொல்) கொண்டு பொருத்துதல்.',
    explanation_en: `
### 📌 Concept Overview
Relate words in pairs based on General Knowledge, Science, or Vocabulary.

---

### 💡 Tips & Tricks for Word Analogy

1. **Identify the Type of Relationship**:
   - **Capital & State/Country**: India : New Delhi :: Tamil Nadu : Chennai.
   - **Instrument & Quantity**: Thermometer : Temperature :: Barometer : Pressure.
   - **Worker & Tool**: Doctor : Stethoscope :: Carpenter : Saw.
   - **Animal & Young One**: Dog : Puppy :: Lion : Cub.
2. **Form a Sentence**:
   - Put Pair 1 into a sentence: *"A Doctor uses a Stethoscope"*. Then test Pair 2: *"A Carpenter uses a Saw"*.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
சொற்களுக்கு இடையே உள்ள தொடர்பை (பொது அறிவு, அறிவியல், தலைநகரம்) அறிந்து பொருத்துதல்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **தொடர்பு வகை ஷார்ட்கட்**:
   - **மாநிலம் & தலைநகரம்**: தமிழ்நாடு : சென்னை :: கேரளா : திருவனந்தபுரம்.
   - **கருவி & அளவீடு**: வெப்பநிலைமானி : வெப்பநிலை :: பாரமானி : அழுத்தம்.
   - **தொழில் & கருவி**: மருத்துவர் : ஸ்டெதாஸ்கோப் :: தச்சர் : வாள்.
    `.trim(),
    example_en: 'Tamil Nadu : Chennai :: Karnataka : ? \nAnswer: Bengaluru (Capital of Karnataka).',
    example_ta: 'தமிழ்நாடு : சென்னை :: கர்நாடகா : ? \nவிடை: பெங்களூரு (கர்நாடகாவின் தலைநகரம்).',
    solved_question: {
      question_en: 'Thermometer : Temperature :: Hygrometer : ?',
      question_ta: 'வெப்பநிலைமானி : வெப்பநிலை :: ஈரப்பதமானி : ?',
      options_en: ['Pressure', 'Humidity', 'Rainfall', 'Speed'],
      options_ta: ['அழுத்தம்', 'ஈரப்பதம்', 'மழைப்பொழிவு', 'வேகம்'],
      correct_index: 1,
      explanation_en: 'A Thermometer measures Temperature, and a Hygrometer measures Humidity.',
      explanation_ta: 'வெப்பநிலைமானி வெப்பநிலையை அளக்கப் பயன்படுகிறது, ஈரப்பதமானி ஈரப்பதத்தை அளக்கப் பயன்படுகிறது.'
    },
    order_index: 7
  },

  // 8. Word Classification
  {
    id: 'concept-mat-word-classification',
    topic_id: 'topic-mat-word-classification',
    title_en: 'Word Classification (Odd Word Out)',
    title_ta: 'சொல் வேறுபாடு அறிதல் (பொருந்தாத சொல்)',
    summary_en: 'Spot the single word that does not share the semantic category.',
    summary_ta: 'கொடுக்கப்பட்ட நான்கு சொற்களில் குழுவிற்குப் பொருந்தாத ஒரு சொல்லைக் கண்டறிதல்.',
    explanation_en: `
### 📌 Concept Overview
Identify the one word among four choices that has a different category or property.

---

### 💡 Tips & Tricks for Odd Word Out

1. **Check Categories**:
   - 3 are Metals, 1 is Non-metal (e.g. Gold, Silver, Copper, Oxygen $\rightarrow$ Oxygen is odd).
   - 3 are Rivers in TN, 1 is in North India (e.g. Cauvery, Vaigai, Thamirabarani, Ganga $\rightarrow$ Ganga is odd).
   - 3 are Planets, 1 is a Moon/Satellite.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
நான்கு சொற்களில் மூன்று சொற்கள் ஒரே பிரிவைச் சேர்ந்தவை. பொருந்தாத ஒரு சொல்லைக் கண்டறிய வேண்டும்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **பிரிவுச் சோதனைக் குறுக்கு வழி**:
   - 3 உலோகங்கள், 1 அலோகம் (தங்கம், வெள்ளி, செம்பு, ஆக்சிஜன் $\rightarrow$ ஆக்சிஜன் பொருந்தாதது).
   - 3 தமிழ்நாட்டு ஆறுகள், 1 வடஇந்திய ஆறு (காவிரி, வைகை, தாமிரபரணி, கங்கை $\rightarrow$ கங்கை பொருந்தாதது).
    `.trim(),
    example_en: 'Apple, Mango, Carrot, Banana $\rightarrow$ Carrot is a vegetable, others are fruits.',
    example_ta: 'ஆப்பிள், மாம்பழம், கேரட், வாழைப்பழம் $\rightarrow$ கேரட் ஒரு காய்கறி, மற்றவை பழங்கள்.',
    solved_question: {
      question_en: 'Find the odd word out: Eye, Ear, Nose, Kidney',
      question_ta: 'பொருந்தாத சொல்லைக் கண்டறிக: கண், காது, மூக்கு, சிறுநீரகம்',
      options_en: ['Eye', 'Ear', 'Nose', 'Kidney'],
      options_ta: ['கண்', 'காது', 'மூக்கு', 'சிறுநீரகம்'],
      correct_index: 3,
      explanation_en: 'Eye, Ear, and Nose are external sense organs. Kidney is an internal organ.',
      explanation_ta: 'கண், காது, மூக்கு ஆகியவை வெளி உணர் உறுப்புகள். சிறுநீரகம் ஒரு உள்ளுறுப்பு ஆகும்.'
    },
    order_index: 8
  },

  // 9. Figure Series
  {
    id: 'concept-mat-figure-series',
    topic_id: 'topic-mat-figure-series',
    title_en: 'Figure Series & Pattern Progression',
    title_ta: 'வரைபடத் தொடர்கள் & வரிசை பூர்த்தி',
    summary_en: 'Track clockwise/anti-clockwise rotation and line additions in diagrams.',
    summary_ta: 'வடிவங்களின் சுழற்சி திசை மற்றும் கோடுகளின் மாற்றத்தைக் கண்காணித்தல்.',
    explanation_en: `
### 📌 Concept Overview
A sequence of diagrams changes from box 1 to 4 following a rotation or line-addition pattern. Select the 5th diagram.

---

### 💡 Tips & Tricks for Figure Series

1. **Clockwise Angle Rotation**:
   - Check if the inner arrow turns $45^\circ$, $90^\circ$, or $180^\circ$ Clockwise ($\circlearrowright$) or Counter-Clockwise ($\circlearrowleft$).
2. **Line Addition Count**:
   - Triangle (3 lines) $\rightarrow$ Square (4 lines) $\rightarrow$ Pentagon (5 lines) $\rightarrow$ Hexagon (6 lines).
3. **Shading / Dot Shift**:
   - Track shaded corner moving step-by-step around the corners.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
வரைபடங்கள் குறிப்பிட்ட சுழற்சி அல்லது கோடுகளின் எண்ணிக்கையின்படி மாறும். அடுத்த சரியான வடிவத்தைத் தேர்ந்தெடுக்க வேண்டும்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **சுழற்சி கோண ஷார்ட்கட்**:
   - அம்புக்குறி கடிகாரத் திசையிலோ ($\circlearrowright$) அல்லது எதிர் திசையிலோ ($\circlearrowleft$) $45^\circ, 90^\circ$ சுழல்கிறதா எனப் பாருங்கள்.
2. **கோடுகளின் எண்ணிக்கை ஷார்ட்கட்**:
   - முக்கோணம் (3 கோடுகள்) $\rightarrow$ சதுரம் (4 கோடுகள்) $\rightarrow$ ஐங்கோணம் (5 கோடுகள்).
    `.trim(),
    example_en: 'Arrow pointing Up $\rightarrow$ Right $\rightarrow$ Down $\rightarrow$ Left $\rightarrow$ Next is Up.',
    example_ta: 'அம்புக்குறி மேலே $\rightarrow$ வலப்புறம் $\rightarrow$ கீழே $\rightarrow$ இடப்புறம் $\rightarrow$ அடுத்தது மேலே.',
    solved_question: {
      question_en: 'A shape rotates 90° clockwise in each step: Top-Right dot moves to Bottom-Right, then Bottom-Left. Where will it move next?',
      question_ta: 'ஒரு புள்ளி கடிகாரத் திசையில் 90° சுழல்கிறது: மேல்-வலம் $\rightarrow$ கீழ்-வலம் $\rightarrow$ கீழ்-இடம். அடுத்து எங்கு அமையும்?',
      options_en: ['Top-Left', 'Bottom-Right', 'Center', 'Bottom-Left'],
      options_ta: ['மேல்-இடம்', 'கீழ்-வலம்', 'மையம்', 'கீழ்-இடம்'],
      correct_index: 0,
      explanation_en: 'Continuing the 90° clockwise rotation from Bottom-Left brings the dot to Top-Left.',
      explanation_ta: 'கீழ்-இடத்திலிருந்து 90° கடிகாரச் சுழற்சியைத் தொடர்ந்தால் புள்ளி மேல்-இடத்திற்கு வரும்.'
    },
    order_index: 9
  },

  // 10. Figure Analogy
  {
    id: 'concept-mat-figure-analogy',
    topic_id: 'topic-mat-figure-analogy',
    title_en: 'Figure Analogy',
    title_ta: 'வரைபட ஒப்புமை அறிதல்',
    summary_en: 'Understand how Figure A transforms to B, then transform Figure C to D.',
    summary_ta: 'முதல் இரு வடிவங்களின் மாற்றத்தைப் புரிந்து கொண்டு நான்காவது வடிவத்தைத் தேர்ந்தெடுத்தல்.',
    explanation_en: `
### 📌 Concept Overview
Figure A is related to Figure B by a transformation (inversion, rotation, or splitting). Apply the exact transformation to Figure C to get Figure D.

---

### 💡 Tips & Tricks for Figure Analogy

1. **Inversion Rule**:
   - If Figure A turns upside down to form Figure B, turn Figure C upside down to get Figure D.
2. **Inner-Outer Swap**:
   - If a Circle inside a Square becomes a Square inside a Circle, apply the same inner-outer swap to C.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
வடிவம் A என்பது B ஆக மாறுவது போன்ற மாற்றத்தைப் புரிந்து கொண்டு, C-யிலிருந்து D-யைக் கண்டறிய வேண்டும்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **உள்-வெளி இடமாற்ற ஷார்ட்கட்**:
   - சதுரத்திற்குள் வட்டம் என்பது வட்டத்திற்குள் சதுரமாக மாறினால், அதே உள்-வெளி மாற்றத்தை பிரதியிடுங்கள்.
    `.trim(),
    example_en: 'Circle inside Triangle : Triangle inside Circle :: Square inside Circle : Circle inside Square.',
    example_ta: 'முக்கோணத்திற்குள் வட்டம் : வட்டத்திற்குள் முக்கோணம் :: வட்டத்திற்குள் சதுரம் : சதுரத்திற்குள் வட்டம்.',
    solved_question: {
      question_en: 'A solid black square becomes a larger outline square. What does a solid black circle become?',
      question_ta: 'ஒரு சிறிய கருப்புச் சதுரம் பெரிய கோட்டுச் சதுரமாக மாறுகிறது. எனில் சிறிய கருப்பு வட்டம் எவ்வாறு மாறும்?',
      options_en: ['Larger outline circle', 'Small black triangle', 'Solid black square', 'Dotted line circle'],
      options_ta: ['பெரிய கோட்டு வட்டம்', 'சிறிய கருப்பு முக்கோணம்', 'கருப்புச் சதுரம்', 'புள்ளி கோட்டு வட்டம்'],
      correct_index: 0,
      explanation_en: 'The transformation enlarges the shape and removes the black fill. A solid circle becomes a larger outline circle.',
      explanation_ta: 'வடிவம் பெரிதாகி கருப்பு வண்ணம் நீக்கப்படுகிறது. எனவே சிறிய கருப்பு வட்டம் பெரிய கோட்டு வட்டமாகும்.'
    },
    order_index: 10
  },

  // 11. Figure Classification
  {
    id: 'concept-mat-figure-classification',
    topic_id: 'topic-mat-figure-classification',
    title_en: 'Figure Classification (Odd Figure Out)',
    title_ta: 'வரைபட வேறுபாடு அறிதல் (பொருந்தாத வடிவம்)',
    summary_en: 'Spot the shape that breaks symmetry, line count, or rotation rules.',
    summary_ta: 'சமச்சீர்மை அல்லது கோடுகளின் எண்ணிக்கையில் வேறுபடும் வரைபடத்தைக் கண்டறிதல்.',
    explanation_en: `
### 📌 Concept Overview
Out of four shapes, three share a geometric property (like equal division or parallel lines) while one breaks it.

---

### 💡 Tips & Tricks for Odd Figure Out

1. **Symmetry Test**:
   - Check if 3 figures are symmetrical (can be divided into two mirror halves) and 1 is asymmetrical.
2. **Closed vs Open Shape**:
   - Check if 3 shapes are completely closed and 1 shape has an open gap.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
நான்கு வரைபடங்களில் மூன்று வரைபடங்கள் ஒரே சமச்சீர் பண்பைக் கொண்டிருக்கும். பொருந்தாத ஒன்றை நீக்க வேண்டும்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **மூடிய & திறந்த வடிவ ஷார்ட்கட்**:
   - 3 வடிவங்கள் முழுமையாக மூடியும், 1 வடிவம் திறந்தும் உள்ளதா எனச் சோதியுங்கள்.
    `.trim(),
    example_en: 'Triangle, Square, Circle, Open Arc $\rightarrow$ Open Arc is not a closed polygon.',
    example_ta: 'முக்கோணம், சதுரம், வட்டம், திறந்த வில் $\rightarrow$ திறந்த வில் மூடிய வடிவம் அல்ல.',
    solved_question: {
      question_en: 'Find the odd figure: (A) Equilateral Triangle (B) Square (C) Regular Pentagon (D) Irregular Trapezoid with curved line',
      question_ta: 'பொருந்தாத வரைபடத்தைக் கண்டறிக: (A) சமபக்க முக்கோணம் (B) சதுரம் (C) ஒழுங்கு ஐங்கோணம் (D) வளைகோடு கொண்ட ஒழுங்கற்ற சரிவகம்',
      options_en: ['A', 'B', 'C', 'D'],
      options_ta: ['A', 'B', 'C', 'D'],
      correct_index: 3,
      explanation_en: 'Options A, B, C are regular polygons made of straight lines. D contains a curved line.',
      explanation_ta: 'A, B, C ஆகியவை நேர்கோடுகளால் ஆன ஒழுங்கு வடிவங்கள். D வளைகோட்டைக் கொண்டுள்ளது.'
    },
    order_index: 11
  },

  // 12. Counting Figures
  {
    id: 'concept-mat-counting-figures',
    topic_id: 'topic-mat-counting-figures',
    title_en: 'Counting Geometrical Figures',
    title_ta: 'வடிவியல் உருவங்களை எண்ணுதல்',
    summary_en: 'Use short formulas to count triangles and squares in complex diagrams.',
    summary_ta: 'முக்கோணங்கள் மற்றும் சதுரங்களின் எண்ணிக்கையைக் குறுக்கு வழி சூத்திரங்கள் மூலம் எண்ணுதல்.',
    explanation_en: `
### 📌 Concept Overview
Counting triangles or squares manually leads to mistakes. Memorizing simple formulas makes it 100% accurate!

---

### 💡 Magic Formulas for Counting Triangles & Squares

1. **Triangle Divided Vertically Formula**:
   - If a triangle is divided into $n$ parts by lines from the top vertex:  
     $$\text{Total Triangles} = 1 + 2 + 3 + \dots + n = \frac{n(n+1)}{2}$$
   - Example: Divided into 3 parts $\rightarrow 1 + 2 + 3 = 6$ triangles!
2. **Square Divided by Diagonals Formula**:
   - If a square is divided into small triangles by diagonals, count small triangles $m$ and multiply by 2:  
     $$\text{Total Triangles} = m \times 2$$
   - Example: 4 small triangles inside $\rightarrow 4 \times 2 = 8$ triangles!
3. **Square Grid ($n \times n$) Formula**:
   - Total squares = $1^2 + 2^2 + 3^2 + \dots + n^2$.
   - Example ($2 \times 2$ grid): $1^2 + 2^2 = 1 + 4 = 5$ squares.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
முக்கோணங்கள் அல்லது சதுரங்களை ஒன்றன்ப பின் ஒன்றாக எண்ணினால் தவறு வரலாம். சூத்திரங்களைப் பயன்படுத்தினால் 100% துல்லியமாக விடை கிடைக்கும்!

---

### 💡 முக்கோணம் & சதுரம் எண்ணும் மேஜிக் சூத்திரங்கள்

1. **செங்குத்தாகப் பிரிக்கப்பட்ட முக்கோணச் சூத்திரம்**:
   - ஒரு முக்கோணம் $n$ பகுதிகளாகப் பிரிக்கப்பட்டால்:  
     $$\text{மொத்த முக்கோணங்கள்} = 1 + 2 + 3 + \dots + n$$
   - எ.கா: 3 பகுதிகளாகப் பிரிக்கப்பட்டால் $\rightarrow 1 + 2 + 3 = 6$ முக்கோணங்கள்!
2. **மூலைவிட்டங்களால் பிரிக்கப்பட்ட சதுரச் சூத்திரம்**:
   - சதுரம் மூலைவிட்டங்களால் $m$ சிறிய முக்கோணங்களாகப் பிரிக்கப்பட்டால்:  
     $$\text{மொத்த முக்கோணங்கள்} = m \times 2$$
   - எ.கா: 4 சிறிய முக்கோணங்கள் இருந்தால் $\rightarrow 4 \times 2 = 8$ முக்கோணங்கள்!
3. **சதுரக் கட்ட ($n \times n$) சூத்திரம்**:
   - மொத்த சதுரங்கள் = $1^2 + 2^2 + 3^2 + \dots + n^2$. (2x2 கட்டத்திற்கு: $1^2 + 2^2 = 5$).
    `.trim(),
    example_en: 'A square with both diagonals drawn creates 4 small triangles. Total triangles = 4 × 2 = 8 triangles.',
    example_ta: 'ஒரு சதுரத்தில் இரண்டு மூலைவிட்டங்களும் வரையப்பட்டால் 4 சிறிய முக்கோணங்கள் தோன்றும். மொத்த முக்கோணங்கள் = 4 × 2 = 8.',
    solved_question: {
      question_en: 'How many total triangles are in a single large triangle divided vertically into 4 small base sections?',
      question_ta: 'அடிப்புறத்தில் 4 சிறிய பகுதிகளாகச் செங்குத்தாகப் பிரிக்கப்பட்ட ஒரு பெரிய முக்கோணத்தில் உள்ள மொத்த முக்கோணங்கள் எத்தனை?',
      options_en: ['8', '10', '12', '14'],
      options_ta: ['8', '10', '12', '14'],
      correct_index: 1,
      explanation_en: 'Using the vertical triangle formula: 1 + 2 + 3 + 4 = 10 triangles.',
      explanation_ta: 'செங்குத்து முக்கோணச் சூத்திரத்தைப் பயன்படுத்த: 1 + 2 + 3 + 4 = 10 முக்கோணங்கள்.'
    },
    order_index: 12
  },

  // 13. Mathematical Operations
  {
    id: 'concept-mat-math-operations',
    topic_id: 'topic-mat-math-operations',
    title_en: 'Mathematical Operations & Symbol Logic',
    title_ta: 'கணிதக் குறியீடுகள் மாற்றம் & BODMAS',
    summary_en: 'Substitute new mathematical signs and solve in BODMAS order.',
    summary_ta: 'கொடுக்கப்பட்டுள்ள குறிமாற்றப் பிரதியீடுகளைச் செய்து BODMAS விதிப்படி தீர்வுகாணுதல்.',
    explanation_en: `
### 📌 Concept Overview
Replace original operational signs (+, -, ×, ÷) with given substitute signs and calculate using BODMAS precedence.

---

### 💡 Tips & Tricks (BODMAS Golden Priority)

1. **BODMAS Order**:
   - **B**: Brackets ()
   - **O**: Orders/Exponents
   - **D**: Division ($\div$) $\leftarrow$ DO THIS FIRST!
   - **M**: Multiplication ($\times$) $\leftarrow$ DO THIS SECOND!
   - **A**: Addition ($+$)
   - **S**: Subtraction ($-$)
2. **Rewrite Equation First**:
   - Always rewrite the full equation with the NEW signs on paper before calculating! Never try to substitute mentally.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
கணிதக் குறியீடுகளை மாற்றி BODMAS முன்னுரிமை விதிப்படி சரியாக விடையைக் கணக்கிட வேண்டும்.

---

### 💡 BODMAS பொன் விதி ஷார்ட்கட்

1. **BODMAS முன்னுரிமை**:
   - **D**: வகுத்தல் ($\div$) $\leftarrow$ முதலில் செய்க!
   - **M**: பெருக்கல் ($\times$) $\leftarrow$ இரண்டாவதாக செய்க!
   - **A**: கூட்டல் ($+$)
   - **S**: கழித்தல் ($-$)
2. **தாளில் புதிய குறிகளை எழுதுங்கள்**:
   - கணக்கிடும் முன் புதிய குறியீடுகளுடன் சமன்பாட்டைத் தாளில் முழுமையாக எழுதுங்கள்!
    `.trim(),
    example_en: 'If + means × and × means -, 5 + 3 × 2 becomes 5 × 3 - 2 = 15 - 2 = 13.',
    example_ta: '+ என்பது × எனவும் × என்பது - எனவும் கொண்டால், 5 + 3 × 2 என்பது 5 × 3 - 2 = 15 - 2 = 13.',
    solved_question: {
      question_en: 'If "+" means "÷", "-" means "×", "÷" means "+", and "×" means "-", find 20 - 4 + 2 ÷ 6 × 5',
      question_ta: '"+" என்பது "÷" எனவும், "-" என்பது "×" எனவும், "÷" என்பது "+" எனவும், "×" என்பது "-" எனவும் கொண்டால், 20 - 4 + 2 ÷ 6 × 5 இன் மதிப்பு என்ன?',
      options_en: ['41', '45', '35', '51'],
      options_ta: ['41', '45', '35', '51'],
      correct_index: 0,
      explanation_en: 'New expression: 20 × 4 ÷ 2 + 6 - 5. Division first: 4÷2=2. Multiplication: 20×2=40. Addition: 40+6=46. Subtraction: 46-5=41.',
      explanation_ta: 'புதிய சமன்பாடு: 20 × 4 ÷ 2 + 6 - 5. வகுத்தல்: 4÷2=2. பெருக்கல்: 20×2=40. கூட்டல்: 40+6=46. கழித்தல்: 46-5=41.'
    },
    order_index: 13
  },

  // 14. Direction Test
  {
    id: 'concept-mat-direction-test',
    topic_id: 'topic-mat-direction-test',
    title_en: 'Direction Sense Test',
    title_ta: 'திசைகள் சார்ந்த கணக்குகள்',
    summary_en: 'Track North-South-East-West movements and calculate distance using Pythagoras theorem.',
    summary_ta: 'திசைகள் மற்றும் செங்கோணத் திருப்பங்களை வரைந்து பிதாகரஸ் தேற்றத்தின் மூலம் தூரம் அறிதல்.',
    explanation_en: `
### 📌 Concept Overview
Draw a direction compass and trace a person's path turning Left/Right from their current facing direction.

---

### 💡 Tips & Tricks for Direction Sense

1. **Draw a (+) Compass First**:
   - North (↑), South (↓), East (→), West (←).
2. **Left/Right Turn Shortcut**:
   - Facing North: Right = East, Left = West.
   - Facing East: Right = South, Left = North.
   - Facing South: Right = West, Left = East.
   - Facing West: Right = North, Left = South.
3. **Pythagoras Theorem Distance Shortcut**:
   - If a person walks $a$ km East and $b$ km North, shortest distance back to start is $\sqrt{a^2 + b^2}$.
   - Common Pythagorean Triplets: $(3, 4, 5)$, $(5, 12, 13)$, $(6, 8, 10)$.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
திசைகாட்டி வரைபடத்தை வரைந்து நபர் திரும்பும் திசைகளையும் (இடப்பக்கம்/வலப்பக்கம்) நடந்த தூரத்தையும் கணக்கிடுதல்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **திசைகாட்டி வரைபட ஷார்ட்கட்**:
   - தாளில் (+) வரைந்து வடக்கு (↑), தெற்கு (↓), கிழக்கு (→), மேற்கு (←) எனக் குறிக்கவும்.
2. **பிதாகரஸ் தேற்றத் தூர ஷார்ட்கட்**:
   - தொடக்கப் புள்ளிக்குரிய மீச்சிறு நேர்கோட்டு தூரம் = $\sqrt{a^2 + b^2}$.
   - நினைவில் கொள்ள வேண்டிய எண்கள்: $(3, 4, 5)$, $(5, 12, 13)$, $(6, 8, 10)$.
    `.trim(),
    example_en: 'Ravi walks 3 km East, turns North and walks 4 km. Distance from start = √(3² + 4²) = √(9 + 16) = √25 = 5 km.',
    example_ta: 'ரவி 3 கி.மீ கிழக்கு சென்று, வடக்கு திரும்பி 4 கி.மீ நடக்கிறான். தொடக்கப் புள்ளியிலிருந்து தூரம் = √(3² + 4²) = √25 = 5 கி.மீ.',
    solved_question: {
      question_en: 'A man walks 6 km North, turns Right and walks 8 km. How far is he from his starting point?',
      question_ta: 'ஒரு நபர் வடக்கு நோக்கி 6 கி.மீ நடந்து, வலப்புறம் திரும்பி 8 கி.மீ நடக்கிறார். தொடக்கப் புள்ளியிலிருந்து அவர் எவ்வளவு தூரத்தில் உள்ளார்?',
      options_en: ['10 km', '12 km', '14 km', '16 km'],
      options_ta: ['10 கி.மீ', '12 கி.மீ', '14 கி.மீ', '16 கி.மீ'],
      correct_index: 0,
      explanation_en: 'Distance = √(6² + 8²) = √(36 + 64) = √100 = 10 km.',
      explanation_ta: 'தூரம் = √(6² + 8²) = √(36 + 64) = √100 = 10 கி.மீ.'
    },
    order_index: 14
  },

  // 15. Blood Relations
  {
    id: 'concept-mat-blood-relations',
    topic_id: 'topic-mat-blood-relations',
    title_en: 'Blood Relations',
    title_ta: 'இரத்த உறவுகள் முறை அறிதல்',
    summary_en: 'Use family tree symbols (+ for male, - for female) to deduce relationships.',
    summary_ta: 'குடும்ப மரக் குறியீடுகளைப் பயன்படுத்தி உறவு முறைகளைத் தர்க்கரீதியாக பகுப்பாய்வு செய்தல்.',
    explanation_en: `
### 📌 Concept Overview
Deconstruct statements describing relations (e.g., *"Pointing to a man, a woman said..."*).

---

### 💡 Tips & Tricks (Family Tree Symbols)

1. **Use Symbols**:
   - Male = $[+]$ or Square box.
   - Female = $[-]$ or Circle.
   - Husband-Wife = Double line ($=$).
   - Siblings = Single line ($-$).
   - Generation Gap = Vertical line ($\mid$).
2. **Break Down Statements from 'My'**:
   - Start from the word *"My"*: *"My father's only son"* = Yourself! *"My mother's brother"* = Maternal Uncle.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
குடும்ப உறவு முறைக் கூற்றுகளைத் தர்க்கரீதியாகப் பகுத்து விடையைக் கண்டறிதல்.

---

### 💡 எளிய குறுக்கு வழிகள் (குடும்ப மரக் குறியீடுகள்)

1. **குடும்ப மரக் குறியீடுகள்**:
   - ஆண் = $[+]$ அல்லது சதுரம்.
   - பெண் = $[-]$ அல்லது வட்டம்.
   - தம்பதியர் = இரட்டைக் கோடு ($=$).
   - தலைமுறை இடைவெளி = செங்குத்துக் கோடு ($\mid$).
2. **'என்' என்ற சொல்லிலிருந்து தொடங்குங்கள்**:
   - "என் அப்பாவின் ஒரே மகன்" = நீங்கள்! "என் அம்மாவின் சகோதரன்" = தாய்மாமன்.
    `.trim(),
    example_en: '"My father\'s brother\'s daughter" = My Cousin.',
    example_ta: '"என் தந்தையின் சகோதரனின் மகள்" = என் சித்தப்பா/பெரியப்பா மகள் (உடன்பிறவாச் சகோதரி).',
    solved_question: {
      question_en: 'Pointing to a photograph, Arun said, "She is the daughter of my mother\'s only son." How is the girl related to Arun?',
      question_ta: 'ஒரு புகைப்படத்தைச் சுட்டிக்காட்டி அருண், "இவள் என் அம்மாவின் ஒரே மகனின் மகள்" என்றார். புகைப்படத்திலுள்ள சிறுமி அருணிற்கு என்ன உறவு?',
      options_en: ['Daughter', 'Sister', 'Niece', 'Mother'],
      options_ta: ['மகள்', 'சகோதரி', 'சகோதரி மகள்', 'தாய்'],
      correct_index: 0,
      explanation_en: '"Arun\'s mother\'s only son" is Arun himself. So she is Arun\'s Daughter.',
      explanation_ta: '"அருணின் அம்மாவின் ஒரே மகன்" என்பது அருண் தானே. எனவே அச்சிறுமி அருணின் மகள் ஆவார்.'
    },
    order_index: 15
  },

  // 16. Ranking Order
  {
    id: 'concept-mat-ranking-order',
    topic_id: 'topic-mat-ranking-order',
    title_en: 'Ranking & Position Order',
    title_ta: 'தரவரிசை மற்றும் அமைவிடம்',
    summary_en: 'Calculate total count using Total = Rank from Left + Rank from Right - 1.',
    summary_ta: 'மொத்த நபர்களின் எண்ணிக்கையை (இடப்பக்க தரம் + வலப்பக்க தரம் - 1) என்ற சூத்திரத்தால் கணக்கிடுதல்.',
    explanation_en: `
### 📌 Concept Overview
Questions ask for total people in a line or a person's rank from top/bottom.

---

### 💡 Golden Ranking Formulas

1. **Total People Formula**:
   $$\text{Total} = \text{Rank from Left} + \text{Rank from Right} - 1$$
   *(Subtract 1 because the person was counted twice!)*
2. **Rank from Right Formula**:
   $$\text{Rank from Right} = \text{Total} - \text{Rank from Left} + 1$$
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
ஒரு வரிசையில் உள்ள மொத்த நபர்கள் அல்லது ஒருவரின் இடப்பக்க/வலப்பக்க தரத்தைக் கணக்கிடுதல்.

---

### 💡 பொன் சூத்திரங்கள் (Ranking Formulas)

1. **மொத்த நபர்கள் சூத்திரம்**:
   $$\text{மொத்த நபர்கள்} = \text{இடப்பக்கத் தரம்} + \text{வலப்பக்கத் தரம்} - 1$$
   *(1-ஐக் கழிப்பதன் காரணம் அந்த நபர் இரண்டு முறை எண்ணப்பட்டிருப்பார்!)*
    `.trim(),
    example_en: 'Ramu is 7th from top and 20th from bottom. Total students = 7 + 20 - 1 = 26 students.',
    example_ta: 'ராமு மேலிருந்து 7-வது இடத்திலும் கீழிருந்து 20-வது இடத்திலும் உள்ளான். மொத்த மாணவர்கள் = 7 + 20 - 1 = 26 மாணவர்கள்.',
    solved_question: {
      question_en: 'In a class of 40 students, Priya is ranked 12th from the top. What is her rank from the bottom?',
      question_ta: '40 மாணவர்கள் உள்ள ஒரு வகுப்பில் பிரியா மேலிருந்து 12-வது தரத்தில் உள்ளார். கீழிருந்து அவளது தரம் என்ன?',
      options_en: ['28th', '29th', '30th', '31st'],
      options_ta: ['28-வது', '29-வது', '30-வது', '31-வது'],
      correct_index: 1,
      explanation_en: 'Rank from bottom = Total - Rank from top + 1 = 40 - 12 + 1 = 29th rank.',
      explanation_ta: 'கீழிருந்து தரம் = மொத்தம் - மேலிருந்து தரம் + 1 = 40 - 12 + 1 = 29-வது தரம்.'
    },
    order_index: 16
  },

  // 17. Venn Diagrams
  {
    id: 'concept-mat-venn-diagrams',
    topic_id: 'topic-mat-venn-diagrams',
    title_en: 'Venn Diagrams & Set Relations',
    title_ta: 'வென் படங்கள் & தர்க்கத் தொகுப்புகள்',
    summary_en: 'Represent category inclusions (e.g. All Dogs are Animals) using intersecting circles.',
    summary_ta: 'தொகுப்புகளுக்கு இடையே உள்ள தர்க்கத் தொடர்பை வட்டங்கள் மூலம் குறித்தல்.',
    explanation_en: `
### 📌 Concept Overview
Venn Diagrams represent relationships between 3 items using nested or intersecting circles.

---

### 💡 3 Main Venn Patterns

1. **Complete Inclusion (All A are B, All B are C)**:
   - Example: Seconds, Minutes, Hours $\rightarrow$ 3 Concentric Circles.
2. **Partial Intersection (Some A are B)**:
   - Example: Doctors, Teachers, Humans $\rightarrow$ 2 intersecting circles inside a big circle of Humans.
3. **Disjoint Sets (No connection)**:
   - Example: Dogs, Cats, Birds $\rightarrow$ 3 separate non-overlapping circles.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
மூன்று பொருட்களுக்கு இடையே உள்ள தொடர்பை வட்டங்கள் மூலம் குறித்தல்.

---

### 💡 3 முக்கிய வென் வரைபட மாதிரிகள்

1. **முழுமையான உள்ளடக்கம் (ஒன்றனுள் ஒன்று)**:
   - எ.கா: வினாடிகள், நிமிடங்கள், மணிநேரம் $\rightarrow$ 3 ஒன்றோடொன்று அமைந்த வட்டங்கள்.
2. **பகுதிப் பொருத்தம் (சில)**:
   - எ.கா: மருத்துவர்கள், ஆசிரியர்கள், மனிதர்கள்.
3. **தனித்தனித் தொகுப்புகள் (தொடர்பில்லாதவை)**:
   - எ.கா: நாய், பூனை, பறவை $\rightarrow$ 3 தனித்தனி வட்டங்கள்.
    `.trim(),
    example_en: 'Animals, Mammals, Cows $\rightarrow$ All Cows are Mammals, All Mammals are Animals (3 nested circles).',
    example_ta: 'விலங்குகள், பாலூட்டிகள், பசுக்கள் $\rightarrow$ அனைத்து பசுக்களும் பாலூட்டிகள், அனைத்து பாலூட்டிகளும் விலங்குகள்.',
    solved_question: {
      question_en: 'Which diagram represents: Bus, Car, Vehicle?',
      question_ta: 'பேருந்து, மகிழ்வுந்து (கார்), வாகனம் என்பவற்றைக் குறிக்கும் சரியான வென் படம் எது?',
      options_en: ['Two separate circles inside one big circle', 'Three separate circles', 'Three overlapping circles', 'Three concentric circles'],
      options_ta: ['ஒரு பெரிய வட்டத்திற்குள் இரு தனித்தனி வட்டங்கள்', 'மூன்று தனித்தனி வட்டங்கள்', 'மூன்று ஒன்றைய ஒன்று வெட்டும் வட்டங்கள்', 'ஒன்றனுள் ஒன்று அமைந்த வட்டங்கள்'],
      correct_index: 0,
      explanation_en: 'Both Bus and Car are types of Vehicles (Big Circle), but Bus and Car are separate non-overlapping items inside.',
      explanation_ta: 'பேருந்தும் மகிழ்வுந்தும் வாகனங்கள் (பெரிய வட்டம்) ஆகும், ஆனால் அவையிரண்டும் தனித்தனி வாகனங்கள்.'
    },
    order_index: 17
  },

  // 18. Mirror Images
  {
    id: 'concept-mat-mirror-water-images',
    topic_id: 'topic-mat-mirror-water-images',
    title_en: 'Mirror Images & Water Images',
    title_ta: 'கண்ணாடி மற்றும் நீர் பிம்பங்கள்',
    summary_en: 'Mirror Image swaps Left & Right; Water Image swaps Top & Bottom.',
    summary_ta: 'கண்ணாடிப் பிம்பம் இடவல மாற்றம் அடையும்; நீர் பிம்பம் மேல்-கீழ் மாற்றம் அடையும்.',
    explanation_en: `
### 📌 Concept Overview
Lateral Inversion (Mirror) vs Vertical Inversion (Water).

---

### 💡 Golden Rules for Images

1. **Mirror Image Rule (Vertical Mirror)**:
   - **Left $\leftrightarrow$ Right SWAPPED**.
   - **Top & Bottom STAY SAME**.
2. **Water Image Rule (Horizontal Mirror)**:
   - **Top $\leftrightarrow$ Bottom SWAPPED**.
   - **Left & Right STAY SAME**.
3. **Symmetrical Letters Shortcut**:
   - Mirror image of A, H, I, M, O, T, U, V, W, X, Y remains UNCHANGED!
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
கண்ணாடிப் பிம்பம் மற்றும் நீர் பிம்பத்தின் மாற்றங்களைக் கண்டறிதல்.

---

### 💡 பிம்பங்களுக்கான பொன் விதிகள்

1. **கண்ணாடிப் பிம்ப விதி**:
   - **இடப்பக்கம் $\leftrightarrow$ வலப்பக்கம் மாறும்**.
   - **மேல் & கீழ் மாறாது**.
2. **நீர் பிம்ப விதி**:
   - **மேற்பக்கம் $\leftrightarrow$ கீழ்ப்பக்கம் மாறும்**.
   - **இடப்பக்கம் & வலப்பக்கம் மாறாது**.
3. **மாறாத கண்ணாடி எழுத்துக்கள் ஷார்ட்கட்**:
   - A, H, I, M, O, T, U, V, W, X, Y ஆகிய எழுத்துக்களின் கண்ணாடிப் பிம்பம் மாறாது!
    `.trim(),
    example_en: 'Mirror image of "PAT" starts with T mirrored, then A, then P mirrored.',
    example_ta: '"PAT" என்பதன் கண்ணாடிப் பிம்பம் T பிம்பத்தில் தொடங்கி, A, பிறகு P பிம்பமாக அமையும்.',
    solved_question: {
      question_en: 'In a mirror image, which of the following capital English letters remains 100% identical to its original shape?',
      question_ta: 'கண்ணாடிப் பிம்பத்தில் பின்வரும் ஆங்கில பெரிய எழுத்துக்களில் எது தனது அசல் வடிவத்திலிருந்து 100% மாறாமல் இருக்கும்?',
      options_en: ['B', 'E', 'H', 'P'],
      options_ta: ['B', 'E', 'H', 'P'],
      correct_index: 2,
      explanation_en: 'Letter H is vertically symmetrical, so its mirror image is identical to H.',
      explanation_ta: 'H என்ற எழுத்து செங்குத்து சமச்சீர்மை கொண்டது, எனவே அதன் கண்ணாடிப் பிம்பம் மாறாது.'
    },
    order_index: 18
  },

  // 19. Embedded Figures
  {
    id: 'concept-mat-embedded-figures',
    topic_id: 'topic-mat-embedded-figures',
    title_en: 'Embedded Figures (Hidden Shapes)',
    title_ta: 'உள்ளமைந்த வரைபடங்கள் (மறைந்த உருவம்)',
    summary_en: 'Find which option contains the small question figure hidden inside.',
    summary_ta: 'கொடுக்கப்பட்ட சிறிய வடிவம் எந்தப் பெரிய வரைபடத்திற்குள் மறைந்துள்ளது என்பதை அறிதல்.',
    explanation_en: `
### 📌 Concept Overview
A small sub-figure is hidden within one of the four complex option figures. Find which option contains it without rotating if possible.

---

### 💡 Tips & Tricks for Hidden Shapes

1. **Focus on Unique Angles/Intersection**:
   - Look for a unique acute angle or cross (+) in the question shape. Scan each option to locate that exact angle first!
2. **Do Not Change Scale**:
   - The size and orientation of the hidden shape in the option usually match the question figure.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
ஒரு சிறிய வடிவம் நான்கு விருப்ப வரைபடங்களில் ஒன்றிற்குள் மறைந்துள்ளது. அதைக் கண்டறிய வேண்டும்.

---

### 💡 எளிய குறுக்கு வழிகள் (Tips & Tricks)

1. **சிறப்பு கோணம் / சந்திப்பு ஷார்ட்கட்**:
   - வினா வடிவத்தில் உள்ள குறுக்குக் கோடு அல்லது குறுங்கோணத்தைக் கவனித்து, அது எந்த விருப்பத்தில் உள்ளது எனத் தேடுங்கள்.
    `.trim(),
    example_en: 'A simple "Z" shape hidden inside a square with diagonal grid lines.',
    example_ta: 'ஒரு சதுரக் கட்டத்திற்குள் மறைந்துள்ள "Z" வடிவம்.',
    solved_question: {
      question_en: 'A simple letter "T" shape is embedded inside a diagram. Which characteristic helps locate it fast?',
      question_ta: 'ஒரு வரைபடத்திற்குள் "T" வடிவம் மறைந்துள்ளது. அதை வேகமாகக் கண்டறிய உதவும் அம்சம் எது?',
      options_en: ['Finding a perpendicular 90° line intersection', 'Counting total lines', 'Looking for curved lines', 'Measuring outer boundary'],
      options_ta: ['90° செங்குத்துக்கோடு சந்திப்பைக் கண்டறிவது', 'மொத்தக் கோடுகளை எண்ணுவது', 'வளைகோடுகளைத் தேடுவது', 'வெளிப்புற எல்லையை அளப்பது'],
      correct_index: 0,
      explanation_en: 'A "T" shape consists of a horizontal line meeting a vertical line at 90°. Locating perpendicular intersections identifies the embedded "T".',
      explanation_ta: 'T வடிவம் என்பது 90° செங்குத்துக் கோட்டுச் சந்திப்பாகும். எனவே செங்குத்துச் சந்திப்பைத் தேடினால் T வடிவத்தைக் கண்டறியலாம்.'
    },
    order_index: 19
  },

  // 20. Paper Folding
  {
    id: 'concept-mat-paper-folding',
    topic_id: 'topic-mat-paper-folding',
    title_en: 'Paper Folding & Paper Cutting',
    title_ta: 'தாள் மடித்தல் மற்றும் வெட்டுதல்',
    summary_en: 'Unfolding a folded paper reflects punched holes along the fold symmetry line.',
    summary_ta: 'மடிக்கப்பட்டு துளையிடப்பட்ட தாளைத் திறக்கும் போது சமச்சீர்க் கோட்டின் வழியே பிம்பங்கள் தோன்றும்.',
    explanation_en: `
### 📌 Concept Overview
A sheet of paper is folded along dotted lines and a hole is punched. Determine how the paper looks when unfolded.

---

### 💡 Golden Punch Formula

1. **Hole Count Formula**:
   - Folding a paper $N$ times doubles the number of layers.
   - Punching 1 hole creates $2^N$ holes when fully unfolded!
   - Example: Folded twice ($N=2$) $\rightarrow 1$ punch creates $2^2 = 4$ holes!
2. **Reflection Rule**:
   - Every unfold step creates a **Mirror Image** of the punch along the dotted fold line!
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
தாள் மடிக்கப்பட்டு துளையிடப்பட்ட பின் திறந்தால் தோன்றும் வடிவத்தைக் கண்டறிதல்.

---

### 💡 துளை எண்ணும் மேஜிக் சூத்திரம்

1. **துளைகள் எண்ணிக்கை சூத்திரம்**:
   - தாளை $N$ முறைகள் மடித்தால்:  
     $$\text{மொத்த துளைகள்} = 2^N$$
   - எ.கா: 2 முறை மடித்து ($N=2$) 1 துளை போட்டால் $\rightarrow 2^2 = 4$ துளைகள் தோன்றும்!
2. **பிரதிபலிப்பு விதி**:
   - மடிப்பைத் திறக்கும் ஒவ்வொரு படியும் மடிப்புக் கோட்டின் வழியே **கண்ணாடிப் பிம்பத்தை** உருவாக்கும்!
    `.trim(),
    example_en: 'A square paper folded twice into 4 layers and punched in the corner produces 4 symmetric corner holes.',
    example_ta: '2 முறை மடிக்கப்பட்ட தாளின் மூளையில் 1 துளையிட்டால், தாளைத் திறக்கும் போது 4 மூலைகளிலும் 4 துளைகள் தோன்றும்.',
    solved_question: {
      question_en: 'A circular paper is folded in half (1st fold) and then in half again (2nd fold). A single hole is punched in the center of the quadrant. How many total holes appear when unfolded?',
      question_ta: 'ஒரு வட்ட வடிவத் தாள் பாதியாக மடிக்கப்பட்டு (1-வது மடிப்பு), மீண்டும் பாதியாக மடிக்கப்படுகிறது (2-வது மடிப்பு). அதில் 1 துளையிடப்பட்டால் தாளைத் திறக்கும் போது மொத்தத் துளைகள் எத்தனை?',
      options_en: ['2', '4', '6', '8'],
      options_ta: ['2', '4', '6', '8'],
      correct_index: 1,
      explanation_en: 'Using the $2^N$ formula where $N=2$ folds: Total holes = 2² = 4 holes.',
      explanation_ta: '$2^N$ சூத்திரத்தைப் பயன்படுத்த ($N=2$ மடிப்புகள்): மொத்தத் துளைகள் = 2² = 4 துளைகள்.'
    },
    order_index: 20
  }
];


// ============================================================================
// 5. SAMPLE VERIFIED MAT QUESTIONS WITH SOURCE BADGES & RATIONALE
// ============================================================================
export const VERIFIED_MAT_QUESTIONS: Question[] = [
  {
    id: 'q-mat-pyq-2021-01',
    subject_id: 'subj-mat',
    topic_id: 'topic-mat-num-series',
    concept_id: 'concept-mat-num-1',
    question_en: 'Identify the next number in the official previous-year series: 4, 9, 16, 25, 36, ?',
    question_ta: 'முந்தைய அதிகாரப்பூர்வ வினாத்தாள் தொடரின் அடுத்து வரும் எண் எது: 4, 9, 16, 25, 36, ?',
    option_a_en: '45',
    option_a_ta: '45',
    option_b_en: '49',
    option_b_ta: '49',
    option_c_en: '54',
    option_c_ta: '54',
    option_d_en: '64',
    option_d_ta: '64',
    correct_option: 'B',
    explanation_en: 'The series consists of square numbers of consecutive integers: 2² = 4, 3² = 9, 4² = 16, 5² = 25, 6² = 36. Therefore, the next term is 7² = 49.',
    explanation_ta: 'கொடுக்கப்பட்ட தொடர் தொடர்ச்சியான இயல் எண்களின் வர்க்கங்களாகும்: 2² = 4, 3² = 9, 4² = 16, 5² = 25, 6² = 36. எனவே, அடுத்த எண் 7² = 49 ஆகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_PAPER',
    source_name: 'Tamil Nadu NMMS Official MAT Paper 2021',
    source_url: 'https://tnegadge.s3.amazonaws.com/notification/NMMS/1672118370.pdf',
    source_year: 2021,
    source_page: 2,
    verification_status: 'PUBLISHED',
    created_at: '2026-08-21T00:00:00Z'
  },
  {
    id: 'q-mat-pattern-practice-01',
    subject_id: 'subj-mat',
    topic_id: 'topic-mat-coding-decoding',
    concept_id: 'concept-mat-code-1',
    question_en: 'In a coding pattern observed in previous official papers, if GO = 32 and SHE = 49, then SOME is equal to:',
    question_ta: 'முந்தைய அதிகாரப்பூர்வ வினாத்தாள் அமைப்பின்படி, GO = 32 மற்றும் SHE = 49 எனில், SOME என்பதன் மதிப்பு என்ன?',
    option_a_en: '56',
    option_a_ta: '56',
    option_b_en: '58',
    option_b_ta: '58',
    option_c_en: '62',
    option_c_ta: '62',
    option_d_en: '64',
    option_d_ta: '64',
    correct_option: 'A',
    explanation_en: 'The rule uses reverse alphabet position numbers (Z=1 to A=26). For GO: G(20) + O(12) = 32. For SHE: S(8) + H(19) + E(22) = 49. For SOME: S(8) + O(12) + M(14) + E(22) = 56.',
    explanation_ta: 'இந்த விதியில் ஆங்கில எழுத்துக்களின் தலைகீழ் இடமதிப்பு (Z=1 முதல் A=26 வரை) பயன்படுத்தப்பட்டுள்ளது. GO: G(20) + O(12) = 32. SHE: S(8) + H(19) + E(22) = 49. SOME: S(8) + O(12) + M(14) + E(22) = 56.',
    difficulty: 'HARD',
    question_type: 'MCQ',
    source_type: 'TEACHER_CREATED_FROM_OFFICIAL_PATTERN',
    source_name: 'Official-Pattern Practice based on TN NMMS MAT 2020 Q24',
    source_url: 'https://apply1.tndge.org/dge-notification/NMMS',
    source_year: 2020,
    source_page: 5,
    verification_status: 'PUBLISHED',
    created_at: '2026-08-21T00:00:00Z'
  }
];
