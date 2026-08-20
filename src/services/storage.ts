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
  if (!localStorage.getItem(KEYS.SUBJECTS)) {
    localStorage.setItem(KEYS.SUBJECTS, JSON.stringify(INITIAL_SUBJECTS));
  }
  if (!localStorage.getItem(KEYS.TOPICS)) {
    localStorage.setItem(KEYS.TOPICS, JSON.stringify(INITIAL_TOPICS));
  }
  if (!localStorage.getItem(KEYS.CONCEPTS)) {
    localStorage.setItem(KEYS.CONCEPTS, JSON.stringify(INITIAL_CONCEPTS));
  }
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
  return JSON.parse(localStorage.getItem(KEYS.SUBJECTS) || '[]');
};

export const getTopics = (subjectId?: string): Topic[] => {
  initializeStorage();
  const topics: Topic[] = JSON.parse(localStorage.getItem(KEYS.TOPICS) || '[]');
  return subjectId ? topics.filter(t => t.subject_id === subjectId) : topics;
};

export const getConcepts = (topicId?: string): Concept[] => {
  initializeStorage();
  const concepts: Concept[] = JSON.parse(localStorage.getItem(KEYS.CONCEPTS) || '[]');
  return topicId ? concepts.filter(c => c.topic_id === topicId) : concepts;
};

export const getQuestions = (filter?: {
  subjectId?: string;
  topicId?: string;
  verificationStatus?: string;
  pyqOnly?: boolean;
}): Question[] => {
  initializeStorage();
  let questions: Question[] = JSON.parse(localStorage.getItem(KEYS.QUESTIONS) || '[]');

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

  return questions;
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
  return JSON.parse(localStorage.getItem(KEYS.MOCK_EXAMS) || '[]');
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


