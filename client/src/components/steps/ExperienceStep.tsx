import { Plus, Trash2 } from "lucide-react";
import { ExperienceEntry, ResumeData } from "../../types/resume";
import { Field, SectionCard, TextInput } from "../FormFields";
import { generateId } from "../../utils/helpers";

const emptyEntry = (): ExperienceEntry => ({
  id: generateId("exp"),
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  responsibilities: [""],
});

export default function ExperienceStep({
  data,
  setData,
}: {
  data: ResumeData;
  setData: (updater: (prev: ResumeData) => ResumeData) => void;
}) {
  const update = <K extends keyof ExperienceEntry>(id: string, field: K, value: ExperienceEntry[K]) =>
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));

  const add = () => setData((prev) => ({ ...prev, experience: [...prev.experience, emptyEntry()] }));
  const remove = (id: string) => setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));

  const updateBullet = (id: string, idx: number, value: string) =>
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, responsibilities: e.responsibilities.map((r, i) => (i === idx ? value : r)) } : e
      ),
    }));
  const addBullet = (id: string) =>
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, responsibilities: [...e.responsibilities, ""] } : e)),
    }));
  const removeBullet = (id: string, idx: number) =>
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, responsibilities: e.responsibilities.filter((_, i) => i !== idx) } : e
      ),
    }));

  return (
    <SectionCard title="Experience" subtitle="Internships, jobs, or freelance work. Add nothing if this is your first role.">
      {data.experience.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">No experience added yet — that's fine for freshers.</p>}
      <div className="space-y-6">
        {data.experience.map((entry, idx) => (
          <div key={entry.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">Entry {idx + 1}</span>
              <button onClick={() => remove(entry.id)} aria-label="Remove experience entry" className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Company">
                <TextInput value={entry.company} onChange={(e) => update(entry.id, "company", e.target.value)} placeholder="BrightPath Analytics" />
              </Field>
              <Field label="Position">
                <TextInput value={entry.position} onChange={(e) => update(entry.id, "position", e.target.value)} placeholder="Software Engineering Intern" />
              </Field>
              <Field label="Location">
                <TextInput value={entry.location} onChange={(e) => update(entry.id, "location", e.target.value)} placeholder="Bengaluru, India" />
              </Field>
              <Field label="Start Date">
                <TextInput value={entry.startDate} onChange={(e) => update(entry.id, "startDate", e.target.value)} placeholder="May 2025" />
              </Field>
              <Field label="End Date">
                <TextInput
                  value={entry.currentlyWorking ? "" : entry.endDate}
                  disabled={entry.currentlyWorking}
                  onChange={(e) => update(entry.id, "endDate", e.target.value)}
                  placeholder={entry.currentlyWorking ? "Present" : "Jul 2025"}
                />
              </Field>
              <label className="flex items-center gap-2 mt-6 text-sm text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={entry.currentlyWorking}
                  onChange={(e) => update(entry.id, "currentlyWorking", e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                Currently working here
              </label>
            </div>

            <div className="mt-4">
              <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Responsibilities</span>
              <div className="space-y-2">
                {entry.responsibilities.map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <TextInput
                      value={r}
                      onChange={(e) => updateBullet(entry.id, i, e.target.value)}
                      placeholder="Built REST APIs used by the internal reporting dashboard"
                    />
                    {entry.responsibilities.length > 1 && (
                      <button onClick={() => removeBullet(entry.id, i)} aria-label="Remove bullet" className="text-slate-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => addBullet(entry.id)} className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700">
                <Plus className="w-3.5 h-3.5" /> Add bullet point
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
        <Plus className="w-4 h-4" /> Add Experience
      </button>
    </SectionCard>
  );
}
