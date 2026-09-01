import type { 
  Student, Question, Subject, Topic, Concept, 
  MistakeItem, DailyMission, MockExam, ExamAttempt, 
  SystemSettings, OfficialSource, GuideFact, GuideFAQ, ChecklistItem,
  OfficialPaper, PaperQuestion, TeacherAnnotation, TeacherNote, ClassroomSession
} from '../types';
import { 
  INITIAL_SUBJECTS, INITIAL_TOPICS, 
  INITIAL_CONCEPTS, INITIAL_QUESTIONS, INITIAL_MOCK_EXAMS, 
  INITIAL_ACHIEVEMENTS, INITIAL_SYSTEM_SETTINGS, DEMO_STUDENT 
} from './mockData';
import { 
  OfficialSourcesRepository, VERIFIED_GUIDE_FACTS, 
  VERIFIED_FAQS, VERIFIED_CHECKLIST 
} from '../data/nmms_official_research';
import { 
  INITIAL_OFFICIAL_PAPERS, INITIAL_PAPER_QUESTIONS 
} from '../data/official_dge_papers';

const KEYS = {
  STUDENTS: 'pum_students',
  CURRENT_STUDENT: 'pum_current_student',
  ADMIN_USER: 'pum_admin_user',
  QUESTIONS: 'pum_questions',
  TOPICS: 'pum_topics',
  CONCEPTS: 'pum_concepts',
  SUBJECTS: 'pum_subjects',
  MISTAKE_BOOK: 'pum_mistakes',
  DAILY_MISSION: 'pum_daily_mission',
  EXAM_ATTEMPTS: 'pum_exam_attempts',
  MOCK_EXAMS: 'pum_mock_exams',
  ACHIEVEMENTS: 'pum_achievements',
  SYSTEM_SETTINGS: 'pum_system_settings',
  GUIDE_SOURCES: 'pum_guide_sources',
  GUIDE_FACTS: 'pum_guide_facts',
  GUIDE_FAQS: 'pum_guide_faqs',
  CHECKLIST_STATE: 'pum_checklist_state',
  OFFICIAL_PAPERS: 'pum_official_papers',
  PAPER_QUESTIONS: 'pum_paper_questions',
  TEACHER_ANNOTATIONS: 'pum_teacher_annotations',
  TEACHER_NOTES: 'pum_teacher_notes',
  CLASSROOM_SESSIONS: 'pum_classroom_sessions'
};

// Initialize default storage data if missing
export const initializeStorage = () => {
  if (!localStorage.getItem(KEYS.STUDENTS)) {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify([DEMO_STUDENT]));
  }
  if (!localStorage.getItem(KEYS.QUESTIONS)) {
    localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
  }
  localStorage.setItem(KEYS.SUBJECTS, JSON.stringify(INITIAL_SUBJECTS));
  localStorage.setItem(KEYS.TOPICS, JSON.stringify(INITIAL_TOPICS));
  localStorage.setItem(KEYS.CONCEPTS, JSON.stringify(INITIAL_CONCEPTS));
  if (!localStorage.getItem(KEYS.MOCK_EXAMS)) {
    localStorage.setItem(KEYS.MOCK_EXAMS, JSON.stringify(INITIAL_MOCK_EXAMS));
  }
  if (!localStorage.getItem(KEYS.ACHIEVEMENTS)) {
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(INITIAL_ACHIEVEMENTS));
  }
  if (!localStorage.getItem(KEYS.SYSTEM_SETTINGS)) {
    localStorage.setItem(KEYS.SYSTEM_SETTINGS, JSON.stringify(INITIAL_SYSTEM_SETTINGS));
  }
  if (!localStorage.getItem(KEYS.MISTAKE_BOOK)) {
    localStorage.setItem(KEYS.MISTAKE_BOOK, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.EXAM_ATTEMPTS)) {
    localStorage.setItem(KEYS.EXAM_ATTEMPTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.GUIDE_SOURCES)) {
    localStorage.setItem(KEYS.GUIDE_SOURCES, JSON.stringify(Object.values(OfficialSourcesRepository.SOURCES)));
  }
  if (!localStorage.getItem(KEYS.GUIDE_FACTS)) {
    localStorage.setItem(KEYS.GUIDE_FACTS, JSON.stringify(VERIFIED_GUIDE_FACTS));
  }
  if (!localStorage.getItem(KEYS.GUIDE_FAQS)) {
    localStorage.setItem(KEYS.GUIDE_FAQS, JSON.stringify(VERIFIED_FAQS));
  }
  if (!localStorage.getItem(KEYS.CHECKLIST_STATE)) {
    localStorage.setItem(KEYS.CHECKLIST_STATE, JSON.stringify(VERIFIED_CHECKLIST));
  }
  localStorage.setItem(KEYS.OFFICIAL_PAPERS, JSON.stringify(INITIAL_OFFICIAL_PAPERS));
  if (!localStorage.getItem(KEYS.PAPER_QUESTIONS)) {
    localStorage.setItem(KEYS.PAPER_QUESTIONS, JSON.stringify(INITIAL_PAPER_QUESTIONS));
  }
};

// ---------------- STUDENT AUTH & OPERATIONS ----------------
export const getStudents = (): Student[] => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(KEYS.STUDENTS) || '[]');
};

export const getStudentByCredentials = (studentId: string, pin: string): Student | null => {
  const students = getStudents();
  return students.find(s => s.student_id.toUpperCase() === studentId.trim().toUpperCase() && s.pin === pin.trim()) || null;
};

export const saveStudent = (student: Student): void => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === student.id || s.student_id === student.student_id);
  if (index >= 0) {
    students[index] = student;
  } else {
    students.push(student);
  }
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
};

export const addXPToStudent = (studentId: string, amount: number): { student: Student; leveledUp: boolean } => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === studentId || s.student_id === studentId);
  if (index < 0) return { student: DEMO_STUDENT, leveledUp: false };

  const current = students[index];
  const oldLevel = current.level;
  const newXP = current.xp + amount;
  
  let newLevel = 1;
  if (newXP >= 2500) newLevel = 8;
  else if (newXP >= 1700) newLevel = 7;
  else if (newXP >= 1200) newLevel = 6;
  else if (newXP >= 800) newLevel = 5;
  else if (newXP >= 500) newLevel = 4;
  else if (newXP >= 250) newLevel = 3;
  else if (newXP >= 100) newLevel = 2;

  const updated: Student = {
    ...current,
    xp: newXP,
    level: newLevel
  };

  students[index] = updated;
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  return { student: updated, leveledUp: newLevel > oldLevel };
};

// ---------------- CONTENT & QUESTIONS ----------------
export const getSubjects = (): Subject[] => {
  initializeStorage();
  const subjects: Subject[] = JSON.parse(localStorage.getItem(KEYS.SUBJECTS) || '[]');
  const allTopics: Topic[] = JSON.parse(localStorage.getItem(KEYS.TOPICS) || '[]');
  return subjects.map(subj => ({
    ...subj,
    topics_count: allTopics.filter(t => t.subject_id === subj.id).length
  }));
};

export const getTopics = (subjectId?: string): Topic[] => {
  initializeStorage();
  let topics: Topic[] = JSON.parse(localStorage.getItem(KEYS.TOPICS) || '[]');
  
  // Migration check: Ensure topics in localStorage contain all MAT and SAT topics from INITIAL_TOPICS
  if (topics.length < INITIAL_TOPICS.length || !topics.some(t => t.id === 'topic-sat-soc-7IG3') || !topics.some(t => t.id === 'topic-sat-soc-8E1') || topics.some(t => t.id === 'topic-math-1')) {
    topics = INITIAL_TOPICS;
    localStorage.setItem(KEYS.TOPICS, JSON.stringify(topics));
  }

  return subjectId ? topics.filter(t => t.subject_id === subjectId) : topics;
};

export const getConcepts = (topicId?: string): Concept[] => {
  initializeStorage();
  let concepts: Concept[] = JSON.parse(localStorage.getItem(KEYS.CONCEPTS) || '[]');
  
  // Ensure INITIAL_CONCEPTS are present in storage
  if (concepts.length < INITIAL_CONCEPTS.length) {
    const existingIds = new Set(concepts.map(c => c.id));
    const missing = INITIAL_CONCEPTS.filter(c => !existingIds.has(c.id));
    if (missing.length > 0) {
      concepts = [...concepts, ...missing];
      localStorage.setItem(KEYS.CONCEPTS, JSON.stringify(concepts));
    }
  }

  if (!topicId) return concepts;

  const matched = concepts.filter(c => c.topic_id === topicId);
  if (matched.length > 0) return matched;

  // Fallback: If no concepts exist in storage for this topicId, construct a rich bilingual concept module on the fly
  const allTopics = getTopics();
  const currentTopic = allTopics.find(t => t.id === topicId) || {
    id: topicId,
    title_en: 'Mental Ability & Visual Reasoning',
    title_ta: 'மனத்திறன் & வரைபடப் பகுப்பாய்வு',
    description_en: 'Master pattern recognition, visual logic, and official NMMS shortcuts.',
    description_ta: 'வடிவங்கள், வரைபடங்கள் மற்றும் NMMS தேர்வின் எளிய குறுக்கு வழிகளைக் கற்றல்.',
    source_evidence: 'TN DGE Official NMMS Question Paper Pattern'
  };

  return [
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
};

export const getQuestions = (filter?: {
  subjectId?: string;
  topicId?: string;
  verificationStatus?: string;
  pyqOnly?: boolean;
  learnedOnly?: boolean;
  needsPracticeOnly?: boolean;
  priorityOnly?: boolean;
  studentId?: string;
}): Question[] => {
  initializeStorage();
  let questions: Question[] = JSON.parse(localStorage.getItem(KEYS.QUESTIONS) || '[]');

  // Auto-migration check: ensure questions in storage include all INITIAL_QUESTIONS (80+ questions)
  if (questions.length < INITIAL_QUESTIONS.length) {
    const existingIds = new Set(questions.map(q => q.id));
    const missing = INITIAL_QUESTIONS.filter(q => !existingIds.has(q.id));
    if (missing.length > 0) {
      questions = [...questions, ...missing];
      localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(questions));
    }
  }

  if (filter?.subjectId) {
    questions = questions.filter(q => q.subject_id === filter.subjectId);
  }
  if (filter?.topicId) {
    questions = questions.filter(q => q.topic_id === filter.topicId);
  }
  if (filter?.verificationStatus) {
    if (filter.verificationStatus !== 'ALL') {
      questions = questions.filter(q => q.verification_status === filter.verificationStatus);
    }
  } else {
    // Default student view: only verified or published questions
    questions = questions.filter(q => q.verification_status === 'VERIFIED' || q.verification_status === 'PUBLISHED');
  }
  if (filter?.pyqOnly) {
    questions = questions.filter(q => q.source_type === 'OFFICIAL_QUESTION_PAPER');
  }
  if (filter?.priorityOnly) {
    const topics = getTopics();
    const highPriorityTopicIds = new Set(topics.filter(t => t.priority === 'HIGH_PRIORITY').map(t => t.id));
    questions = questions.filter(q => q.topic_id && highPriorityTopicIds.has(q.topic_id));
  }
  if (filter?.learnedOnly && filter.studentId) {
    const learnedIds = getLearnedTopicIds(filter.studentId);
    if (learnedIds.length > 0) {
      const learnedSet = new Set(learnedIds);
      questions = questions.filter(q => q.topic_id && learnedSet.has(q.topic_id));
    }
  }

  return questions;
};

// ---------------- TOPIC PROGRESS & MASTERY HELPERS ----------------
export const markTopicLearned = (studentId: string, topicId: string): void => {
  const key = `pum_learned_topics_${studentId}`;
  const learned: string[] = JSON.parse(localStorage.getItem(key) || '[]');
  if (!learned.includes(topicId)) {
    learned.push(topicId);
    localStorage.setItem(key, JSON.stringify(learned));
  }
};

export const getLearnedTopicIds = (studentId: string): string[] => {
  const key = `pum_learned_topics_${studentId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const saveQuestion = (question: Question): void => {
  const questions = JSON.parse(localStorage.getItem(KEYS.QUESTIONS) || '[]');
  const index = questions.findIndex((q: Question) => q.id === question.id);
  if (index >= 0) {
    questions[index] = question;
  } else {
    questions.unshift(question);
  }
  localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(questions));
};

// ---------------- MISTAKE BOOK ----------------
export const getMistakes = (studentId: string): MistakeItem[] => {
  initializeStorage();
  const mistakes: MistakeItem[] = JSON.parse(localStorage.getItem(KEYS.MISTAKE_BOOK) || '[]');
  const questions = getQuestions({ verificationStatus: 'ALL' });
  
  return mistakes
    .filter(m => m.student_id === studentId)
    .map(m => ({
      ...m,
      question: questions.find(q => q.id === m.question_id)
    }));
};

export const recordMistake = (studentId: string, questionId: string, selectedOption: 'A' | 'B' | 'C' | 'D'): void => {
  const mistakes: MistakeItem[] = JSON.parse(localStorage.getItem(KEYS.MISTAKE_BOOK) || '[]');
  const existing = mistakes.find(m => m.student_id === studentId && m.question_id === questionId);

  if (existing) {
    existing.selected_option = selectedOption;
    existing.attempt_count += 1;
    existing.last_attempted_at = new Date().toISOString();
    existing.resolved = false;
  } else {
    mistakes.push({
      id: `mistake-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      student_id: studentId,
      question_id: questionId,
      selected_option: selectedOption,
      attempt_count: 1,
      last_attempted_at: new Date().toISOString(),
      resolved: false
    });
  }

  localStorage.setItem(KEYS.MISTAKE_BOOK, JSON.stringify(mistakes));
};

export const markMistakeResolved = (studentId: string, questionId: string): void => {
  const mistakes: MistakeItem[] = JSON.parse(localStorage.getItem(KEYS.MISTAKE_BOOK) || '[]');
  const existing = mistakes.find(m => m.student_id === studentId && m.question_id === questionId);
  if (existing) {
    existing.resolved = true;
    localStorage.setItem(KEYS.MISTAKE_BOOK, JSON.stringify(mistakes));
  }
};

// ---------------- DAILY MISSIONS ----------------
export const getDailyMission = (studentId: string): DailyMission => {
  initializeStorage();
  const today = new Date().toISOString().split('T')[0];
  const key = `${KEYS.DAILY_MISSION}_${studentId}_${today}`;
  const saved = localStorage.getItem(key);

  if (saved) {
    return JSON.parse(saved);
  }

  const newMission: DailyMission = {
    id: `mission-${studentId}-${today}`,
    student_id: studentId,
    mission_date: today,
    concepts_target: 1,
    practice_target: 10,
    revision_target: 5,
    concepts_completed: 0,
    practice_completed: 0,
    revision_completed: 0,
    is_claimed: false,
    xp_reward: 50
  };

  localStorage.setItem(key, JSON.stringify(newMission));
  return newMission;
};

export const updateDailyMissionProgress = (
  studentId: string, 
  type: 'concept' | 'practice' | 'revision', 
  count = 1
): DailyMission => {
  const mission = getDailyMission(studentId);
  if (type === 'concept') mission.concepts_completed = Math.min(mission.concepts_target, mission.concepts_completed + count);
  if (type === 'practice') mission.practice_completed = Math.min(mission.practice_target, mission.practice_completed + count);
  if (type === 'revision') mission.revision_completed = Math.min(mission.revision_target, mission.revision_completed + count);

  const today = new Date().toISOString().split('T')[0];
  const key = `${KEYS.DAILY_MISSION}_${studentId}_${today}`;
  localStorage.setItem(key, JSON.stringify(mission));
  return mission;
};

// ---------------- MOCK EXAMS & ATTEMPTS ----------------
export const getMockExams = (): MockExam[] => {
  initializeStorage();
  let mockExams: MockExam[] = JSON.parse(localStorage.getItem(KEYS.MOCK_EXAMS) || '[]');
  
  // Auto-migration: ensure mock exams reflect updated 45-question / 45-minute structure and unique question pools
  if (mockExams.length < INITIAL_MOCK_EXAMS.length || mockExams.some(e => e.total_questions !== 45 || !e.questions || e.questions.length === 0)) {
    mockExams = INITIAL_MOCK_EXAMS;
    localStorage.setItem(KEYS.MOCK_EXAMS, JSON.stringify(mockExams));
  }

  return mockExams;
};

export const getActiveMockState = (examId: string, studentId: string) => {
  const key = `pum_active_mock_${examId}_${studentId}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

export const saveActiveMockState = (examId: string, studentId: string, state: any) => {
  const key = `pum_active_mock_${examId}_${studentId}`;
  localStorage.setItem(key, JSON.stringify(state));
};

export const clearActiveMockState = (examId: string, studentId: string) => {
  const key = `pum_active_mock_${examId}_${studentId}`;
  localStorage.removeItem(key);
};

export const saveMockExam = (exam: MockExam): void => {
  initializeStorage();
  const exams = getMockExams();
  const idx = exams.findIndex(e => e.id === exam.id);
  if (idx >= 0) exams[idx] = exam;
  else exams.unshift(exam);
  localStorage.setItem(KEYS.MOCK_EXAMS, JSON.stringify(exams));
};

export const saveExamAttempt = (attempt: ExamAttempt): void => {
  initializeStorage();
  const attempts: ExamAttempt[] = JSON.parse(localStorage.getItem(KEYS.EXAM_ATTEMPTS) || '[]');
  attempts.unshift(attempt);
  localStorage.setItem(KEYS.EXAM_ATTEMPTS, JSON.stringify(attempts));
};

export const getStudentExamAttempts = (studentId: string): ExamAttempt[] => {
  initializeStorage();
  const attempts: ExamAttempt[] = JSON.parse(localStorage.getItem(KEYS.EXAM_ATTEMPTS) || '[]');
  return attempts.filter(a => a.student_id === studentId);
};

// ---------------- SYSTEM SETTINGS ----------------
export const getSystemSettings = (): SystemSettings => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(KEYS.SYSTEM_SETTINGS) || JSON.stringify(INITIAL_SYSTEM_SETTINGS));
};

export const saveSystemSettings = (settings: SystemSettings): void => {
  localStorage.setItem(KEYS.SYSTEM_SETTINGS, JSON.stringify(settings));
};

// ---------------- EXAM GUIDE MANAGEMENT ----------------
export const getGuideSources = (): OfficialSource[] => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(KEYS.GUIDE_SOURCES) || '[]');
};

export const saveGuideSource = (source: OfficialSource): void => {
  const sources = getGuideSources();
  const idx = sources.findIndex(s => s.id === source.id);
  if (idx >= 0) sources[idx] = source;
  else sources.unshift(source);
  localStorage.setItem(KEYS.GUIDE_SOURCES, JSON.stringify(sources));
};

export const getGuideFacts = (): GuideFact[] => {
  initializeStorage();
  const facts: GuideFact[] = JSON.parse(localStorage.getItem(KEYS.GUIDE_FACTS) || '[]');
  const sources = getGuideSources();
  return facts.map(f => ({
    ...f,
    source: f.source_id ? sources.find(s => s.id === f.source_id) : undefined
  }));
};

export const saveGuideFact = (fact: GuideFact): void => {
  const facts = JSON.parse(localStorage.getItem(KEYS.GUIDE_FACTS) || '[]');
  const idx = facts.findIndex((f: GuideFact) => f.id === fact.id);
  if (idx >= 0) facts[idx] = fact;
  else facts.unshift(fact);
  localStorage.setItem(KEYS.GUIDE_FACTS, JSON.stringify(facts));
};

export const getGuideFAQs = (): GuideFAQ[] => {
  initializeStorage();
  const faqs: GuideFAQ[] = JSON.parse(localStorage.getItem(KEYS.GUIDE_FAQS) || '[]');
  const sources = getGuideSources();
  return faqs.map(fq => ({
    ...fq,
    source: fq.source_id ? sources.find(s => s.id === fq.source_id) : undefined
  }));
};

export const saveGuideFAQ = (faq: GuideFAQ): void => {
  const faqs = JSON.parse(localStorage.getItem(KEYS.GUIDE_FAQS) || '[]');
  const idx = faqs.findIndex((fq: GuideFAQ) => fq.id === faq.id);
  if (idx >= 0) faqs[idx] = faq;
  else faqs.unshift(faq);
  localStorage.setItem(KEYS.GUIDE_FAQS, JSON.stringify(faqs));
};

export const getChecklistState = (): ChecklistItem[] => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(KEYS.CHECKLIST_STATE) || '[]');
};

export const toggleChecklistState = (id: string): ChecklistItem[] => {
  const items = getChecklistState();
  const updated = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
  localStorage.setItem(KEYS.CHECKLIST_STATE, JSON.stringify(updated));
  return updated;
};

// ---------------- OFFICIAL PAPERS & MENTOR CLASSROOM ----------------
export const getOfficialPapers = (filter?: { year?: number; subject_code?: string; paper_type?: string }): OfficialPaper[] => {
  initializeStorage();
  const papers: OfficialPaper[] = JSON.parse(localStorage.getItem(KEYS.OFFICIAL_PAPERS) || '[]');
  return papers.filter(p => {
    const matchYear = !filter?.year || p.year === filter.year;
    const matchSubject = !filter?.subject_code || filter.subject_code === 'ALL' || p.subject_code === filter.subject_code || p.subject_code === 'ALL';
    const matchType = !filter?.paper_type || filter.paper_type === 'ALL' || p.paper_type === filter.paper_type;
    return matchYear && matchSubject && matchType;
  });
};

export const saveOfficialPaper = (paper: OfficialPaper): void => {
  const papers = getOfficialPapers();
  const idx = papers.findIndex(p => p.id === paper.id);
  if (idx >= 0) papers[idx] = paper;
  else papers.unshift(paper);
  localStorage.setItem(KEYS.OFFICIAL_PAPERS, JSON.stringify(papers));
};

export const getPaperQuestions = (paperId: string): PaperQuestion[] => {
  initializeStorage();
  const questions: PaperQuestion[] = JSON.parse(localStorage.getItem(KEYS.PAPER_QUESTIONS) || '[]');
  return questions.filter(q => q.paper_id === paperId).sort((a, b) => a.question_number - b.question_number);
};

export const savePaperQuestion = (q: PaperQuestion): void => {
  const questions: PaperQuestion[] = JSON.parse(localStorage.getItem(KEYS.PAPER_QUESTIONS) || '[]');
  const idx = questions.findIndex(item => item.id === q.id);
  if (idx >= 0) questions[idx] = q;
  else questions.push(q);
  localStorage.setItem(KEYS.PAPER_QUESTIONS, JSON.stringify(questions));
};

export const getTeacherAnnotation = (paperQuestionId: string): TeacherAnnotation | null => {
  initializeStorage();
  const annotations: TeacherAnnotation[] = JSON.parse(localStorage.getItem(KEYS.TEACHER_ANNOTATIONS) || '[]');
  return annotations.find(a => a.paper_question_id === paperQuestionId) || null;
};

export const saveTeacherAnnotation = (annotation: TeacherAnnotation): void => {
  const annotations: TeacherAnnotation[] = JSON.parse(localStorage.getItem(KEYS.TEACHER_ANNOTATIONS) || '[]');
  const idx = annotations.findIndex(a => a.paper_question_id === annotation.paper_question_id);
  if (idx >= 0) annotations[idx] = annotation;
  else annotations.push(annotation);
  localStorage.setItem(KEYS.TEACHER_ANNOTATIONS, JSON.stringify(annotations));
};

export const getTeacherNote = (paperQuestionId: string): TeacherNote | null => {
  initializeStorage();
  const notes: TeacherNote[] = JSON.parse(localStorage.getItem(KEYS.TEACHER_NOTES) || '[]');
  return notes.find(n => n.paper_question_id === paperQuestionId) || null;
};

export const saveTeacherNote = (note: TeacherNote): void => {
  const notes: TeacherNote[] = JSON.parse(localStorage.getItem(KEYS.TEACHER_NOTES) || '[]');
  const idx = notes.findIndex(n => n.paper_question_id === note.paper_question_id);
  if (idx >= 0) notes[idx] = note;
  else notes.push(note);
  localStorage.setItem(KEYS.TEACHER_NOTES, JSON.stringify(notes));
};

export const getClassroomSessions = (): ClassroomSession[] => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(KEYS.CLASSROOM_SESSIONS) || '[]');
};

export const saveClassroomSession = (session: ClassroomSession): void => {
  const sessions = getClassroomSessions();
  const idx = sessions.findIndex(s => s.id === session.id);
  if (idx >= 0) sessions[idx] = session;
  else sessions.unshift(session);
  localStorage.setItem(KEYS.CLASSROOM_SESSIONS, JSON.stringify(sessions));
};


