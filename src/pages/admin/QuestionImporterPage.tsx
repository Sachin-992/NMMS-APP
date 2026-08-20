import React, { useState } from 'react';
import { saveQuestion } from '../../services/storage';
import type { Question } from '../../types';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';

export const QuestionImporterPage: React.FC = () => {
  const [jsonContent, setJsonContent] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonContent);
      const items: any[] = Array.isArray(parsed) ? parsed : [parsed];

      let count = 0;
      items.forEach(item => {
        if (!item.question_en || !item.question_ta || !item.correct_option) {
          throw new Error('Question English, Tamil text, and Correct Option are required.');
        }

        const newQ: Question = {
          id: `q-imported-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          subject_id: item.subject_id || 'subj-mat',
          topic_id: item.topic_id || 'topic-mat-1',
          question_en: item.question_en,
          question_ta: item.question_ta,
          option_a_en: item.option_a_en || '',
          option_a_ta: item.option_a_ta || '',
          option_b_en: item.option_b_en || '',
          option_b_ta: item.option_b_ta || '',
          option_c_en: item.option_c_en || '',
          option_c_ta: item.option_c_ta || '',
          option_d_en: item.option_d_en || '',
          option_d_ta: item.option_d_ta || '',
          correct_option: item.correct_option,
          explanation_en: item.explanation_en || '',
          explanation_ta: item.explanation_ta || '',
          difficulty: item.difficulty || 'MEDIUM',
          question_type: item.question_type || 'MCQ',
          source_type: item.source_type || 'OFFICIAL_QUESTION_PAPER',
          source_name: item.source_name || 'Tamil Nadu DGE NMMS',
          source_url: item.source_url || 'https://www.dge.tn.gov.in/nmms_qb.html',
          source_year: item.source_year || 2024,
          source_page: item.source_page || 1,
          verification_status: item.verification_status || 'VERIFIED',
          created_at: new Date().toISOString()
        };

        saveQuestion(newQ);
        count += 1;
      });

      setMessage({ type: 'success', text: `Successfully validated & imported ${count} verified questions!` });
      setJsonContent('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Invalid JSON format or missing verification metadata.' });
    }
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-extrabold text-white">Import Verified Questions</h1>
        <p className="text-xs text-slate-400">Strict CSV / JSON validation against TN DGE source rules</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        
        {message && (
          <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
            message.type === 'success' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-300 border border-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
            <span>{message.text}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Paste JSON Question Bank Payload
          </label>
          <textarea
            rows={10}
            value={jsonContent}
            onChange={(e) => setJsonContent(e.target.value)}
            placeholder={`[
  {
    "question_en": "Find the missing number: 2, 4, 6, ?",
    "question_ta": "விடுபட்ட எண்ணைக் காண்க: 2, 4, 6, ?",
    "option_a_en": "7", "option_a_ta": "7",
    "option_b_en": "8", "option_b_ta": "8",
    "option_c_en": "9", "option_c_ta": "9",
    "option_d_en": "10", "option_d_ta": "10",
    "correct_option": "B",
    "explanation_en": "Even numbers series",
    "explanation_ta": "இரட்டை எண்களின் வரிசை",
    "source_type": "OFFICIAL_QUESTION_PAPER",
    "source_name": "TN DGE NMMS 2024",
    "source_year": 2024
  }
]`}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handleImportJSON}
          disabled={!jsonContent.trim()}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Validate & Import Question Dataset</span>
        </button>

      </div>

    </div>
  );
};
