import { ResumeData } from "../../types/resume";
import { SectionCard, TextArea } from "../FormFields";

export default function JobDescriptionStep({
  data,
  setData,
}: {
  data: ResumeData;
  setData: (updater: (prev: ResumeData) => ResumeData) => void;
}) {
  return (
    <SectionCard title="Optimize my resume for a job" subtitle="Optional — paste a job description and the AI will tailor wording and highlight relevant matches.">
      <TextArea
        rows={10}
        value={data.jobDescription ?? ""}
        onChange={(e) => setData((prev) => ({ ...prev, jobDescription: e.target.value }))}
        placeholder="Paste the job description here..."
      />
      <p className="text-xs text-slate-500 dark:text-slate-400">
        This is used to prioritize relevant wording and to calculate a job match score. It's never used to invent
        skills or experience you don't have.
      </p>
    </SectionCard>
  );
}
