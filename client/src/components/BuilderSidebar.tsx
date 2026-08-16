import { Check } from "lucide-react";

export interface StepDef {
  id: string;
  label: string;
  num: string;
}

export const steps: StepDef[] = [
  { id: "personal", num: "01", label: "Personal" },
  { id: "education", num: "02", label: "Education" },
  { id: "experience", num: "03", label: "Experience" },
  { id: "projects", num: "04", label: "Projects" },
  { id: "skills", num: "05", label: "Skills" },
  { id: "achievements", num: "06", label: "Achievements" },
  { id: "jobDescription", num: "07", label: "Job Description" },
  { id: "generate", num: "08", label: "Generate" },
];

export default function BuilderSidebar({
  active,
  onSelect,
  completion,
}: {
  active: string;
  onSelect: (id: string) => void;
  completion: number;
}) {
  return (
    <nav className="space-y-6">
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span>Resume Completion</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">{completion}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <ul className="space-y-1">
        {steps.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => onSelect(s.id)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active === s.id
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span className="text-xs text-slate-400 w-5">{s.num}</span>
              {s.label}
              {active === s.id && <Check className="w-3.5 h-3.5 ml-auto" />}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
