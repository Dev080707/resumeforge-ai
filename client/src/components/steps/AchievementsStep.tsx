import { Plus, Trash2 } from "lucide-react";
import { AchievementEntry, ResumeData } from "../../types/resume";
import { Field, SectionCard, TextArea, TextInput } from "../FormFields";
import { generateId } from "../../utils/helpers";

const emptyEntry = (): AchievementEntry => ({
  id: generateId("ach"),
  title: "",
  date: "",
  description: "",
  category: "achievement",
});

const categoryOptions: { value: AchievementEntry["category"]; label: string }[] = [
  { value: "achievement", label: "Achievement" },
  { value: "certification", label: "Certification" },
  { value: "award", label: "Award" },
  { value: "hackathon", label: "Hackathon" },
];

export default function AchievementsStep({
  data,
  setData,
}: {
  data: ResumeData;
  setData: (updater: (prev: ResumeData) => ResumeData) => void;
}) {
  const update = <K extends keyof AchievementEntry>(id: string, field: K, value: AchievementEntry[K]) =>
    setData((prev) => ({ ...prev, achievements: prev.achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a)) }));

  const add = () => setData((prev) => ({ ...prev, achievements: [...prev.achievements, emptyEntry()] }));
  const remove = (id: string) => setData((prev) => ({ ...prev, achievements: prev.achievements.filter((a) => a.id !== id) }));

  return (
    <SectionCard title="Achievements & Certifications" subtitle="Awards, hackathon wins, certifications — anything that strengthens your profile.">
      {data.achievements.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Nothing added yet.</p>}
      <div className="space-y-6">
        {data.achievements.map((entry, idx) => (
          <div key={entry.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">Entry {idx + 1}</span>
              <button onClick={() => remove(entry.id)} aria-label="Remove entry" className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="sm:col-span-2">
                <Field label="Title">
                  <TextInput value={entry.title} onChange={(e) => update(entry.id, "title", e.target.value)} placeholder="Winner, Smart India Hackathon" />
                </Field>
              </div>
              <Field label="Date">
                <TextInput value={entry.date} onChange={(e) => update(entry.id, "date", e.target.value)} placeholder="2025" />
              </Field>
            </div>
            <Field label="Category">
              <select
                value={entry.category}
                onChange={(e) => update(entry.id, "category", e.target.value as AchievementEntry["category"])}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {categoryOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
            <div className="mt-4">
              <Field label="Description (optional)">
                <TextArea rows={2} value={entry.description} onChange={(e) => update(entry.id, "description", e.target.value)} />
              </Field>
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
        <Plus className="w-4 h-4" /> Add Entry
      </button>
    </SectionCard>
  );
}
