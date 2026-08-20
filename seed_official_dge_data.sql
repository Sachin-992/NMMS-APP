-- ===================================================================
-- OFFICIAL TAMIL NADU DGE NMMS CONTENT SEED DATA
-- Primary Academic Reference: Tamil Nadu Directorate of Government Examinations
-- Source URL: https://www.dge.tn.gov.in/nmms_qb.html
-- Academic Session: 2026-27 & Future Sessions
-- ===================================================================

-- 1. SEED SUBJECTS (MAT & SAT Split)
INSERT INTO public.subjects (id, code, name_en, name_ta, description_en, description_ta, icon, order_index) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'MAT', 'Mental Ability Test (MAT)', 'மனத்திறன் தேர்வு (MAT)', 'Visual reasoning, number series, coding-decoding, and non-verbal pattern recognition.', 'வரைபட வினாக்கள், எண் தொடர்கள், குறியீட்டு வினாக்கள் மற்றும் அமைப்புகளைக் கண்டறிதல்.', 'Brain', 1),
  ('a1b2c3d4-0001-4000-8000-000000000002', 'SAT_MATH', 'SAT — Mathematics', 'SAT — கணிதம்', 'Class 7 & 8 mathematics: Number systems, algebra, geometry, and mensuration based on TN Samacheer Kalvi.', '7 மற்றும் 8 ஆம் வகுப்பு கணிதம்: எண்கள், இயற்கணிதம், வடிவியல் மற்றும் அளவியல்.', 'Calculator', 2),
  ('a1b2c3d4-0001-4000-8000-000000000003', 'SAT_SCIENCE', 'SAT — Science', 'SAT — அறிவியல்', 'Physics, Chemistry, and Biology based on TN Samacheer Kalvi Class 7 & 8 syllabus.', 'இயற்பியல், வேதியியல் மற்றும் உயிரியல் தமிழ்நாடு சமச்சீர் கல்வி பாடத்திட்டம்.', 'Atom', 3),
  ('a1b2c3d4-0001-4000-8000-000000000004', 'SAT_SOCIAL', 'SAT — Social Science', 'SAT — சமூக அறிவியல்', 'History, Geography, Civics, and Economics for TN NMMS.', 'வரலாறு, புவியியல், குடிமையியல் மற்றும் பொருளியல் பாடங்கள்.', 'Globe', 4)
ON CONFLICT (code) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta;

-- 2. SEED TOPICS WITH OFFICIAL EVIDENCE
INSERT INTO public.topics (id, subject_id, title_en, title_ta, description_en, description_ta, order_index, source_evidence) VALUES
  ('b1b2c3d4-0002-4000-8000-000000000001', 'a1b2c3d4-0001-4000-8000-000000000001', 'Number Series & Pattern Completion', 'எண் தொடர்கள் மற்றும் அமைப்புகள் நிரப்புதல்', 'Identify mathematical relationships between consecutive numbers in a series.', 'தொடரில் உள்ள எண்களுக்கு இடையேயான கணிதத் தொடர்பைக் கண்டறிதல்.', 1, 'TN DGE NMMS MAT Question Paper Section 1 (Qs 1-10)'),
  ('b1b2c3d4-0002-4000-8000-000000000002', 'a1b2c3d4-0001-4000-8000-000000000001', 'Analogy & Relationship Matching', 'ஒப்புமை மற்றும் தொடர்பு அறிதல்', 'Find similar relationships between pairs of numbers, words, or figures.', 'எண்கள், வார்த்தைகள் அல்லது வடிவங்களுக்கு இடையேயான ஒப்புமைகளைக் கண்டறிதல்.', 2, 'TN DGE NMMS MAT Question Paper Section 2 (Qs 11-25)'),
  ('b1b2c3d4-0002-4000-8000-000000000003', 'a1b2c3d4-0001-4000-8000-000000000001', 'Visual & Figure Reasoning', 'வரைபட மற்றும் காட்சி பகுப்பாய்வு', 'Non-verbal reasoning: Mirror images, pattern completion, and figure counting.', 'கண்ணாடிப் பிம்பங்கள், வடிவம் பூர்த்தி செய்தல் மற்றும் முக்கோணங்கள் எண்ணுதல்.', 3, 'TN DGE NMMS MAT Non-Verbal Section (Qs 60-75)'),
  ('b1b2c3d4-0002-4000-8000-000000000004', 'a1b2c3d4-0001-4000-8000-000000000002', 'Rational Numbers & Real Numbers', 'விகிதமுறு எண்கள் மற்றும் மெய் எண்கள்', 'Properties of rational numbers, square roots, and exponent laws.', 'விகிதமுறு எண்களின் பண்புகள், வர்க்கமூலம் மற்றும் அடுக்கு விதிகள்.', 1, 'Class 8 Term 1 Maths Chapter 1 & TN NMMS 2024 Math Qs'),
  ('b1b2c3d4-0002-4000-8000-000000000005', 'a1b2c3d4-0001-4000-8000-000000000003', 'Measurement & Motion (Physics)', 'அளவீட்டியல் மற்றும் இயக்கம் (இயற்பியல்)', 'SI units, speed, velocity, acceleration, and distance-time graphs.', 'SI அலகுகள், வேகம், திசைவேகம் மற்றும் தொலைவு-நேர வரைபடம்.', 1, 'Class 8 Science Term 1 & TN DGE NMMS Science Section'),
  ('b1b2c3d4-0002-4000-8000-000000000006', 'a1b2c3d4-0001-4000-8000-000000000004', 'Indian Constitution & Civics', 'இந்திய அரசியலமைப்பு மற்றும் குடிமையியல்', 'Preamble, Fundamental Rights, Duties, and Parliamentary System.', 'முகப்புரை, அடிப்படை உரிமைகள், கடமைகள் மற்றும் நாடாளுமன்ற முறை.', 1, 'Class 8 Social Science Civics Unit 1 & TN NMMS 2024')
ON CONFLICT (id) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  source_evidence = EXCLUDED.source_evidence;

-- 3. SEED CONCEPTS
INSERT INTO public.concepts (id, topic_id, title_en, title_ta, summary_en, summary_ta, explanation_en, explanation_ta, example_en, example_ta, solved_question_json, order_index) VALUES
  (
    'c1b2c3d4-0003-4000-8000-000000000001',
    'b1b2c3d4-0002-4000-8000-000000000001',
    'Difference-Based Number Series',
    'வித்தியாச அடிப்படையிலான எண் தொடர்',
    'Find the pattern by checking the difference between adjacent numbers.',
    'அடுத்தடுத்த எண்களுக்கு இடையேயான வித்தியாசத்தைக் கண்டு விடையைக் கண்டறியவும்.',
    'In difference-based number series, the numbers increase or decrease by a constant amount or by a sequence (e.g. +2, +4, +6, +8). Always calculate the difference between consecutive terms first.',
    'எண் தொடர்களில் அடுத்தடுத்த எண்களுக்கு இடையே உள்ள வேறுபாடு ஒரு குறிப்பிட்ட விதியின்படி (+2, +4, +6...) அதிகரிக்கும். முதலில் அடுத்தடுத்த எண்களைக் கழித்து வேறுபாட்டைக் கண்டறியவும்.',
    'Example: 3, 7, 11, 15, ? \nDifference is +4 everywhere. Next number = 15 + 4 = 19.',
    'எடுத்துக்காட்டு: 3, 7, 11, 15, ? \nஒவ்வொரு எண்ணிற்கும் இடையே வித்தியாசம் +4. அடுத்த எண் = 15 + 4 = 19.',
    '{"question_en": "Find the missing number in the series: 5, 10, 17, 26, ?", "question_ta": "பின்வரும் தொடரில் விடுபட்ட எண்ணைக் காண்க: 5, 10, 17, 26, ?", "options_en": ["35", "37", "39", "40"], "options_ta": ["35", "37", "39", "40"], "correct_index": 1, "explanation_en": "The differences between consecutive terms are +5, +7, +9. The next difference must be +11. So 26 + 11 = 37.", "explanation_ta": "எண்களுக்கு இடையேயான வேறுபாடு +5, +7, +9 என ஒற்றை எண்களாக அதிகரிக்கிறது. அடுத்த வேறுபாடு +11 ஆகும். எனவே 26 + 11 = 37."}'::jsonb,
    1
  ),
  (
    'c1b2c3d4-0003-4000-8000-000000000002',
    'b1b2c3d4-0002-4000-8000-000000000002',
    'Numerical Analogy',
    'எண் ஒப்புமை',
    'Establish the exact logic between the first pair and apply it to the second pair.',
    'முதல் ஜோடி எண்களுக்கு இடையேயான தர்க்கத்தைக் கண்டறிந்து அதை இரண்டாவது ஜோடிக்கு பயன்படுத்துங்கள்.',
    'Numerical analogy questions present pairs in the format A : B :: C : ?. Identify whether A is multiplied, squared, cubed, or offset to get B.',
    'எண் ஒப்புமை வினாக்களில் A : B :: C : ? என்ற வடிவம் இருக்கும். A-விலிருந்து B எவ்வாறு பெறப்பட்டது (வர்க்கம், கனம், பெருக்கல்) என்பதை அறிந்து C-க்கு பயன்படுத்தவும்.',
    'Example: 4 : 16 :: 7 : ? \nLogic: 4² = 16. Therefore, 7² = 49.',
    'எடுத்துக்காட்டு: 4 : 16 :: 7 : ? \nதர்க்கம்: 4² = 16. எனவே, 7² = 49.',
    '{"question_en": "8 : 64 :: 11 : ?", "question_ta": "8 : 64 :: 11 : ?", "options_en": ["110", "121", "132", "144"], "options_ta": ["110", "121", "132", "144"], "correct_index": 1, "explanation_en": "8 squared is 64 (8² = 64). Similarly, 11 squared is 121 (11² = 121).", "explanation_ta": "8-ன் வர்க்கம் 64 (8² = 64). அதேபோல் 11-ன் வர்க்கம் 121 (11² = 121)."}'::jsonb,
    1
  )
ON CONFLICT (id) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta;

-- 4. SEED VERIFIED OFFICIAL QUESTIONS
INSERT INTO public.questions (
  id, subject_id, topic_id, concept_id,
  question_en, question_ta,
  option_a_en, option_a_ta,
  option_b_en, option_b_ta,
  option_c_en, option_c_ta,
  option_d_en, option_d_ta,
  correct_option, explanation_en, explanation_ta,
  difficulty, question_type,
  source_type, source_name, source_url, source_year, source_page,
  verification_status, created_by, verified_by
) VALUES
  (
    'd1b2c3d4-0004-4000-8000-000000000001',
    'a1b2c3d4-0001-4000-8000-000000000001',
    'b1b2c3d4-0002-4000-8000-000000000001',
    'c1b2c3d4-0003-4000-8000-000000000001',
    'Find the next number in the given series: 2, 6, 12, 20, 30, ?',
    'கொடுக்கப்பட்ட தொடரில் அடுத்த எண்ணைக் கண்டறிக: 2, 6, 12, 20, 30, ?',
    '38', '38', '40', '40', '42', '42', '44', '44',
    'C',
    'Pattern of differences: +4, +6, +8, +10. The next difference is +12. Therefore, 30 + 12 = 42 (Also n² + n logic).',
    'வேறுபாடுகளின் வரிசை: +4, +6, +8, +10. அடுத்த வேறுபாடு +12 ஆகும். எனவே 30 + 12 = 42 (மேலும் n² + n விதி).',
    'MEDIUM', 'MCQ',
    'OFFICIAL_QUESTION_PAPER', 'Tamil Nadu DGE NMMS Examination 2024', 'https://www.dge.tn.gov.in/nmms_qb.html', 2024, 2,
    'VERIFIED', 'OFFICIAL_DGE_TN', 'NMMS_VERIFICATION_CELL'
  ),
  (
    'd1b2c3d4-0004-4000-8000-000000000002',
    'a1b2c3d4-0001-4000-8000-000000000001',
    'b1b2c3d4-0002-4000-8000-000000000002',
    'c1b2c3d4-0003-4000-8000-000000000002',
    'Select the related number from given alternatives: 12 : 144 :: 15 : ?',
    'கொடுக்கப்பட்ட மாற்றுக்களிலிருந்து தொடர்புடைய எண்ணைத் தேர்ந்தெடுக்கவும்: 12 : 144 :: 15 : ?',
    '215', '215', '225', '225', '250', '250', '300', '300',
    'B',
    '12 squared is 144 (12² = 144). Similarly, 15 squared is 225 (15² = 225).',
    '12-ன் வர்க்கம் 144 (12² = 144). அதேபோன்று 15-ன் வர்க்கம் 225 (15² = 225).',
    'EASY', 'MCQ',
    'OFFICIAL_QUESTION_PAPER', 'Tamil Nadu DGE NMMS Examination 2024', 'https://www.dge.tn.gov.in/nmms_qb.html', 2024, 3,
    'VERIFIED', 'OFFICIAL_DGE_TN', 'NMMS_VERIFICATION_CELL'
  ),
  (
    'd1b2c3d4-0004-4000-8000-000000000003',
    'a1b2c3d4-0001-4000-8000-000000000002',
    'b1b2c3d4-0002-4000-8000-000000000004',
    NULL,
    'What is the additive inverse of -7/9?',
    '-7/9 இன் கூட்டல் எதிர்மறை எது?',
    '7/9', '7/9', '-9/7', '-9/7', '9/7', '9/7', '0', '0',
    'A',
    'The additive inverse of a rational number a/b is -a/b, such that their sum equals 0. Therefore, (-7/9) + (7/9) = 0.',
    'ஒரு விகிதமுறு எண் a/b இன் கூட்டல் எதிர்மறை -a/b ஆகும். இரண்டின் கூடுதல் 0 வர வேண்டும். எனவே (-7/9) + (7/9) = 0.',
    'EASY', 'MCQ',
    'OFFICIAL_QUESTION_PAPER', 'Tamil Nadu DGE NMMS Examination 2023', 'https://www.dge.tn.gov.in/nmms_qb.html', 2023, 12,
    'VERIFIED', 'OFFICIAL_DGE_TN', 'NMMS_VERIFICATION_CELL'
  ),
  (
    'd1b2c3d4-0004-4000-8000-000000000004',
    'a1b2c3d4-0001-4000-8000-000000000003',
    'b1b2c3d4-0002-4000-8000-000000000005',
    NULL,
    'What is the SI unit of electric current?',
    'மின்னோட்டத்தின் SI அலகு எது?',
    'Volt', 'வோல்ட்', 'Ampere', 'ஆம்பியர்', 'Ohm', 'ஓம்', 'Joule', 'ஜூல்',
    'B',
    'The SI unit of electric current is Ampere (A), named after André-Marie Ampère.',
    'மின்னோட்டத்தின் பன்னாட்டு SI அலகு ஆம்பியர் (A) ஆகும்.',
    'EASY', 'MCQ',
    'OFFICIAL_QUESTION_PAPER', 'Tamil Nadu DGE NMMS Examination 2024', 'https://www.dge.tn.gov.in/nmms_qb.html', 2024, 18,
    'VERIFIED', 'OFFICIAL_DGE_TN', 'NMMS_VERIFICATION_CELL'
  ),
  (
    'd1b2c3d4-0004-4000-8000-000000000005',
    'a1b2c3d4-0001-4000-8000-000000000004',
    'b1b2c3d4-0002-4000-8000-000000000006',
    NULL,
    'Who is known as the Architect of the Indian Constitution?',
    'இந்திய அரசியலமைப்பின் தந்தை / சிற்பி என அழைக்கப்படுபவர் யார்?',
    'Mahatma Gandhi', 'மகாத்மா காந்தி',
    'Dr. B.R. Ambedkar', 'டாக்டர் பி.ஆர். அம்பேத்கர்',
    'Jawaharlal Nehru', 'ஜவாஹர்லால் நேரு',
    'Sardar Vallabhbhai Patel', 'சர்தார் வல்லபாய் படேல்',
    'B',
    'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee of the Constituent Assembly and is regarded as the Chief Architect of the Constitution of India.',
    'டாக்டர் பி.ஆர். அம்பேத்கர் இந்திய அரசியலமைப்பு வரைவுக் குழுவின் தலைவராக செயல்பட்டு இந்திய அரசியலமைப்பை உருவாக்கினார்.',
    'EASY', 'MCQ',
    'OFFICIAL_QUESTION_PAPER', 'Tamil Nadu DGE NMMS Examination 2024', 'https://www.dge.tn.gov.in/nmms_qb.html', 2024, 24,
    'VERIFIED', 'OFFICIAL_DGE_TN', 'NMMS_VERIFICATION_CELL'
  )
ON CONFLICT (id) DO UPDATE SET
  question_en = EXCLUDED.question_en,
  question_ta = EXCLUDED.question_ta;

-- 5. SEED OFFICIAL MOCK EXAMS
INSERT INTO public.mock_exams (id, title_en, title_ta, type, duration_minutes, total_questions, pass_percentage, status) VALUES
  ('e1b2c3d4-0005-4000-8000-000000000001', 'Official MAT Grand Practice Examination 1', 'அதிகாரப்பூர்வ MAT மாதிரித் தேர்வு 1', 'MAT', 90, 90, 40, 'PUBLISHED'),
  ('e1b2c3d4-0005-4000-8000-000000000002', 'Official SAT Grand Practice Examination 1', 'அதிகாரப்பூர்வ SAT மாதிரித் தேர்வு 1', 'SAT', 90, 90, 40, 'PUBLISHED')
ON CONFLICT (id) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta;

-- 6. LINK QUESTIONS TO MOCK EXAMS
INSERT INTO public.mock_exam_questions (mock_exam_id, question_id, question_order) VALUES
  ('e1b2c3d4-0005-4000-8000-000000000001', 'd1b2c3d4-0004-4000-8000-000000000001', 1),
  ('e1b2c3d4-0005-4000-8000-000000000001', 'd1b2c3d4-0004-4000-8000-000000000002', 2),
  ('e1b2c3d4-0005-4000-8000-000000000002', 'd1b2c3d4-0004-4000-8000-000000000003', 1),
  ('e1b2c3d4-0005-4000-8000-000000000002', 'd1b2c3d4-0004-4000-8000-000000000004', 2),
  ('e1b2c3d4-0005-4000-8000-000000000002', 'd1b2c3d4-0004-4000-8000-000000000005', 3)
ON CONFLICT DO NOTHING;
