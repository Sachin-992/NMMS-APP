export type Role = 'STUDENT' | 'TEACHER' | 'ADMIN' | 'SUPER_ADMIN';

export type Language = 'en' | 'ta';

export interface UserProfile {
  id: string;
  role: Role;
  full_name: string;
  email?: string;
  created_at: string;
}

export interface Student {
  id: string;
  profile_id?: string;
  student_id: string; // e.g. PUM26001
  pin: string;        // e.g. 4821
  name: string;
  class_section: string;
  medium: 'TA' | 'EN' | 'BOTH';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  xp: number;
  level: number;
  streak_days: number;
  last_active_date: string;
  created_at: string;
}

export type SubjectCode = 'MAT' | 'SAT_MATH' | 'SAT_SCIENCE' | 'SAT_SOCIAL';

export interface Subject {
  id: string;
  code: SubjectCode;
  name_en: string;
  name_ta: string;
  description_en: string;
  description_ta: string;
  icon: string;
  order_index: number;
  topics_count?: number;
}

export type MATCategoryCode = 
  | 'NUMBER_REASONING'
  | 'VERBAL_REASONING'
  | 'NON_VERBAL_REASONING'
  | 'LOGICAL_REASONING'
  | 'SPATIAL_VISUAL';

export interface MATCategory {
  id: string;
  code: MATCategoryCode;
  name_en: string;
  name_ta: string;
  description_en: string;
  description_ta: string;
  icon: string;
  order_index: number;
  topics_count?: number;
}

export type TopicPriority = 'HIGH_PRIORITY' | 'MEDIUM_PRIORITY' | 'FOUNDATION';
export type TopicConfidence = 'HIGH' | 'MEDIUM' | 'LOW';
export type TopicSyllabusStatus = 'EXPLICIT_OFFICIAL' | 'PATTERN_VERIFIED' | 'SUPPLEMENTARY';

export interface TopicVerificationRecord {
  topic_id: string;
  syllabus_status: TopicSyllabusStatus;
  found_in_official_papers: boolean;
  years_found: number[];
  frequency: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: TopicConfidence;
  evidence_source: string;
  status: 'VERIFIED' | 'UNDER_REVIEW' | 'PROPOSED';
  rationale_en: string;
  rationale_ta: string;
}

export interface Topic {
  id: string;
  subject_id: string;
  category_id?: string;
  category_code?: MATCategoryCode;
  title_en: string;
  title_ta: string;
  description_en: string;
  description_ta: string;
  order_index: number;
  priority?: TopicPriority;
  confidence?: TopicConfidence;
  syllabus_status?: TopicSyllabusStatus;
  years_found?: number[];
  frequency?: 'HIGH' | 'MEDIUM' | 'LOW';
  source_evidence?: string;
  concepts_count?: number;
  questions_count?: number;
  official_questions_count?: number;
  practice_questions_count?: number;
  difficulty_level?: 'EASY' | 'MEDIUM' | 'HARD';
  is_published?: boolean;
}

export interface SolvedQuestion {
  question_en: string;
  question_ta: string;
  options_en: string[];
  options_ta: string[];
  correct_index: number;
  explanation_en: string;
  explanation_ta: string;
}

export interface Concept {
  id: string;
  topic_id: string;
  title_en: string;
  title_ta: string;
  summary_en: string;
  summary_ta: string;
  explanation_en: string;
  explanation_ta: string;
  example_en: string;
  example_ta: string;
  solved_question?: SolvedQuestion;
  order_index: number;
}

export type QuestionType = 'MCQ' | 'IMAGE_MCQ' | 'FIGURE_MCQ';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type SourceType = 
  | 'OFFICIAL_QUESTION_PAPER'
  | 'OFFICIAL_QUESTION_BANK'
  | 'OFFICIAL_SAMPLE'
  | 'TEACHER_CREATED_FROM_OFFICIAL_PATTERN'
  | 'VERIFIED_NMMS_DERIVED'
  | 'TEXTBOOK_BASED'
  | 'ORIGINAL_NMMS_STYLE';

export type VerificationStatus = 
  | 'DRAFT'
  | 'SOURCE_CHECK'
  | 'TEACHER_REVIEW'
  | 'VERIFIED'
  | 'PUBLISHED';

export interface Question {
  id: string;
  subject_id: string;
  topic_id?: string;
  concept_id?: string;
  question_en: string;
  question_ta: string;
  option_a_en: string;
  option_a_ta: string;
  option_b_en: string;
  option_b_ta: string;
  option_c_en: string;
  option_c_ta: string;
  option_d_en: string;
  option_d_ta: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation_en: string;
  explanation_ta: string;
  difficulty: Difficulty;
  question_type: QuestionType;
  image_url?: string;
  source_type: SourceType;
  source_name: string;
  source_url?: string;
  source_year?: number;
  source_page?: number;
  verification_status: VerificationStatus;
  created_by?: string;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
}

export interface MistakeItem {
  id: string;
  student_id: string;
  question_id: string;
  selected_option: 'A' | 'B' | 'C' | 'D';
  attempt_count: number;
  last_attempted_at: string;
  resolved: boolean;
  question?: Question;
}

export interface DailyMission {
  id: string;
  student_id: string;
  mission_date: string;
  concepts_target: number;
  practice_target: number;
  revision_target: number;
  concepts_completed: number;
  practice_completed: number;
  revision_completed: number;
  is_claimed: boolean;
  xp_reward: number;
}

export type ExamType = 'MAT' | 'SAT' | 'FULL_SIMULATION';

export interface MockExam {
  id: string;
  title_en: string;
  title_ta: string;
  type: ExamType;
  duration_minutes: number;
  total_questions: number;
  pass_percentage: number;
  status: 'DRAFT' | 'PUBLISHED';
  created_at: string;
  questions?: Question[];
}

export interface ExamAnswer {
  question_id: string;
  selected_option: 'A' | 'B' | 'C' | 'D' | null;
  marked_for_review: boolean;
  time_spent_seconds: number;
}

export interface ExamAttempt {
  id: string;
  student_id: string;
  mock_exam_id: string;
  started_at?: string;
  completed_at?: string;
  attempted_at?: string;
  score: number;
  total_questions: number;
  time_taken_seconds: number;
  passed?: boolean;
  mat_score?: number;
  sat_score?: number;
  answers?: ExamAnswer[];
  detailed_analysis?: {
    mat_score?: number;
    sat_score?: number;
    topic_accuracy?: Record<string, any>;
    strongest_topic?: string;
    weakest_topic?: string;
  };
}

export interface Achievement {
  code: string;
  title_en: string;
  title_ta: string;
  description_en: string;
  description_ta: string;
  icon: string;
  xp_reward: number;
  unlocked?: boolean;
  unlocked_at?: string;
}

export interface SystemSettings {
  exam_date_status: 'OFFICIAL' | 'TENTATIVE' | 'NOT_ANNOUNCED';
  exam_date: string;
  exam_date_source?: string;
  academic_year: string;
  school_name: string;
}

export type SourceTypeCategory = 
  | 'OFFICIAL_NOTIFICATION'
  | 'OFFICIAL_QUESTION_PAPER'
  | 'GOVERNMENT_GUIDELINE'
  | 'OFFICIAL_PRESS_RELEASE';

export interface OfficialSource {
  id: string;
  title: string;
  organization: string; // e.g. 'Tamil Nadu Directorate of Government Examinations'
  url: string;
  document_year: number;
  document_type: SourceTypeCategory;
  page_reference?: number | string;
  retrieved_at: string;
  verification_status: VerificationStatus;
  notes?: string;
}

export type GuideSourceType = 
  | 'CURRENT_NOTIFICATION'
  | 'PREVIOUS_PAPER_PATTERN'
  | 'OFFICIAL_RULE'
  | 'RECOMMENDED_STRATEGY'
  | 'UNCONFIRMED';

export interface GuideFact {
  id: string;
  fact_en: string;
  fact_ta: string;
  category: 'PATTERN' | 'OMR' | 'ITEMS_ALLOWED' | 'ITEMS_PROHIBITED' | 'TIMING' | 'PROCEDURE' | 'ELIGIBILITY';
  value: string;
  source_id?: string;
  source?: OfficialSource;
  source_type?: GuideSourceType;
  status: 'CONFIRMED' | 'HISTORICAL' | 'NOT_SPECIFIED';
  is_current: boolean;
  last_verified: string;
}

export interface GuideSection {
  id: string;
  title_en: string;
  title_ta: string;
  description_en: string;
  description_ta: string;
  icon: string;
  order_index: number;
}

export interface GuideFAQ {
  id: string;
  question_en: string;
  question_ta: string;
  answer_en: string;
  answer_ta: string;
  category: string;
  source_id?: string;
  source?: OfficialSource;
  status: 'CONFIRMED' | 'HISTORICAL' | 'NOT_SPECIFIED';
}

export interface ChecklistItem {
  id: string;
  text_en: string;
  text_ta: string;
  category: 'OFFICIAL_REQUIREMENT' | 'RECOMMENDED_PREPARATION';
  is_official_requirement: boolean;
  checked?: boolean;
}

// ---------------- OFFICIAL PAPERS & MENTOR CLASSROOM ----------------
export type PaperDocumentType = 'MAT_PAPER' | 'SAT_PAPER' | 'OMR_SHEET' | 'COMBINED_PAPER';

export interface OfficialPaper {
  id: string;
  title_en: string;
  title_ta: string;
  exam: string; // e.g. 'NMMS'
  paper_type: 'OFFICIAL_PAPER' | 'MODEL_PAPER' | 'OMR_SHEET';
  subject_code: 'MAT' | 'SAT' | 'OMR' | 'ALL';
  year: number;
  source_organization: string; // e.g. 'Tamil Nadu Directorate of Government Examinations'
  source_url: string;
  original_pdf_url: string;
  document_status: 'IMPORTED' | 'PROCESSING' | 'NEEDS_REVIEW' | 'VERIFIED' | 'PUBLISHED';
  total_questions: number;
  description_en?: string;
  description_ta?: string;
}

export interface PaperQuestion {
  id: string;
  paper_id: string;
  question_number: number;
  question_en: string;
  question_ta: string;
  option_a_en: string;
  option_a_ta: string;
  option_b_en: string;
  option_b_ta: string;
  option_c_en: string;
  option_c_ta: string;
  option_d_en: string;
  option_d_ta: string;
  question_image?: string;
  source_page?: number;
  concept_id?: string;
  difficulty?: Difficulty;
  verification_status: VerificationStatus;
}

export interface TeacherStrokePoint {
  x: number;
  y: number;
}

export interface TeacherStroke {
  id: string;
  type: 'pen' | 'highlighter' | 'eraser' | 'text' | 'line' | 'arrow' | 'rect' | 'circle';
  points: TeacherStrokePoint[];
  color: string;
  strokeWidth: number;
  text?: string;
}

export interface TeacherAnnotation {
  id: string;
  paper_question_id: string;
  teacher_id: string;
  strokes: TeacherStroke[];
  updated_at: string;
}

export interface TeacherNote {
  id: string;
  paper_question_id: string;
  teacher_id: string;
  note_text: string;
  concept_tag?: string;
  updated_at: string;
}

export interface ClassroomSession {
  id: string;
  paper_id: string;
  title: string;
  current_question_number: number;
  teacher_id: string;
  last_accessed_at: string;
}



