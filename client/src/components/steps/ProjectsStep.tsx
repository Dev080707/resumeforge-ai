import { Plus, Trash2 } from "lucide-react";
import { ProjectEntry, ResumeData } from "../../types/resume";
import { Field, SectionCard, TagInput, TextArea, TextInput } from "../FormFields";
import { generateId } from "../../utils/helpers";

const emptyEntry = (): ProjectEntry => ({
  id: generateId("proj"),
  name: "",
  description: "",
  technologies: [],
  githubUrl: "",
  liveUrl: "",
});

export default function ProjectsStep({
  data,
  setData,
}: {
  data: ResumeData;
  setData: (updater: (prev: ResumeData) => ResumeData) => void;
}) {
  const update = <K extends keyof ProjectEntry>(id: string, field: K, value: ProjectEntry[K]) =>
    setData((prev) => ({ ...prev, projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)) }));

  const add = () => setData((prev) => ({ ...prev, projects: [...prev.projects, emptyEntry()] }));
  const remove = (id: string) => setData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));

  return (
    <SectionCard title="Projects" subtitle="Academic, personal, or hackathon projects. The AI can help sharpen these descriptions.">
      {data.projects.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">No projects added yet.</p>}
      <div className="space-y-6">
        {data.projects.map((entry, idx) => (
          <div key={entry.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">Project {idx + 1}</span>
              <button onClick={() => remove(entry.id)} aria-label="Remove project" className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <Field label="Project Name">
                <TextInput value={entry.name} onChange={(e) => update(entry.id, "name", e.target.value)} placeholder="College Marketplace" />
              </Field>
              <Field label="GitHub URL">
                <TextInput value={entry.githubUrl} onChange={(e) => update(entry.id, "githubUrl", e.target.value)} placeholder="https://github.com/..." />
              </Field>
              <Field label="Live URL">
                <TextInput value={entry.liveUrl} onChange={(e) => update(entry.id, "liveUrl", e.target.value)} placeholder="https://..." />
              </Field>
            </div>
            <Field label="Description">
              <TextArea rows={3} value={entry.description} onChange={(e) => update(entry.id, "description", e.target.value)} placeholder="What did you build and why?" />
            </Field>
            <div className="mt-4">
              <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Technologies</span>
              <TagInput tags={entry.technologies} onChange={(tags) => update(entry.id, "technologies", tags)} placeholder="React, Node.js, MongoDB..." />
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
        <Plus className="w-4 h-4" /> Add Project
      </button>
    </SectionCard>
  );
}
