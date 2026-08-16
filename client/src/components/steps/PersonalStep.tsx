import { ResumeData } from "../../types/resume";
import { Field, SectionCard, TextInput } from "../FormFields";
import { isValidEmail, isValidUrl } from "../../utils/helpers";

export default function PersonalStep({
  data,
  setData,
}: {
  data: ResumeData;
  setData: (updater: (prev: ResumeData) => ResumeData) => void;
}) {
  const p = data.personal;
  const update = (field: keyof ResumeData["personal"], value: string) =>
    setData((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }));

  return (
    <SectionCard title="Personal Information" subtitle="How employers will identify and reach you.">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" required error={!p.fullName ? undefined : undefined}>
          <TextInput value={p.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Dev Kumar" />
        </Field>
        <Field label="Professional Title">
          <TextInput value={p.title} onChange={(e) => update("title", e.target.value)} placeholder="Software Developer" />
        </Field>
        <Field label="Email" required error={p.email && !isValidEmail(p.email) ? "Enter a valid email address." : undefined}>
          <TextInput type="email" value={p.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
        </Field>
        <Field label="Phone">
          <TextInput value={p.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" />
        </Field>
        <Field label="Location">
          <TextInput value={p.location} onChange={(e) => update("location", e.target.value)} placeholder="Bengaluru, India" />
        </Field>
        <Field label="LinkedIn URL" error={p.linkedin && !isValidUrl(p.linkedin) ? "Enter a valid URL." : undefined}>
          <TextInput value={p.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." />
        </Field>
        <Field label="GitHub URL" error={p.github && !isValidUrl(p.github) ? "Enter a valid URL." : undefined}>
          <TextInput value={p.github} onChange={(e) => update("github", e.target.value)} placeholder="https://github.com/..." />
        </Field>
        <Field label="Portfolio URL" error={p.portfolio && !isValidUrl(p.portfolio) ? "Enter a valid URL." : undefined}>
          <TextInput value={p.portfolio} onChange={(e) => update("portfolio", e.target.value)} placeholder="https://..." />
        </Field>
      </div>
    </SectionCard>
  );
}
