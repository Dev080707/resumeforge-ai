import React from "react";
import { GeneratedResume, PersonalInfo, TemplateId } from "../types/resume";

interface Props {
  personal: PersonalInfo;
  resume: GeneratedResume;
  template: TemplateId;
}

function ContactLine({ personal }: { personal: PersonalInfo }) {
  const parts = [personal.email, personal.phone, personal.location, personal.github, personal.linkedin, personal.portfolio].filter(
    Boolean
  );
  return <p className="text-xs text-slate-500">{parts.join("  |  ")}</p>;
}

function SkillsLine({ skills }: { skills: GeneratedResume["skills"] }) {
  const all = [
    ...skills.programmingLanguages,
    ...skills.frameworks,
    ...skills.databases,
    ...skills.tools,
    ...skills.softSkills,
    ...skills.other,
  ];
  if (all.length === 0) return null;
  return <p className="text-xs text-slate-700 leading-relaxed">{all.join(" · ")}</p>;
}

function ProfessionalTemplate({ personal, resume }: Omit<Props, "template">) {
  return (
    <div id="resume-page" className="resume-page mx-auto p-10 text-slate-800 font-[Georgia,serif]">
      <div className="text-center border-b border-slate-300 pb-4 mb-5">
        <h1 className="text-2xl font-bold tracking-wide">{personal.fullName || "Your Name"}</h1>
        {personal.title && <p className="text-sm text-slate-600 mt-0.5">{personal.title}</p>}
        <div className="mt-2">
          <ContactLine personal={personal} />
        </div>
      </div>

      {resume.summary && (
        <Section title="Summary">
          <p className="text-sm leading-relaxed">{resume.summary}</p>
        </Section>
      )}

      {resume.experience.length > 0 && (
        <Section title="Experience">
          {resume.experience.map((e) => (
            <div key={e.id} className="mb-3">
              <div className="flex justify-between text-sm font-semibold">
                <span>{e.position}</span>
                <span className="text-slate-500 font-normal">{e.company}</span>
              </div>
              <ul className="list-disc list-inside text-sm mt-1 space-y-0.5">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {resume.projects.length > 0 && (
        <Section title="Projects">
          {resume.projects.map((p) => (
            <div key={p.id} className="mb-3">
              <p className="text-sm font-semibold">
                {p.name}
                {p.technologies.length > 0 && <span className="font-normal text-slate-500"> — {p.technologies.join(", ")}</span>}
              </p>
              <p className="text-sm mt-0.5">{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      {resume.education.length > 0 && (
        <Section title="Education">
          {resume.education.map((ed) => (
            <div key={ed.id} className="mb-2 flex justify-between text-sm">
              <span>
                <strong>{ed.degree}</strong>
                {ed.fieldOfStudy ? `, ${ed.fieldOfStudy}` : ""} — {ed.institution}
              </span>
              <span className="text-slate-500">
                {ed.startYear}–{ed.endYear} {ed.score ? `· ${ed.score}` : ""}
              </span>
            </div>
          ))}
        </Section>
      )}

      {(resume.skills.programmingLanguages.length > 0 ||
        resume.skills.frameworks.length > 0 ||
        resume.skills.tools.length > 0) && (
        <Section title="Skills">
          <SkillsLine skills={resume.skills} />
        </Section>
      )}

      {resume.achievements.length > 0 && (
        <Section title="Achievements">
          <ul className="list-disc list-inside text-sm space-y-0.5">
            {resume.achievements.map((a, i) => (
              <li key={i}>
                {a.title}
                {a.description ? ` — ${a.description}` : ""}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold tracking-widest uppercase text-slate-500 border-b border-slate-200 pb-1 mb-2">{title}</h2>
      {children}
    </div>
  );
}

function ModernTemplate({ personal, resume }: Omit<Props, "template">) {
  return (
    <div id="resume-page" className="resume-page mx-auto p-10 text-slate-800 font-sans">
      <div className="flex items-baseline justify-between border-b-4 border-brand-600 pb-3 mb-5">
        <div>
          <h1 className="text-3xl font-bold text-brand-700">{personal.fullName || "Your Name"}</h1>
          {personal.title && <p className="text-sm text-slate-600 mt-1">{personal.title}</p>}
        </div>
      </div>
      <ContactLine personal={personal} />
      <div className="mt-5 space-y-5">
        {resume.summary && (
          <div>
            <h2 className="text-sm font-bold text-brand-700 mb-1.5">SUMMARY</h2>
            <p className="text-sm leading-relaxed">{resume.summary}</p>
          </div>
        )}
        {resume.experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-brand-700 mb-1.5">EXPERIENCE</h2>
            {resume.experience.map((e) => (
              <div key={e.id} className="mb-3">
                <p className="text-sm font-semibold">
                  {e.position} <span className="font-normal text-slate-500">@ {e.company}</span>
                </p>
                <ul className="list-disc list-inside text-sm mt-1 space-y-0.5">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {resume.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-brand-700 mb-1.5">PROJECTS</h2>
            {resume.projects.map((p) => (
              <div key={p.id} className="mb-3">
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-sm">{p.description}</p>
                {p.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {p.technologies.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-brand-700 mb-1.5">EDUCATION</h2>
            {resume.education.map((ed) => (
              <div key={ed.id} className="text-sm mb-1.5">
                <strong>{ed.institution}</strong> — {ed.degree}, {ed.fieldOfStudy} ({ed.startYear}–{ed.endYear})
              </div>
            ))}
          </div>
        )}
        {resume.skills && (
          <div>
            <h2 className="text-sm font-bold text-brand-700 mb-1.5">SKILLS</h2>
            <SkillsLine skills={resume.skills} />
          </div>
        )}
        {resume.achievements.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-brand-700 mb-1.5">ACHIEVEMENTS</h2>
            <ul className="list-disc list-inside text-sm space-y-0.5">
              {resume.achievements.map((a, i) => (
                <li key={i}>
                  {a.title}
                  {a.description ? ` — ${a.description}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function MinimalTemplate({ personal, resume }: Omit<Props, "template">) {
  return (
    <div id="resume-page" className="resume-page mx-auto p-10 text-black font-sans">
      <h1 className="text-xl font-bold uppercase tracking-wide">{personal.fullName || "Your Name"}</h1>
      {personal.title && <p className="text-xs text-slate-600 mt-0.5">{personal.title}</p>}
      <div className="mt-1">
        <ContactLine personal={personal} />
      </div>
      <div className="mt-4 space-y-4">
        {resume.summary && <p className="text-xs leading-relaxed">{resume.summary}</p>}
        {resume.experience.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold uppercase border-b border-black pb-0.5 mb-1.5">Experience</h2>
            {resume.experience.map((e) => (
              <div key={e.id} className="mb-2">
                <p className="text-xs font-semibold">
                  {e.position}, {e.company}
                </p>
                <ul className="list-disc list-inside text-xs mt-0.5">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {resume.projects.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold uppercase border-b border-black pb-0.5 mb-1.5">Projects</h2>
            {resume.projects.map((p) => (
              <div key={p.id} className="mb-2">
                <p className="text-xs font-semibold">{p.name}</p>
                <p className="text-xs">{p.description}</p>
              </div>
            ))}
          </div>
        )}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold uppercase border-b border-black pb-0.5 mb-1.5">Education</h2>
            {resume.education.map((ed) => (
              <p key={ed.id} className="text-xs">
                {ed.degree}, {ed.fieldOfStudy} — {ed.institution} ({ed.startYear}–{ed.endYear})
              </p>
            ))}
          </div>
        )}
        {resume.skills && (
          <div>
            <h2 className="text-[11px] font-bold uppercase border-b border-black pb-0.5 mb-1.5">Skills</h2>
            <SkillsLine skills={resume.skills} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResumePreview({ personal, resume, template }: Props) {
  if (template === "modern") return <ModernTemplate personal={personal} resume={resume} />;
  if (template === "minimal") return <MinimalTemplate personal={personal} resume={resume} />;
  return <ProfessionalTemplate personal={personal} resume={resume} />;
}
