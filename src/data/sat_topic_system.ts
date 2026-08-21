import type { Topic, Concept } from '../types';

/**
 * PUM NMMS CHAMPION — VERIFIED SAT TOPIC SYSTEM REGISTER
 * Strict Mapping: Tamil Nadu DGE NMMS Portion & TN Samacheer Kalvi Class 7 & 8 Syllabus
 * Total SAT Topics: 39 (SAT Math: 9, SAT Science: 15, SAT Social Science: 15)
 */

export const VERIFIED_SAT_TOPICS: Topic[] = [
  // ==========================================
  // 1. SAT MATHEMATICS (9 TOPICS — 20 MARKS)
  // ==========================================
  {
    id: 'topic-sat-math-1',
    subject_id: 'subj-math',
    title_en: '1. Real Number System & Rational Numbers',
    title_ta: '1. மெய் எண்கள் & விகிதமுறு எண்கள்',
    description_en: 'Properties of rational numbers, standard form, number line representation, and density property.',
    description_ta: 'விகிதமுறு எண்களின் பண்புகள், திட்ட வடிவம், எண் கோட்டில் குறித்தல் மற்றும் அடர்த்திப் பண்பு.',
    order_index: 1,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2020, 2021, 2022, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 8 Term 1 Math Chapter 1 / TN DGE Question Paper'
  },
  {
    id: 'topic-sat-math-2',
    subject_id: 'subj-math',
    title_en: '2. Squares, Cubes & Square Roots',
    title_ta: '2. வர்க்கம், வர்க்கமூலம், கனம் & கனமூலம்',
    description_en: 'Square numbers, cube numbers, prime factorization method, long division method, and estimation.',
    description_ta: 'வர்க்க எண்கள், கன எண்கள், பகா காரணி முறை, நீள் வகுத்தல் முறை மற்றும் தோராய மதிப்பு.',
    order_index: 2,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2019, 2021, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 8 Term 1 Math Chapter 1'
  },
  {
    id: 'topic-sat-math-3',
    subject_id: 'subj-math',
    title_en: '3. Exponents & Powers',
    title_ta: '3. அடுக்குகள் & அடிமானங்கள்',
    description_en: 'Laws of exponents (a^m * a^n = a^(m+n)), negative exponents, scientific notation, and standard indices.',
    description_ta: 'அடுக்கு விதிகள், எதிர்மறை அடுக்குகள், அறிவியல் குறியீடு மற்றும் அடுக்குக் கணக்கீடுகள்.',
    order_index: 3,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 2 & Class 8 Term 1'
  },
  {
    id: 'topic-sat-math-4',
    subject_id: 'subj-math',
    title_en: '4. Algebraic Expressions & Identities',
    title_ta: '4. இயற்கணிதக் கோவைகள் & முற்றொருமைகள்',
    description_en: 'Addition, multiplication of algebraic expressions, identities ((a+b)^2, (a-b)^2, (a+b)(a-b)), and factorisation.',
    description_ta: 'இயற்கணிதக் கோவைகளின் பெருக்கல், முற்றொருமைகள் மற்றும் காரணிப்படுத்துதல்.',
    order_index: 4,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 8 Math Chapter 3'
  },
  {
    id: 'topic-sat-math-5',
    subject_id: 'subj-math',
    title_en: '5. Linear Equations in One Variable',
    title_ta: '5. ஒரு மாறியில் அமைந்த நேரியல் சமன்பாடுகள்',
    description_en: 'Solving linear equations with variables on one and both sides, practical age & number word problems.',
    description_ta: 'ஒரு மாறியில் அமைந்த சமன்பாடுகளைத் தீர்த்தல் மற்றும் பயன்பாட்டுக் கணக்குகள்.',
    order_index: 5,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023],
    frequency: 'MEDIUM',
    source_evidence: 'TN Samacheer Kalvi Class 8 Math Chapter 3'
  },
  {
    id: 'topic-sat-math-6',
    subject_id: 'subj-math',
    title_en: '6. Commercial Math — Ratio, Percentage & Interest',
    title_ta: '6. வாழ்வியல் கணிதம் — சதவீதம், லாப-நஷ்டம் & வட்டி',
    description_en: 'Direct & inverse variation, percentage, profit & loss, simple interest, and compound interest basics.',
    description_ta: 'நேர் & எதிர் விகிதசமம், சதவீதம், லாப நஷ்டம், தனிவட்டி மற்றும் கூட்டுவட்டி.',
    order_index: 6,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2019, 2020, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 3 & Class 8 Term 2'
  },
  {
    id: 'topic-sat-math-7',
    subject_id: 'subj-math',
    title_en: '7. Geometry — Triangles & Parallel Lines',
    title_ta: '7. வடிவியல் — முக்கோணம் & இணைக்கோடுகள்',
    description_en: 'Angle sum property, exterior angle theorem, congruence rules (SSS, SAS, ASA, RHS), Pythagoras theorem.',
    description_ta: 'முக்கோணத்தின் கோணக் கூடுதல் பண்பு, வெளிக்கோணத் தேற்றம், சர்வசம விதிகள், பிதாகரஸ் தேற்றம்.',
    order_index: 7,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2022, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 2 & Class 8 Math Chapter 5'
  },
  {
    id: 'topic-sat-math-8',
    subject_id: 'subj-math',
    title_en: '8. Mensuration — Perimeter, Area & Volume',
    title_ta: '8. அளவியல் — சுற்றளவு, பரப்பளவு & கனஅளவு',
    description_en: 'Area of parallelogram, rhombus, trapezium, circle, surface area and volume of cube and cuboid.',
    description_ta: 'இணைகரம், சாய்சதுரம், சரிவகம், வட்டம் ஆகியவற்றின் பரப்பளவு மற்றும் கனச்சதுரம், கனசெவ்வகத்தின் கனஅளவு.',
    order_index: 8,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 Math Chapter 2'
  },
  {
    id: 'topic-sat-math-9',
    subject_id: 'subj-math',
    title_en: '9. Data Handling & Statistics',
    title_ta: '9. தரவுகளைக் கையாளுதல் & புள்ளியியல்',
    description_en: 'Arithmetic mean, median, mode, frequency distribution tables, bar graphs, and pie charts.',
    description_ta: 'சராசரி, இடைநிலை, முகடு, நிகழ்வெண் அட்டவணை, பட்டை வரைபடம் மற்றும் வட்ட வரைபடம்.',
    order_index: 9,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2022, 2024],
    frequency: 'MEDIUM',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 3 & Class 8 Math Chapter 6'
  },

  // ==========================================
  // 2. SAT SCIENCE (15 TOPICS — 35 MARKS)
  // ==========================================
  // --- Physics (6 Topics) ---
  {
    id: 'topic-sat-sci-1',
    subject_id: 'subj-science',
    title_en: '1. Measurement & Units (Physics)',
    title_ta: '1. அளவீட்டியல் (இயற்பியல்)',
    description_en: 'Fundamental SI units, derived units, measuring area, volume, mass, weight, and density.',
    description_ta: 'அடிப்படை அலகு, வழி அலகு, பரப்பளவு, பருமன், அடர்த்தி மற்றும் நிறை அளவீடுகள்.',
    order_index: 1,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 Science Unit 1'
  },
  {
    id: 'topic-sat-sci-2',
    subject_id: 'subj-science',
    title_en: '2. Forces, Motion & Pressure',
    title_ta: '2. விசையும் இயக்கமும் & அழுத்தம்',
    description_en: 'Types of motion, speed, velocity, distance-time graphs, Newton laws, friction, atmospheric pressure, Pascal law.',
    description_ta: 'இயக்கத்தின் வகைகள், வேகம், முடுக்கம், நியூட்டன் விதிகள், உராய்ப்பு மற்றும் பாஸ்கல் விதி.',
    order_index: 2,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 Science Unit 2'
  },
  {
    id: 'topic-sat-sci-3',
    subject_id: 'subj-science',
    title_en: '3. Heat & Temperature',
    title_ta: '3. வெப்பம் & வெப்பநிலை',
    description_en: 'Temperature scales (Celsius, Fahrenheit, Kelvin), heat transmission (conduction, convection, radiation), expansion.',
    description_ta: 'வெப்பநிலை அளவீடுகள், வெப்பக் கடத்தல், வெப்பச்சலனம், வெப்பக்கதிர்வீச்சு மற்றும் விரிவடைதல்.',
    order_index: 3,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 2 & Class 8 Science Unit 4'
  },
  {
    id: 'topic-sat-sci-4',
    subject_id: 'subj-science',
    title_en: '4. Light, Mirrors & Optics',
    title_ta: '4. ஒளியியல் & எதிரொளிப்பு',
    description_en: 'Laws of reflection, plane mirrors, concave & convex mirrors, image formation, refraction, spectrum.',
    description_ta: 'ஒளி எதிரொளிப்பு விதிகள், சமதள ஆடி, குழி ஆடி, குவி ஆடி பிம்பங்கள் மற்றும் ஒளிவிலகல்.',
    order_index: 4,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 3 & Class 8 Science Unit 3'
  },
  {
    id: 'topic-sat-sci-5',
    subject_id: 'subj-science',
    title_en: '5. Electricity & Magnetism',
    title_ta: '5. மின்னியல் & காந்தவியல்',
    description_en: 'Electric charge, simple circuit, series & parallel connection, conductors, electromagnets, magnetic lines.',
    description_ta: 'மின்னோட்டம், மின்சுற்று, தொடர் & பக்க இணைப்பு, கடத்திகள், மின்காந்தங்கள் மற்றும் காந்த விசைக்கோடுகள்.',
    order_index: 5,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 2 & Class 8 Science Unit 5'
  },
  {
    id: 'topic-sat-sci-6',
    subject_id: 'subj-science',
    title_en: '6. Sound & Acoustics',
    title_ta: '6. ஒளியியல் (ஒலி)',
    description_en: 'Production of sound, vibration, amplitude, frequency, pitch, speed of sound in media, noise pollution.',
    description_ta: 'ஒலி உருவாக்கம், அதிர்வு, வீச்சு, அதிர்வெண், சுருதி, ஒலியின் வேகம் மற்றும் சத்த மாசுபாடு.',
    order_index: 6,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2022, 2024],
    frequency: 'MEDIUM',
    source_evidence: 'TN Samacheer Kalvi Class 8 Science Unit 6'
  },

  // --- Chemistry (4 Topics) ---
  {
    id: 'topic-sat-sci-7',
    subject_id: 'subj-science',
    title_en: '7. Matter Around Us & Separation Techniques',
    title_ta: '7. நம்மைச் சுற்றியுள்ள பருப்பொருள்கள் & பிரித்தெடுத்தல்',
    description_en: 'Elements, compounds, mixtures, physical vs chemical changes, filtration, evaporation, distillation.',
    description_ta: 'தனிமங்கள், சேர்மங்கள், கலவைகள், இயற்பியல் & வேதியியல் மாற்றங்கள், காய்ச்சியடித்தல், வடிகட்டுதல்.',
    order_index: 7,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2023],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 Science Unit 9'
  },
  {
    id: 'topic-sat-sci-8',
    subject_id: 'subj-science',
    title_en: '8. Atomic Structure & Valency',
    title_ta: '8. அணு அமைப்பு & பிணைப்பு',
    description_en: 'Protons, neutrons, electrons, Dalton & Rutherford atomic models, atomic number (Z), mass number (A), valency.',
    description_ta: 'புரோட்டான், நியூட்ரான், எலக்ட்ரான், அணு எண், நிறை எண், அணு மாதிரி மற்றும் இணைதிறன்.',
    order_index: 8,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 3 & Class 8 Science Unit 8'
  },
  {
    id: 'topic-sat-sci-9',
    subject_id: 'subj-science',
    title_en: '9. Acids, Bases, Salts & Indicators',
    title_ta: '9. அமிலங்கள், காரங்கள், உப்புகள் & நிறங்காட்டிகள்',
    description_en: 'Properties of acids & bases, pH scale, litmus paper, neutralization reaction, common salts in daily life.',
    description_ta: 'அமிலங்கள் & காரங்களின் பண்புகள், pH அளவுகோல், லிட்மஸ் தாள், நடுநிலையாக்கல் வினை மற்றும் பயன்பாடுகள்.',
    order_index: 9,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 3 & Class 8 Science Unit 14'
  },
  {
    id: 'topic-sat-sci-10',
    subject_id: 'subj-science',
    title_en: '10. Combustion, Flame & Fuels',
    title_ta: '10. எரிதல், சுடர் & எரிபொருள்கள்',
    description_en: 'Ignition temperature, types of combustion (rapid, spontaneous, explosive), structure of flame, calorific value.',
    description_ta: 'எரிபொருள் பற்றவைப்பு வெப்பநிலை, எரிதலின் வகைகள், சுடரின் அமைப்புகள் மற்றும் கலோரி மதிப்பு.',
    order_index: 10,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023],
    frequency: 'MEDIUM',
    source_evidence: 'TN Samacheer Kalvi Class 8 Science Unit 10'
  },

  // --- Biology & Environmental Science (5 Topics) ---
  {
    id: 'topic-sat-sci-11',
    subject_id: 'subj-science',
    title_en: '11. Cell Biology & Microorganisms',
    title_ta: '11. செல் உயிரியல் & நுண்ணுயிரிகள்',
    description_en: 'Plant cell vs animal cell, cell organelles, bacteria, viruses, fungi, protozoa, useful & harmful microbes.',
    description_ta: 'தாவரச் செல் & விலங்குச் செல் அமைப்புகள், நுண் உறுப்புகள், பாக்டீரியா, வைரஸ், பூஞ்சை மற்றும் நுண்ணுயிரிகள்.',
    order_index: 11,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 Science Unit 16 & 17'
  },
  {
    id: 'topic-sat-sci-12',
    subject_id: 'subj-science',
    title_en: '12. Plant Physiology & Reproduction',
    title_ta: '12. தாவர செயலியல் & இனப்பெருக்கம்',
    description_en: 'Photosynthesis equation, xylem & phloem transport, transpiration, sexual & asexual plant reproduction.',
    description_ta: 'ஒளிச்சேர்க்கை, சைலம் & புளோயம் கடத்தல், நீராவிப்போக்கு, பாலிலா & பாலின இனப்பெருக்கம்.',
    order_index: 12,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 Science Unit 19'
  },
  {
    id: 'topic-sat-sci-13',
    subject_id: 'subj-science',
    title_en: '13. Human Organ Systems & Health',
    title_ta: '13. மனித உடல் மண்டலங்கள் & சுகாதாரம்',
    description_en: 'Digestive, respiratory, circulatory, nervous systems, balanced diet, vitamins & deficiency diseases.',
    description_ta: 'செரிமான மண்டலம், சுவாச மண்டலம், இரத்த ஓட்ட மண்டலம், சத்தான உணவு மற்றும் வைட்டமின் குறைபாடுகள்.',
    order_index: 13,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2019, 2021, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 2 & Class 8 Science Unit 20 & 21'
  },
  {
    id: 'topic-sat-sci-14',
    subject_id: 'subj-science',
    title_en: '14. Crop Production & Management',
    title_ta: '14. பயிர் பெருக்கம் & மேலாண்மை',
    description_en: 'Agricultural practices, soil preparation, sowing, irrigation methods, fertilizers vs manure, harvesting.',
    description_ta: 'விவசாயப் பயிற்சிகள், மண் தயாரித்தல், பாசனம், உரம் & இயற்கை உரம் பயன்பாடு, அறுவடை.',
    order_index: 14,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2022, 2024],
    frequency: 'MEDIUM',
    source_evidence: 'TN Samacheer Kalvi Class 8 Science Unit 22'
  },
  {
    id: 'topic-sat-sci-15',
    subject_id: 'subj-science',
    title_en: '15. Conservation of Ecology & Biodiversity',
    title_ta: '15. சுற்றுச்சூழல் & பல்லுயிர் பாதுகாப்பு',
    description_en: 'Deforestation, Red Data Book, endemic species, national parks, wildlife sanctuaries, biosphere reserves in TN.',
    description_ta: 'காடழிப்பு, சிவப்பு தரவு புத்தகம், அழிந்துவரும் உயிரினங்கள், தேசிய பூங்காக்கள் மற்றும் வனவிலங்கு சரணாலயங்கள்.',
    order_index: 15,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 8 Science Unit 23'
  },

  // ==========================================
  // 3. SAT SOCIAL SCIENCE (15 TOPICS — 35 MARKS)
  // ==========================================
  // --- History (5 Topics) ---
  {
    id: 'topic-sat-soc-1',
    subject_id: 'subj-social',
    title_en: '1. Medieval Indian Kingdoms & South India (History)',
    title_ta: '1. தென்னிந்திய அரசுகள் & இடைக்கால இந்தியா (வரலாறு)',
    description_en: 'Later Cholas, Pandyas, Vijayanagar Empire, Bahmani Sultanate, art, architecture, and administration.',
    description_ta: 'பிற்காலச் சோழர்கள், பாண்டியர்கள், விஜயநகரப் பேரரசு, பாமினி சுல்தானியம், கலை மற்றும் நிர்வாகம்.',
    order_index: 1,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 History Unit 1'
  },
  {
    id: 'topic-sat-soc-2',
    subject_id: 'subj-social',
    title_en: '2. Delhi Sultanate & Mughal Empire',
    title_ta: '2. டெல்லி சுல்தானியம் & முகலாயப் பேரரசு',
    description_en: 'Slave, Khalji, Tughlaq, Sayyid, Lodi dynasties, Babur, Akbar, Shah Jahan, Aurangzeb, revenue systems.',
    description_ta: 'டெல்லி சுல்தான்கள், பாபர் முதல் ஔரங்கசீப் வரையிலான முகலாய மன்னர்கள், நிலவருவாய் முறைகள்.',
    order_index: 2,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 7 Term 2'
  },
  {
    id: 'topic-sat-soc-3',
    subject_id: 'subj-social',
    title_en: '3. Advent of Europeans & British Rule',
    title_ta: '3. ஐரோப்பியர்களின் வருகை & ஆங்கிலேயர் ஆட்சி',
    description_en: 'Portuguese, Dutch, French, English East India Company, Battle of Plassey (1757), Buxar (1764), Land settlements.',
    description_ta: 'ஐரோப்பியர்களின் வருகை, பிளாசிப் போர், பக்சார் போர், நிலையான நிலவரித் திட்டம், ரயத்வாரி முறை.',
    order_index: 3,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 8 History Unit 1 & 2'
  },
  {
    id: 'topic-sat-soc-4',
    subject_id: 'subj-social',
    title_en: '4. Great Revolt of 1857 & Freedom Struggle in TN',
    title_ta: '4. 1857 பெரும் புரட்சி & தமிழக சுதந்திரப் போராட்டம்',
    description_en: 'Causes of 1857 revolt, Mangal Pandey, Rani Lakshmi Bai, Velu Nachiyar, Kattabomman, V.O.C, Subramania Bharati.',
    description_ta: '1857 பெரும் புரட்சியின் காரணங்கள், தலைவர்கள், வேலு நாச்சியார், கட்டபொம்மன், வ.உ.சி, பாரதியார்.',
    order_index: 4,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2022, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 8 History Unit 4 & 5'
  },
  {
    id: 'topic-sat-soc-5',
    subject_id: 'subj-social',
    title_en: '5. Social & Religious Reform Movements',
    title_ta: '5. சமூக சமய சீர்திருத்த இயக்கங்கள்',
    description_en: 'Brahmo Samaj (Raja Ram Mohan Roy), Arya Samaj, Prarthana Samaj, Ramakrishna Mission, Jyotirao Phule.',
    description_ta: 'பிரம்ம சமாஜம், ஆரிய சமாஜம், பிரார்த்தனை சமாஜம், ராமகிருஷ்ண மிஷன், ஜோதிராவ் பூலே சீர்திருத்தங்கள்.',
    order_index: 5,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2021, 2023],
    frequency: 'MEDIUM',
    source_evidence: 'TN Samacheer Kalvi Class 8 History Unit 6'
  },

  // --- Geography (6 Topics) ---
  {
    id: 'topic-sat-soc-6',
    subject_id: 'subj-social',
    title_en: '6. Interior of Earth & Rocks (Geography)',
    title_ta: '6. புவியின் உட்புறம் & பாறைகள் (புவியியல்)',
    description_en: 'Crust, mantle, core, igneous, sedimentary, metamorphic rocks, rock cycle, earthquakes and volcanoes.',
    description_ta: 'மேலோடு, கவசம், கருவம், தீப்பாறை, படிவுப்பாறை, உருமாறிய பாறை, நிலநடுக்கம் மற்றும் எரிமலைகள்.',
    order_index: 6,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 Geography Unit 1'
  },
  {
    id: 'topic-sat-soc-7',
    subject_id: 'subj-social',
    title_en: '7. Weathering, Rivers & Landforms',
    title_ta: '7. நிலத்தோற்றங்கள் & ஆறுகளின் பணிகள்',
    description_en: 'River erosional & depositional landforms (waterfalls, meanders, oxbow lakes, deltas), wind, ice landforms.',
    description_ta: 'ஆறுகளின் அரித்தல் & படிதல் நிலத்தோற்றங்கள் (நீர்வீழ்ச்சி, வளைவுகள், டெல்டா) மற்றும் காற்றுப் பணிகள்.',
    order_index: 7,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 Geography Unit 2'
  },
  {
    id: 'topic-sat-soc-8',
    subject_id: 'subj-social',
    title_en: '8. Weather, Climate & Atmosphere',
    title_ta: '8. வளிமண்டலம், வானிலை & காலநிலை',
    description_en: 'Troposphere, stratosphere, mesosphere, pressure belts, planetary winds, monsoon in Tamil Nadu, humidity.',
    description_ta: 'வளிமண்டல அடுக்குகள், அழுத்த மண்டலங்கள், கோள் காற்றுகள், பருவக்காற்று மற்றும் ஈரப்பதம்.',
    order_index: 8,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 2 & Class 8 Geography Unit 3'
  },
  {
    id: 'topic-sat-soc-9',
    subject_id: 'subj-social',
    title_en: '9. Hydrosphere, Oceans & Water Cycle',
    title_ta: '9. நீர்க்கோளம் & பெருங்கடல்கள்',
    description_en: 'Distribution of water, ocean relief features, ocean currents (warm & cold), tides, waves, conservation.',
    description_ta: 'நீர் பரவல், பெருங்கடல் தரையமைப்பு, கடல் நீரோட்டங்கள், அலைகள், ஓதங்கள் மற்றும் நீர் பாதுகாப்பு.',
    order_index: 9,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2023],
    frequency: 'MEDIUM',
    source_evidence: 'TN Samacheer Kalvi Class 8 Geography Unit 4'
  },
  {
    id: 'topic-sat-soc-10',
    subject_id: 'subj-social',
    title_en: '10. Natural Resources & Industries',
    title_ta: '10. இயற்கை வளங்கள் & தொழிற்சாலைகள்',
    description_en: 'Renewable vs non-renewable resources, iron ore, coal, petroleum, textile & iron steel industries in India & TN.',
    description_ta: 'புதுப்பிக்கக்கூடிய & புதுப்பிக்க இயலாத வளங்கள், இரும்பு, நிலக்கரி, ஜவுளி & இரும்புத் தொழிற்சாலைகள்.',
    order_index: 10,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 8 Geography Unit 5 & 6'
  },
  {
    id: 'topic-sat-soc-11',
    subject_id: 'subj-social',
    title_en: '11. Map Reading, Scales & Globe',
    title_ta: '11. வரைபட வாசிப்பு & புவி மாதிரி',
    description_en: 'Latitudes, Longitudes, Equator, Tropics, Prime Meridian, Indian Standard Time (IST), map symbols.',
    description_ta: 'அட்சரேகைகள், தீர்க்கரேகைகள், நிலநடுக்கோடு, இந்திய திட்ட நேரம் (IST) மற்றும் வரைபட குறியீடுகள்.',
    order_index: 11,
    priority: 'MEDIUM_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2022, 2024],
    frequency: 'MEDIUM',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 3 & Class 8 Geography Unit 7'
  },

  // --- Civics & Economics (4 Topics) ---
  {
    id: 'topic-sat-soc-12',
    subject_id: 'subj-social',
    title_en: '12. Indian Constitution & Democracy (Civics)',
    title_ta: '12. இந்திய அரசியல் அமைப்பு & ஜனநாயகம் (குடிமையியல்)',
    description_en: 'Preamble, Fundamental Rights (6), Fundamental Duties, Secularism, Parliamentary Democracy structure.',
    description_ta: 'முகப்புரை, அடிப்படை உரிமைகள் (6), அடிப்படை கடமைகள், மதச்சார்பின்மை, பாராளுமன்ற ஜனநாயகம்.',
    order_index: 12,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 1 & Class 8 Civics Unit 1 & 2'
  },
  {
    id: 'topic-sat-soc-13',
    subject_id: 'subj-social',
    title_en: '13. State Government & Judiciary',
    title_ta: '13. மாநில அரசு & நீதித்துறை',
    description_en: 'Governor, Chief Minister, Legislative Assembly (Vidhan Sabha), High Court, Lok Adalat, Subordinate courts.',
    description_ta: 'ஆளுநர், முதலமைச்சர், சட்டமன்றம், உயர் நீதிமன்றம், லோக் அதாலத் மற்றும் உள்ளூர் நீதிமன்றங்கள்.',
    order_index: 13,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 2 & Class 8 Civics Unit 3'
  },
  {
    id: 'topic-sat-soc-14',
    subject_id: 'subj-social',
    title_en: '14. Human Rights, Gender Equality & Safety',
    title_ta: '14. மனித உரிமைகள், பாலின சமத்துவம் & பாதுகாப்பு',
    description_en: 'Universal Declaration of Human Rights (UDHR), Child rights (POCSO), Women rights, Road safety symbols.',
    description_ta: 'உலகளாவிய மனித உரிமைகள் பிரகடனம், குழந்தைகள் உரிமைகள் (போக்ஸோ), பெண்கள் பாதுகாப்பு, சாலை விதிகள்.',
    order_index: 14,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2019, 2021, 2022, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 8 Civics Unit 4 & 5'
  },
  {
    id: 'topic-sat-soc-15',
    subject_id: 'subj-social',
    title_en: '15. Money, Savings, Production & Tax (Economics)',
    title_ta: '15. பணம், சேமிப்பு, உற்பத்தி & வரிகள் (பொருளியல்)',
    description_en: 'Functions of money, barter system, bank savings, factors of production (land, labor, capital), direct & indirect tax.',
    description_ta: 'பணத்தின் பணிகள், பண்டமாற்று முறை, வங்கியியல் சேமிப்பு, உற்பத்தி காரணிகள் (நிலம், உழைப்பு, முதன்மை) மற்றும் வரிகள்.',
    order_index: 15,
    priority: 'HIGH_PRIORITY',
    confidence: 'HIGH',
    syllabus_status: 'EXPLICIT_OFFICIAL',
    years_found: [2018, 2020, 2022, 2023, 2024],
    frequency: 'HIGH',
    source_evidence: 'TN Samacheer Kalvi Class 7 Term 3 & Class 8 Economics Unit 1 & 2'
  }
];

/**
 * SAT INITIAL CONCEPTS REGISTER
 */
export const VERIFIED_SAT_CONCEPTS: Concept[] = [
  // --- SAT Math 1 Concept ---
  {
    id: 'concept-topic-sat-math-1',
    topic_id: 'topic-sat-math-1',
    title_en: 'Rational Numbers & Standard Form Rules',
    title_ta: 'விகிதமுறு எண்கள் & திட்ட வடிவ விதிகள்',
    summary_en: 'Understanding p/q form (q ≠ 0), positive/negative rational numbers, density property, and standard form.',
    summary_ta: 'p/q வடிவம் (q ≠ 0), மிகை/குறை விகிதமுறு எண்கள், அடர்த்திப் பண்பு மற்றும் திட்ட வடிவம்.',
    explanation_en: `
### 📌 Concept Overview
A rational number is any number that can be expressed in the form **p/q**, where **p** and **q** are integers and **q ≠ 0**.

---

### 💡 Tips & Shortcuts for NMMS Mathematics

1. **Standard Form Shortcut**:
   - The denominator **q** must always be **positive**. If $p/(-q)$, rewrite as $(-p)/q$.
   - **HCF(p, q) = 1** (p and q must have no common factor except 1).
2. **Density Property**:
   - Between any two rational numbers $a$ and $b$, there are **infinitely many** rational numbers!
   - Mean Formula: A rational number between $a$ and $b$ is $\\frac{a + b}{2}$.
3. **Decimal Conversion Shortcut**:
   - Terminating Decimal: Denominator prime factors contain **only 2s and/or 5s** (e.g. $1/8 = 0.125$).
   - Non-Terminating Recurring: Denominator contains prime factors other than 2 or 5 (e.g. $1/3 = 0.333...$).
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
p மற்றும் q என்பவை முழுக்கள், q ≠ 0 என்ற நிலையில் **p/q** வடிவில் எழுதக்கூடிய எண்களே **விகிதமுறு எண்கள்** எனப்படும்.

---

### 💡 NMMS கணித குறுக்கு வழிகள் (Tips & Tricks)

1. **திட்ட வடிவ விதி**:
   - பகுதி (q) எப்போதும் **மிகையாக** இருக்க வேண்டும். $p/(-q)$ எனில் $(-p)/q$ என மாற்றுக.
   - மீ.பொ.வ(p, q) = 1 (தொகுதி மற்றும் பகுதிக்கு இடையே பொதுக் காரணி 1 மட்டுமே இருக்க வேண்டும்).
2. **அடர்த்திப் பண்பு**:
   - ஏதேனும் இரு விகிதமுறு எண்களுக்கு இடையே **முடிவிலி எண்ணிக்கையிலான** விகிதமுறு எண்கள் உள்ளன!
   - இடைப்பட்ட எண் காணும் சூத்திரம்: $\\frac{a + b}{2}$.
3. **முடிவுறு தசம எண் ஷார்ட்கட்**:
   - பகுதியின் பகா காரணிகள் **2 மற்றும் 5 மட்டுமே** எனில் அது முடிவுறு தசம எண் (எ.கா: $1/8 = 0.125$).
    `.trim(),
    example_en: 'Express -15/20 in standard form:\nHCF(15, 20) = 5 → Divide numerator and denominator by 5 → -3/4.',
    example_ta: '-15/20 ஐ திட்ட வடிவில் எழுதுக:\n15 மற்றும் 20 இன் மீ.பொ.வ = 5 → 5 ஆல் வகுக்க → -3/4.',
    solved_question: {
      question_en: 'Which of the following rational numbers is in standard form?',
      question_ta: 'பின்வருவனவற்றுள் எது திட்ட வடிவில் அமைந்துள்ள விகிதமுறு எண்?',
      options_en: ['-4/12', '5/-7', '-3/8', '9/15'],
      options_ta: ['-4/12', '5/-7', '-3/8', '9/15'],
      correct_index: 2,
      explanation_en: '-3/8 is in standard form because denominator 8 is positive and HCF(3, 8) = 1.',
      explanation_ta: '-3/8 இன் பகுதி 8 மிகையாக உள்ளது மற்றும் மீ.பொ.வ(3, 8) = 1 என்பதால் இது திட்ட வடிவில் உள்ளது.'
    },
    order_index: 1
  },

  // --- SAT Science 1 Concept ---
  {
    id: 'concept-topic-sat-sci-1',
    topic_id: 'topic-sat-sci-1',
    title_en: 'Fundamental & Derived Units in Physics',
    title_ta: 'இயற்பியலின் அடிப்படை & வழி அலகுகள்',
    summary_en: 'SI base units (length, mass, time, temperature) and derived units (area, volume, density).',
    summary_ta: 'SI அடிப்படை அலகுகள் (நீளம், நிறை, காலம், வெப்பநிலை) மற்றும் வழி அலகுகள் (பரப்பளவு, பருமன், அடர்த்தி).',
    explanation_en: `
### 📌 Concept Overview
Physics measurements rely on **SI Units** (International System of Units).

---

### 💡 Essential NMMS Science Formulas & Shortcuts

1. **7 Fundamental SI Base Quantities**:
   - Length: **Metre (m)**
   - Mass: **Kilogram (kg)**
   - Time: **Second (s)**
   - Temperature: **Kelvin (K)**
   - Electric Current: **Ampere (A)**
   - Amount of Substance: **Mole (mol)**
   - Luminous Intensity: **Candela (cd)**
2. **Key Derived Formulas**:
   - $\\text{Area} = \\text{Length} \\times \\text{Breadth}$ ($m^2$)
   - $\\text{Volume} = \\text{Length} \\times \\text{Breadth} \\times \\text{Height}$ ($m^3$)
   - $\\text{Density} = \\frac{\\text{Mass}}{\\text{Volume}}$ ($kg/m^3$)
3. **Density Rule**:
   - Density of pure water = $1000 \\text{ kg/m}^3$ (or $1 \\text{ g/cm}^3$).
   - Objects with density **less than water float**, higher density **sink**!
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
இயற்பியல் அளவீடுகள் பன்னாட்டு அலகு முறையை (**SI முறை**) அடிப்படையாகக் கொண்டவை.

---

### 💡 முக்கிய NMMS அறிவியல் சூத்திரங்கள் & ஷார்ட்கட்கள்

1. **7 அடிப்படை SI அலகுகள்**:
   - நீளம்: **மீட்டர் (m)**
   - நிறை: **கிலோகிராம் (kg)**
   - காலம்: **விநாடி (s)**
   - வெப்பநிலை: **கெல்வின் (K)**
   - மின்னோட்டம்: **ஆம்பியர் (A)**
2. **வழி அலகு சூத்திரங்கள்**:
   - $\\text{அடர்த்தி} = \\frac{\\text{நிறை}}{\\text{பருமன்}}$ ($kg/m^3$)
3. **அடர்த்தி விதி**:
   - தூய நீரின் அடர்த்தி = $1000 \\text{ kg/m}^3$ (அல்லது $1 \\text{ g/cm}^3$).
   - நீரை விட அடர்த்தி குறைந்த பொருள்கள் **மிதக்கும்**, அதிக அடர்த்தி கொண்டவை **மூழ்கும்**!
    `.trim(),
    example_en: 'Find the density of a block of mass 500 kg and volume 0.5 m³:\nDensity = Mass / Volume = 500 / 0.5 = 1000 kg/m³.',
    example_ta: '500 kg நிறையும் 0.5 m³ பருமனும் கொண்ட கட்டையின் அடர்த்தி காண்க:\nஅடர்த்தி = நிறை / பருமன் = 500 / 0.5 = 1000 kg/m³.',
    solved_question: {
      question_en: 'What is the SI unit of Temperature?',
      question_ta: 'வெப்பநிலையின் SI அலகு எது?',
      options_en: ['Degree Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)', 'Joule (J)'],
      options_ta: ['டிகிரி செல்சியஸ் (°C)', 'பாரன்ஹீட் (°F)', 'கெல்வின் (K)', 'ஜூல் (J)'],
      correct_index: 2,
      explanation_en: 'The SI base unit of Temperature is Kelvin (K).',
      explanation_ta: 'வெப்பநிலையின் பன்னாட்டு SI அடிப்படை அலகு கெல்வின் (K) ஆகும்.'
    },
    order_index: 1
  },

  // --- SAT Social 1 Concept ---
  {
    id: 'concept-topic-sat-soc-1',
    topic_id: 'topic-sat-soc-1',
    title_en: 'Later Cholas & South Indian Kingdoms',
    title_ta: 'பிற்காலச் சோழர்கள் & தென்னிந்திய அரசுகள்',
    summary_en: 'Rajaraja Chola I, Rajendra Chola I, Brihadeeswarar Temple, Kudavolai electoral system, and local self-government.',
    summary_ta: 'முதலாம் இராஜராஜ சோழன், முதலாம் இராஜேந்திர சோழன், தஞ்சைப் பெரிய கோவில், குடவோலை முறை மற்றும் உள்ளாட்சி நிர்வாகம்.',
    explanation_en: `
### 📌 Concept Overview
The Imperial Cholas (9th to 13th Century CE) established one of South India's greatest empires with naval power and democratic village administration.

---

### 💡 NMMS History Key Facts & Memory Shortcuts

1. **Rajaraja Chola I (985–1014 CE)**:
   - Built the magnificent **Brihadeeswarar Temple (Big Temple)** at Thanjavur in **1010 CE**.
   - Known as *Mummidi Chola* and *Jayamgonda Chola*.
2. **Rajendra Chola I (1012–1044 CE)**:
   - Defeated the Pala dynasty of Bengal and earned the title **Gangaikonda Cholan**.
   - Built the capital **Gangaikonda Cholapuram** and created the huge reservoir *Cholagangam*.
3. **Kudavolai Village Electoral System**:
   - Mentioned in the famous **Uttiramerur Inscriptions** of Parantaka I.
   - Village assembly (*Sabha*) divided into 30 wards (*Kudumbu*); representatives chosen by ballot from a pot (*Kudavolai*).
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம்
பிற்காலச் சோழர்கள் (கி.பி 9 முதல் 13-ஆம் நூற்றாண்டு) கடல்வழிப் படையெடுப்புகள் மற்றும் சிறந்த கிராம பஞ்சாயத்து நிர்வாகத்திற்குப் பெயர் பெற்றவர்கள்.

---

### 💡 NMMS வரலாற்று முக்கிய குறிப்புகள் & நினைவுக் குறுக்கு வழிகள்

1. **முதலாம் இராஜராஜ சோழன் (கி.பி 985–1014)**:
   - **கி.பி 1010-இல்** தஞ்சைப் பெரிய கோவிலைக் (**பிரகதீஸ்வரர் கோவில்**) கட்டினார்.
2. **முதலாம் இராஜேந்திர சோழன் (கி.பி 1012–1044)**:
   - வங்காளத்தின் பாலர்களை வென்று **கங்கைகொண்ட சோழன்** என்ற பட்டம் பெற்றார்.
   - **கங்கைகொண்ட சோழபுரம்** நகரையும் *சோழங்கங்கம்* ஏரியையும் உருவாக்கினார்.
3. **குடவோலை ஜனநாயகத் தேர்தல் முறை**:
   - முதலாம் பராந்தகனின் **உத்திரமேரூர் கல்வெட்டுகளில்** விளக்கப்பட்டுள்ளது.
   - கிராம சபை 30 வார்டுகளாகப் பிரிக்கப்பட்டு பானையில் பெயரிடப்பட்ட ஓலைகளை எடுத்து உறுப்பினர்கள் தேர்ந்தெடுக்கப்பட்டனர்.
    `.trim(),
    example_en: 'Which Chola king built the Gangaikonda Cholapuram temple?\nAnswer: Rajendra Chola I after his successful expedition to the Ganges river.',
    example_ta: 'கங்கைகொண்ட சோழபுரம் கோவிலைக் கட்டிய சோழ மன்னர் யார்?\nவிடை: முதலாம் இராஜேந்திர சோழன்.',
    solved_question: {
      question_en: 'Which inscription details the Kudavolai village administration system of the Cholas?',
      question_ta: 'சோழர்களின் குடவோலை கிராம நிர்வாக முறையைப் பற்றி விரிவாகக் கூறும் கல்வெட்டு எது?',
      options_en: ['Kudumiyanmalai Inscription', 'Uttiramerur Inscription', 'Aihole Inscription', 'Tiruchirappalli Inscription'],
      options_ta: ['குடுமியான்மலை கல்வெட்டு', 'உத்திரமேரூர் கல்வெட்டு', 'ஐஹோல் கல்வெட்டு', 'திருச்சிராப்பள்ளி கல்வெட்டு'],
      correct_index: 1,
      explanation_en: 'The Uttiramerur Inscriptions of Parantaka I describe the Kudavolai system of Chola village administration.',
      explanation_ta: 'முதலாம் பராந்தகனின் உத்திரமேரூர் கல்வெட்டுகள் சோழர்களின் குடவோலை கிராம நிர்வாக முறையை விளக்குகின்றன.'
    },
    order_index: 1
  }
];
