-- ===================================================================
-- PUM NMMS CHAMPION - DATABASE SCHEMA & INITIAL SETUP
-- Target DB: PostgreSQL / Supabase
-- Target Audience: 8th Standard Students preparing for Tamil Nadu NMMS
-- School: PUM School, Echampatti
-- ===================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & USERS TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('STUDENT', 'TEACHER', 'ADMIN', 'SUPER_ADMIN')),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. STUDENTS TABLE (No mandatory student email - uses Student ID + PIN)
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id TEXT UNIQUE NOT NULL, -- e.g., PUM26001
  pin TEXT NOT NULL,               -- e.g., 4821
  name TEXT NOT NULL,
  class_section TEXT DEFAULT '8-A',
  medium TEXT DEFAULT 'TA' CHECK (medium IN ('TA', 'EN', 'BOTH')),
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')),
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SUBJECTS TABLE (MAT & SAT subjects)
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL CHECK (code IN ('MAT', 'SAT_MATH', 'SAT_SCIENCE', 'SAT_SOCIAL')),
  name_en TEXT NOT NULL,
  name_ta TEXT NOT NULL,
  description_en TEXT,
  description_ta TEXT,
  icon TEXT NOT NULL DEFAULT 'BookOpen',
  order_index INTEGER DEFAULT 0
);

-- 4. TOPICS TABLE
CREATE TABLE IF NOT EXISTS public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_ta TEXT NOT NULL,
  description_en TEXT,
  description_ta TEXT,
  order_index INTEGER DEFAULT 0,
  source_evidence TEXT -- Official syllabus evidence note
);

-- 5. CONCEPTS TABLE
CREATE TABLE IF NOT EXISTS public.concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_ta TEXT NOT NULL,
  summary_en TEXT,
  summary_ta TEXT,
  explanation_en TEXT NOT NULL,
  explanation_ta TEXT NOT NULL,
  example_en TEXT,
  example_ta TEXT,
  solved_question_json JSONB,
  order_index INTEGER DEFAULT 0
);

-- 6. QUESTIONS BANK TABLE (STRICT CONTENT VERIFICATION ENGINE)
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  concept_id UUID REFERENCES public.concepts(id) ON DELETE SET NULL,
  question_en TEXT NOT NULL,
  question_ta TEXT NOT NULL,
  option_a_en TEXT NOT NULL,
  option_a_ta TEXT NOT NULL,
  option_b_en TEXT NOT NULL,
  option_b_ta TEXT NOT NULL,
  option_c_en TEXT NOT NULL,
  option_c_ta TEXT NOT NULL,
  option_d_en TEXT NOT NULL,
  option_d_ta TEXT NOT NULL,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  explanation_en TEXT NOT NULL,
  explanation_ta TEXT NOT NULL,
  difficulty TEXT DEFAULT 'MEDIUM' CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
  question_type TEXT DEFAULT 'MCQ' CHECK (question_type IN ('MCQ', 'IMAGE_MCQ', 'FIGURE_MCQ')),
  image_url TEXT,
  source_type TEXT NOT NULL CHECK (source_type IN (
    'OFFICIAL_QUESTION_PAPER',
    'OFFICIAL_QUESTION_BANK',
    'OFFICIAL_SAMPLE',
    'TEACHER_CREATED_FROM_OFFICIAL_PATTERN'
  )),
  source_name TEXT NOT NULL DEFAULT 'Tamil Nadu DGE NMMS',
  source_url TEXT NOT NULL DEFAULT 'https://www.dge.tn.gov.in/nmms_qb.html',
  source_year INTEGER NOT NULL DEFAULT 2024,
  source_page INTEGER DEFAULT 1,
  verification_status TEXT NOT NULL DEFAULT 'VERIFIED' CHECK (verification_status IN (
    'DRAFT',
    'SOURCE_CHECK',
    'TEACHER_REVIEW',
    'VERIFIED',
    'PUBLISHED'
  )),
  created_by TEXT DEFAULT 'ADMIN',
  verified_by TEXT DEFAULT 'OFFICIAL_REVIEWER',
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MISTAKE BOOK TABLE
CREATE TABLE IF NOT EXISTS public.mistake_book (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_option TEXT NOT NULL,
  attempt_count INTEGER DEFAULT 1,
  last_attempted_at TIMESTAMPTZ DEFAULT NOW(),
  resolved BOOLEAN DEFAULT FALSE,
  UNIQUE(student_id, question_id)
);

-- 8. DAILY MISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.daily_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  mission_date DATE DEFAULT CURRENT_DATE,
  concepts_target INTEGER DEFAULT 1,
  practice_target INTEGER DEFAULT 10,
  revision_target INTEGER DEFAULT 5,
  concepts_completed INTEGER DEFAULT 0,
  practice_completed INTEGER DEFAULT 0,
  revision_completed INTEGER DEFAULT 0,
  is_claimed BOOLEAN DEFAULT FALSE,
  xp_reward INTEGER DEFAULT 50,
  UNIQUE(student_id, mission_date)
);

-- 9. MOCK EXAMS TABLE
CREATE TABLE IF NOT EXISTS public.mock_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_ta TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('MAT', 'SAT', 'FULL_SIMULATION')),
  duration_minutes INTEGER NOT NULL DEFAULT 90,
  total_questions INTEGER NOT NULL DEFAULT 90,
  pass_percentage INTEGER DEFAULT 40,
  status TEXT DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'PUBLISHED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. MOCK EXAM QUESTIONS INTERMEDIARY TABLE
CREATE TABLE IF NOT EXISTS public.mock_exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mock_exam_id UUID NOT NULL REFERENCES public.mock_exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  question_order INTEGER NOT NULL,
  UNIQUE(mock_exam_id, question_order)
);

-- 11. EXAM ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  mock_exam_id UUID NOT NULL REFERENCES public.mock_exams(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  score INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  time_taken_seconds INTEGER DEFAULT 0,
  mat_score INTEGER DEFAULT 0,
  sat_score INTEGER DEFAULT 0,
  detailed_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. STUDENT ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.student_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  achievement_code TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, achievement_code)
);

-- 13. SYSTEM SETTINGS (Exam date configuration, etc.)
CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default system settings
INSERT INTO public.system_settings (key, value) VALUES
  ('exam_info', '{"exam_date_status": "OFFICIAL_EXPECTED", "exam_date": "2026-12-20", "academic_year": "2026-27", "school_name": "PUM School, Echampatti"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- RLS POLICIES ENABLEMENT
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistake_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Allow read access for authenticated & anonymous users to published content
CREATE POLICY "Public published questions read" ON public.questions FOR SELECT USING (verification_status IN ('VERIFIED', 'PUBLISHED'));
CREATE POLICY "Public subjects read" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Public topics read" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public concepts read" ON public.concepts FOR SELECT USING (true);
CREATE POLICY "Public mock exams read" ON public.mock_exams FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Public settings read" ON public.system_settings FOR SELECT USING (true);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_questions_verification ON public.questions(verification_status);
CREATE INDEX IF NOT EXISTS idx_questions_subject_topic ON public.questions(subject_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON public.students(student_id);
CREATE INDEX IF NOT EXISTS idx_mistake_student ON public.mistake_book(student_id);

-- 14. OFFICIAL SOURCES & EXAM GUIDE MANAGEMENT
CREATE TABLE IF NOT EXISTS public.official_sources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  url TEXT NOT NULL,
  document_year INT NOT NULL,
  document_type TEXT NOT NULL,
  page_reference TEXT,
  retrieved_at TIMESTAMPTZ DEFAULT NOW(),
  verification_status TEXT DEFAULT 'VERIFIED',
  notes TEXT
);

CREATE TABLE IF NOT EXISTS public.guide_facts (
  id TEXT PRIMARY KEY,
  fact_en TEXT NOT NULL,
  fact_ta TEXT NOT NULL,
  category TEXT NOT NULL,
  value TEXT NOT NULL,
  source_id TEXT REFERENCES public.official_sources(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'CONFIRMED',
  is_current BOOLEAN DEFAULT TRUE,
  last_verified TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.guide_faqs (
  id TEXT PRIMARY KEY,
  question_en TEXT NOT NULL,
  question_ta TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_ta TEXT NOT NULL,
  category TEXT NOT NULL,
  source_id TEXT REFERENCES public.official_sources(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'CONFIRMED'
);

ALTER TABLE public.official_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public sources read" ON public.official_sources FOR SELECT USING (true);
CREATE POLICY "Public facts read" ON public.guide_facts FOR SELECT USING (true);
CREATE POLICY "Public faqs read" ON public.guide_faqs FOR SELECT USING (true);

-- 15. OFFICIAL PAPERS & MENTOR CLASSROOM WORKSPACE
CREATE TABLE IF NOT EXISTS public.official_papers (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ta TEXT NOT NULL,
  exam TEXT DEFAULT 'NMMS',
  paper_type TEXT NOT NULL,
  subject_code TEXT NOT NULL,
  year INT NOT NULL,
  source_organization TEXT NOT NULL,
  source_url TEXT NOT NULL,
  original_pdf_url TEXT NOT NULL,
  document_status TEXT DEFAULT 'PUBLISHED',
  total_questions INT DEFAULT 90,
  description_en TEXT,
  description_ta TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.paper_questions (
  id TEXT PRIMARY KEY,
  paper_id TEXT REFERENCES public.official_papers(id) ON DELETE CASCADE,
  question_number INT NOT NULL,
  question_en TEXT NOT NULL,
  question_ta TEXT NOT NULL,
  option_a_en TEXT, option_a_ta TEXT,
  option_b_en TEXT, option_b_ta TEXT,
  option_c_en TEXT, option_c_ta TEXT,
  option_d_en TEXT, option_d_ta TEXT,
  question_image TEXT,
  source_page INT,
  concept_id TEXT,
  difficulty TEXT DEFAULT 'MEDIUM',
  verification_status TEXT DEFAULT 'VERIFIED',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.teacher_annotations (
  id TEXT PRIMARY KEY,
  paper_question_id TEXT REFERENCES public.paper_questions(id) ON DELETE CASCADE,
  teacher_id TEXT NOT NULL,
  strokes_json JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.teacher_notes (
  id TEXT PRIMARY KEY,
  paper_question_id TEXT REFERENCES public.paper_questions(id) ON DELETE CASCADE,
  teacher_id TEXT NOT NULL,
  note_text TEXT NOT NULL,
  concept_tag TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.classroom_sessions (
  id TEXT PRIMARY KEY,
  paper_id TEXT REFERENCES public.official_papers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  current_question_number INT DEFAULT 1,
  teacher_id TEXT NOT NULL,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.official_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public published papers read" ON public.official_papers FOR SELECT USING (document_status IN ('VERIFIED', 'PUBLISHED'));
CREATE POLICY "Public paper questions read" ON public.paper_questions FOR SELECT USING (verification_status IN ('VERIFIED', 'PUBLISHED'));
CREATE POLICY "Public teacher annotations read" ON public.teacher_annotations FOR SELECT USING (true);
CREATE POLICY "Public teacher notes read" ON public.teacher_notes FOR SELECT USING (true);
CREATE POLICY "Public classroom sessions read" ON public.classroom_sessions FOR SELECT USING (true);


