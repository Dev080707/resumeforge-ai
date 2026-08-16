import { Plus, Trash2 } from "lucide-react";
import { EducationEntry, ResumeData } from "../../types/resume";
import { Field, SectionCard, TextArea, TextInput } from "../FormFields";
import { generateId } from "../../utils/helpers";

const emptyEntry = (): EducationEntry => ({
  id: generateId("edu"),
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startYear: "",
  endYear: "",
  score: "",
  description: "",
});

export default function EducationStep({
  data,
  setData,
}: {
  data: ResumeData;
  setData: (updater: (prev: ResumeData) => ResumeData) => void;
}) {
  const update = (id: string, field: keyof EducationEntry, value: string) =>
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));

  const add = () => setData((prev) => ({ ...prev, education: [...prev.education, emptyEntry()] }));
  const remove = (id: string) => setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));

  return (
    <SectionCard title="Education" subtitle="Add your degrees, diplomas, or relevant coursework.">
      {data.education.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">No education added yet.</p>
      )}
      <div className="space-y-6">
        {data.education.map((entry, idx) => (
          <div key={entry.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">Entry {idx + 1}</span>
              <button
                onClick={() => remove(entry.id)}
                aria-label="Remove education entry"
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Institution">
                <TextInput value={entry.institution} onChange={(e) => update(entry.id, "institution", e.target.value)} placeholder="PES University" />
              </Field>
              <Field label="Degree">
                <TextInput value={entry.degree} onChange={(e) => update(entry.id, "degree", e.target.value)} placeholder="B.Tech" />
              </Field>
              <Field label="Field of Study">
                <TextInput value={entry.fieldOfStudy} onChange={(e) => update(entry.id, "fieldOfStudy", e.target.value)} placeholder="Computer Science" />
              </Field>
              <Field label="CGPA / Percentage">
                <TextInput value={entry.score} onChange={(e) => update(entry.id, "score", e.target.value)} placeholder="8.7 CGPA" />
              </Field>
              <Field label="Start Year">
                <TextInput value={entry.startYear} onChange={(e) => update(entry.id, "startYear", e.target.value)} placeholder="2022" />
              </Field>
              <Field label="End Year">
                <TextInput value={entry.endYear} onChange={(e) => update(entry.id, "endYear", e.target.value)} placeholder="2026" />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Description (optional)">
                <TextArea rows={2} value={entry.description} onChange={(e) => update(entry.id, "description", e.target.value)} placeholder="Relevant coursework, honors, etc." />
              </Field>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={add}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        <Plus className="w-4 h-4" /> Add Education
      </button>
    </SectionCard>
  );
}
