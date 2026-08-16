import { AtsAnalysis } from "../types/resume";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

export default function AtsPanel({ analysis, demoMode }: { analysis: AtsAnalysis; demoMode: boolean }) {
  const scoreColor = analysis.score >= 80 ? "text-emerald-600" : analysis.score >= 60 ? "text-amber-600" : "text-red-600";

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-card space-y-6">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            AI Resume Compatibility Score
          </h3>
          {demoMode && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900">
              Demo Mode
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-bold ${scoreColor}`}>{analysis.score}</span>
          <span className="text-slate-400 text-lg">/ 100</span>
        </div>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
          <Info className="w-3.5 h-3.5" /> An AI-generated estimate, not an official ATS certification.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Strengths</h4>
        <ul className="space-y-1.5">
          {analysis.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {s}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Improvements</h4>
        <ul className="space-y-1.5">
          {analysis.improvements.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> {s}
            </li>
          ))}
        </ul>
      </div>

      {analysis.jobMatch && (
        <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
          <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Job Match</h4>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-3xl font-bold text-brand-600">{analysis.jobMatch.matchScore}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full" style={{ width: `${analysis.jobMatch.matchScore}%` }} />
          </div>

          {analysis.jobMatch.matchingSkills.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Matching Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.jobMatch.matchingSkills.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {analysis.jobMatch.missingSkills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Missing / Not Mentioned</p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.jobMatch.missingSkills.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2 italic">Only add a skill if you genuinely have the experience.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
