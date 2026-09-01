import type { Question } from '../types';

/**
 * PUM NMMS CHAMPION — QUESTION FINGERPRINT & DUPLICATE DETECTOR
 * Prevents duplicate questions across Practice, Mock Exams, and Admin Imports.
 */

/**
 * Normalizes text by removing non-alphanumeric characters, extra spaces, numbers, and converting to lowercase.
 */
export const normalizeText = (text?: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\d+/g, '#') // Replace numbers with placeholder to detect number-only tweaks
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Generates a unique semantic fingerprint for a question object based on normalized English & Tamil text and options.
 */
export const getQuestionFingerprint = (q: Partial<Question>): string => {
  const normEn = normalizeText(q.question_en);
  const normTa = normalizeText(q.question_ta);
  const normOptA = normalizeText(q.option_a_en);
  const normOptB = normalizeText(q.option_b_en);
  const normOptC = normalizeText(q.option_c_en);
  const normOptD = normalizeText(q.option_d_en);

  // Sort normalized options to detect option shuffling
  const sortedOptions = [normOptA, normOptB, normOptC, normOptD].sort().join('|');

  return `${normEn}:::${normTa}:::${sortedOptions}`;
};

/**
 * Computes Jaccard Similarity between two word sets.
 */
export const computeTextSimilarity = (text1: string, text2: string): number => {
  if (!text1 || !text2) return 0;
  if (text1 === text2) return 1.0;

  const set1 = new Set(text1.split(' '));
  const set2 = new Set(text2.split(' '));

  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return union.size === 0 ? 0 : intersection.size / union.size;
};

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  reason?: string;
  matchedQuestionId?: string;
  similarityScore?: number;
}

/**
 * Checks if a candidate question is a duplicate of any existing question in a question bank.
 */
export const isDuplicateQuestion = (
  candidate: Partial<Question>,
  existingQuestions: Question[],
  similarityThreshold: number = 0.85
): DuplicateCheckResult => {
  const candidateFingerprint = getQuestionFingerprint(candidate);
  const candidateNormEn = normalizeText(candidate.question_en);

  for (const existing of existingQuestions) {
    if (candidate.id && existing.id === candidate.id) continue;

    // 1. Exact Fingerprint Match
    const existingFingerprint = getQuestionFingerprint(existing);
    if (candidateFingerprint === existingFingerprint) {
      return {
        isDuplicate: true,
        reason: 'Exact fingerprint match (identical question text and options)',
        matchedQuestionId: existing.id,
        similarityScore: 1.0
      };
    }

    // 2. High Text Similarity Check
    const existingNormEn = normalizeText(existing.question_en);
    const similarity = computeTextSimilarity(candidateNormEn, existingNormEn);

    if (similarity >= similarityThreshold) {
      return {
        isDuplicate: true,
        reason: `High wording similarity (${Math.round(similarity * 100)}% match with existing question)`,
        matchedQuestionId: existing.id,
        similarityScore: similarity
      };
    }
  }

  return { isDuplicate: false };
};
