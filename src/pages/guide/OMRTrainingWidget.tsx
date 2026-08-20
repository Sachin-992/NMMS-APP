import React from 'react';
import { CheckCircle2, XCircle, Info, ShieldAlert } from 'lucide-react';
import { EXAM_GUIDE_DATA } from '../../data/nmms_official_research';

export const OMRTrainingWidget: React.FC = () => {
  return (
    <div className="space-y-6">

      {/* ── PROMINENT OMR WARNING CARD ── */}
      <div className="bg-red-900/90 text-white rounded-3xl p-6 shadow-xl border border-red-700 space-y-3">
        <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-5 h-5 text-amber-300 shrink-0" />
          <span>IMPORTANT OMR WARNING / முக்கியமான OMR எச்சரிக்கை</span>
        </div>

        <h3 className="text-base sm:text-lg font-black leading-snug">
          "Your answer is recorded on the OMR sheet."
        </h3>
        <p className="text-xs sm:text-sm font-bold text-red-100 font-tamil leading-relaxed">
          "உங்கள் பதில் OMR விடைத்தாளில்தான் பதிவு செய்யப்படுகிறது."
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-red-100 pt-2 border-t border-red-800">
          <li className="flex items-start gap-1.5">
            <span className="text-amber-300 font-bold">•</span>
            <span>Do NOT write answers only in the question booklet.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-300 font-bold">•</span>
            <span>Do NOT use tick marks (✓) or cross marks (✕) on OMR.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-300 font-bold">•</span>
            <span>Darken the matching circle completely with a Black Ballpoint Pen.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-300 font-bold">•</span>
            <span>Follow all invigilator instructions before shading.</span>
          </li>
        </ul>
      </div>

      {/* ── VISUAL CORRECT VS INCORRECT DEMONSTRATION ── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>How to Mark Answers on the OMR Sheet / விடையைக் குறிக்கும் முறை</span>
          </h3>
          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Black Ballpoint Pen ONLY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* CORRECT EXAMPLE */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                CORRECT METHOD / சரியான முறை
              </span>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">VALID ●</span>
            </div>

            <div className="flex items-center justify-center gap-4 py-3 bg-white rounded-xl border border-emerald-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                B
              </div>
              <span className="text-xs font-bold text-emerald-900">Fully Darkened Circle</span>
            </div>

            <p className="text-[11px] font-semibold text-emerald-800 leading-tight">
              Completely fill the circle using a Black Ballpoint Pen. The optical scanner reads full dark circles accurately.
            </p>
          </div>

          {/* INCORRECT EXAMPLES */}
          <div className="p-4 bg-red-50 rounded-2xl border border-red-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-red-900">
              <span className="flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-red-600" />
                INCORRECT METHODS / தவறான முறைகள்
              </span>
              <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full">INVALID ✕</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 bg-white rounded-xl border border-red-200 text-center text-[11px] font-bold text-slate-700">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border-2 border-red-500 text-red-600 flex items-center justify-center font-black">✓</div>
                <span className="text-[10px] text-red-700 mt-1">Tick Mark</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border-2 border-red-500 text-red-600 flex items-center justify-center font-black">✕</div>
                <span className="text-[10px] text-red-700 mt-1">Cross Mark</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border-2 border-slate-400 overflow-hidden relative">
                  <div className="w-full h-1/2 bg-slate-900"></div>
                </div>
                <span className="text-[10px] text-red-700 mt-1">Half Filled</span>
              </div>
            </div>

            <p className="text-[11px] font-semibold text-red-800 leading-tight">
              Do NOT use tick marks, cross marks, partial shading, or stray marks outside the circle.
            </p>
          </div>

        </div>
      </div>

      {/* ── QUESTION BOOKLET VS OMR COMPARISON TABLE ── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Question Booklet vs OMR Answer Sheet Comparison</span>
          </h3>
          <span className="text-[10px] font-bold text-slate-500">Official Exam Rules</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                <th className="p-3 rounded-l-xl">Feature / காரணி</th>
                <th className="p-3 bg-blue-50 text-blue-900">QUESTION BOOKLET (வினாத்தாள்)</th>
                <th className="p-3 bg-purple-50 text-purple-900 rounded-r-xl">OMR ANSWER SHEET (விடைத்தாள்)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {EXAM_GUIDE_DATA.questionBookletVsOmr.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">
                    <div>{row.feature_en}</div>
                    <div className="text-[10px] text-slate-500 font-tamil">{row.feature_ta}</div>
                  </td>
                  <td className="p-3 bg-blue-50/50 text-blue-950 font-semibold">
                    <div>{row.booklet_en}</div>
                    <div className="text-[10px] text-blue-700 font-tamil">{row.booklet_ta}</div>
                  </td>
                  <td className="p-3 bg-purple-50/50 text-purple-950 font-bold">
                    <div>{row.omr_en}</div>
                    <div className="text-[10px] text-purple-700 font-tamil">{row.omr_ta}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ROUGH WORK RULES CARD ── */}
      <div className="bg-amber-50 border border-amber-300 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider bg-amber-200 px-2 py-0.5 rounded-md">
            Where Can I Do Rough Work? / கணக்கீடுகள் எங்கே செய்ய வேண்டும்?
          </span>
          <h4 className="font-extrabold text-amber-950 text-sm">
            Rough work is permitted ONLY in the space provided inside the Question Booklet.
          </h4>
          <p className="text-xs font-semibold text-amber-900 font-tamil">
            கணக்கீடுப் பணிகளை வினாப் புத்தகத்தில் ஒதுக்கப்பட்ட இடத்தில் மட்டுமே செய்ய வேண்டும். OMR தாளில் எதையும் எழுதக்கூடாது.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-extrabold flex items-center gap-1">
            <span>Booklet</span>
            <span className="text-emerald-700 font-bold">✓</span>
          </div>
          <div className="px-3 py-1.5 bg-red-100 border border-red-300 text-red-900 rounded-xl text-xs font-extrabold flex items-center gap-1">
            <span>OMR Sheet</span>
            <span className="text-red-700 font-bold">✕</span>
          </div>
        </div>
      </div>

    </div>
  );
};
