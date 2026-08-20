import { supabase, isSupabaseConfigured } from './supabase';
import * as localStorageService from './storage';
import type { 
  Student, Subject, Topic, Concept, Question, 
  MistakeItem, DailyMission, MockExam, ExamAttempt, SystemSettings 
} from '../types';

// ===================================================================
// DUAL HYBRID SERVICE LAYER (SUPABASE PRODUCTION + STORAGE FALLBACK)
// ===================================================================

// ---------------- STUDENT AUTH & OPERATIONS ----------------
export const getStudents = async (): Promise<Student[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('students').select('*');
      if (!error && data && data.length > 0) return data as Student[];
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to storage:', e);
    }
  }
  return localStorageService.getStudents();
};

export const getStudentByCredentials = async (studentId: string, pin: string): Promise<Student | null> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('student_id', studentId.trim().toUpperCase())
        .eq('pin', pin.trim())
        .single();
      
      if (!error && data) return data as Student;
    } catch (e) {
      console.warn('Supabase auth failed, trying storage fallback:', e);
    }
  }
  return localStorageService.getStudentByCredentials(studentId, pin);
};

export const saveStudent = async (student: Student): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('students').upsert([student]);
    } catch (e) {
      console.error('Supabase student save failed:', e);
    }
  }
  localStorageService.saveStudent(student);
};

// ---------------- CONTENT: SUBJECTS, TOPICS, CONCEPTS ----------------
export const getSubjects = async (): Promise<Subject[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('subjects').select('*').order('order_index');
      if (!error && data && data.length > 0) return data as Subject[];
    } catch (e) {
      console.warn('Supabase subjects fetch failed:', e);
    }
  }
  return localStorageService.getSubjects();
};

export const getTopics = async (subjectId?: string): Promise<Topic[]> => {
  if (isSupabaseConfigured()) {
    try {
      let query = supabase.from('topics').select('*').order('order_index');
      if (subjectId) query = query.eq('subject_id', subjectId);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as Topic[];
    } catch (e) {
      console.warn('Supabase topics fetch failed:', e);
    }
  }
  return localStorageService.getTopics(subjectId);
};

export const getConcepts = async (topicId?: string): Promise<Concept[]> => {
  if (isSupabaseConfigured()) {
    try {
      let query = supabase.from('concepts').select('*').order('order_index');
      if (topicId) query = query.eq('topic_id', topicId);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as Concept[];
    } catch (e) {
      console.warn('Supabase concepts fetch failed:', e);
    }
  }
  return localStorageService.getConcepts(topicId);
};

// ---------------- QUESTION BANK & VERIFICATION ----------------
export const getQuestions = async (filter?: {
  subjectId?: string;
  topicId?: string;
  verificationStatus?: string;
  pyqOnly?: boolean;
}): Promise<Question[]> => {
  if (isSupabaseConfigured()) {
    try {
      let query = supabase.from('questions').select('*');

      if (filter?.subjectId && filter.subjectId !== 'ALL') {
        query = query.eq('subject_id', filter.subjectId);
      }
      if (filter?.topicId) {
        query = query.eq('topic_id', filter.topicId);
      }
      if (filter?.verificationStatus && filter.verificationStatus !== 'ALL') {
        query = query.eq('verification_status', filter.verificationStatus);
      } else if (!filter?.verificationStatus) {
        query = query.in('verification_status', ['VERIFIED', 'PUBLISHED']);
      }
      if (filter?.pyqOnly) {
        query = query.eq('source_type', 'OFFICIAL_QUESTION_PAPER');
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as Question[];
    } catch (e) {
      console.warn('Supabase questions fetch failed:', e);
    }
  }
  return localStorageService.getQuestions(filter);
};

export const saveQuestion = async (question: Question): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('questions').upsert([question]);
    } catch (e) {
      console.error('Supabase question save failed:', e);
    }
  }
  localStorageService.saveQuestion(question);
};

// ---------------- MISTAKE BOOK ----------------
export const getMistakes = async (studentId: string): Promise<MistakeItem[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('mistake_book')
        .select('*, questions(*)')
        .eq('student_id', studentId);
      
      if (!error && data && data.length > 0) return data as MistakeItem[];
    } catch (e) {
      console.warn('Supabase mistakes fetch failed:', e);
    }
  }
  return localStorageService.getMistakes(studentId);
};

export const recordMistake = async (studentId: string, questionId: string, selectedOption: 'A' | 'B' | 'C' | 'D'): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('mistake_book').upsert([{
        student_id: studentId,
        question_id: questionId,
        selected_option: selectedOption,
        last_attempted_at: new Date().toISOString(),
        resolved: false
      }], { onConflict: 'student_id,question_id' });
    } catch (e) {
      console.error('Supabase record mistake failed:', e);
    }
  }
  localStorageService.recordMistake(studentId, questionId, selectedOption);
};

export const markMistakeResolved = async (studentId: string, questionId: string): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from('mistake_book')
        .update({ resolved: true })
        .eq('student_id', studentId)
        .eq('question_id', questionId);
    } catch (e) {
      console.error('Supabase mark resolved failed:', e);
    }
  }
  localStorageService.markMistakeResolved(studentId, questionId);
};

// ---------------- DAILY MISSIONS ----------------
export const getDailyMission = async (studentId: string): Promise<DailyMission> => {
  if (isSupabaseConfigured()) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('daily_missions')
        .select('*')
        .eq('student_id', studentId)
        .eq('mission_date', today)
        .single();
      
      if (!error && data) return data as DailyMission;
    } catch (e) {
      console.warn('Supabase mission fetch failed:', e);
    }
  }
  return localStorageService.getDailyMission(studentId);
};

// ---------------- MOCK EXAMS ----------------
export const getMockExams = async (): Promise<MockExam[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('mock_exams').select('*').eq('status', 'PUBLISHED');
      if (!error && data && data.length > 0) return data as MockExam[];
    } catch (e) {
      console.warn('Supabase mock exams fetch failed:', e);
    }
  }
  return localStorageService.getMockExams();
};

export const saveExamAttempt = async (attempt: ExamAttempt): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('exam_attempts').insert([attempt]);
    } catch (e) {
      console.error('Supabase save attempt failed:', e);
    }
  }
  localStorageService.saveExamAttempt(attempt);
};

// ---------------- SYSTEM SETTINGS ----------------
export const getSystemSettings = async (): Promise<SystemSettings> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'exam_info')
        .single();
      
      if (!error && data && data.value) return data.value as SystemSettings;
    } catch (e) {
      console.warn('Supabase settings fetch failed:', e);
    }
  }
  return localStorageService.getSystemSettings();
};

export const saveSystemSettings = async (settings: SystemSettings): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from('system_settings')
        .upsert([{ key: 'exam_info', value: settings }]);
    } catch (e) {
      console.error('Supabase settings save failed:', e);
    }
  }
  localStorageService.saveSystemSettings(settings);
};
