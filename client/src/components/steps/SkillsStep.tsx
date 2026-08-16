import { ResumeData, SkillsData } from "../../types/resume";
import { SectionCard, TagInput } from "../FormFields";

const categories: { key: keyof SkillsData; label: string; placeholder: string }[] = [
  { key: "programmingLanguages", label: "Programming Languages", placeholder: "C++, Python, JavaScript..." },
  { key: "frameworks", label: "Frameworks", placeholder: "React, Node.js, Django..." },
  { key: "databases", label: "Databases", placeholder: "MongoDB, MySQL, PostgreSQL..." },
  { key: "tools", label: "Tools", placeholder: "Git, Docker, Postman..." },
  { key: "softSkills", label: "Soft Skills", placeholder: "Communication, Teamwork..." },
  { key: "other", label: "Other", placeholder: "Anything else relevant..." },
];

export default function SkillsStep({
  data,
  setData,
}: {
  data: ResumeData;
  setData: (updater: (prev: ResumeData) => ResumeData) => void;
}) {
  const update = (key: keyof SkillsData, tags: string[]) =>
    setData((prev) => ({ ...prev, skills: { ...prev.skills, [key]: tags } }));

  return (
    <SectionCard title="Skills" subtitle="Add skills by category. Press Enter or comma to add each one.">
      <div className="grid sm:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.key}>
            <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{cat.label}</span>
            <TagInput tags={data.skills[cat.key]} onChange={(tags) => update(cat.key, tags)} placeholder={cat.placeholder} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
