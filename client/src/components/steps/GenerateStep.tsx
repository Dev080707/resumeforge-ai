import { useState } from "react";
import { Download, Pencil, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { AtsAnalysis, GeneratedResume, ResumeData, TemplateId } from "../../types/resume";
import { ApiError, analyzeResume, generateResume } from "../../services/api";
import LoadingOverlay from "../LoadingOverlay";
import ResumePreview from "../ResumePreview";
import AtsPanel from "../AtsPanel";
import { SectionCard, TextArea } from "../FormFields";
import { downloadResumeAsPdf } from "../../utils/pdf";
import { useToast } from "../../hooks/useToast";
import JokeToast from "../JokeToast";
import { getRandomJoke } from "../../utils/jokes";

const templates: { id: TemplateId; label: string }[] = [
  { id: "professional", label: "Professional" },
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
];

export default function GenerateStep({ data }: { data: ResumeData }) {
  const { showToast } = useToast();
  const [demoMode, setDemoMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [resume, setResume] = useState<GeneratedResume | null>(null);
  const [analysis, setAnalysis] = useState<AtsAnalysis | null>(null);
  const [resultDemo, setResultDemo] = useState(false);
  const [template, setTemplate] = useState<TemplateId>("professional");
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [joke, setJoke] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    setAnalysis(null);
    try {
      const res = await generateResume(data, demoMode);
      setResume(res.resume);
      setResultDemo(res.demoMode);
      showToast("Resume generated successfully");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resume) return;
    setAnalyzing(true);
    try {
      const res = await analyzeResume(data, resume, demoMode);
      setAnalysis(res.analysis);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Could not analyze the resume right now.";
      showToast(message, "error");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownload = async () => {
    if (!resume) return;
    setDownloading(true);
    try {
      const fileName = `${(data.personal.fullName || "Resume").replace(/\s+/g, "_")}_Resume.pdf`;
      await downloadResumeAsPdf(fileName);
      showToast("PDF downloaded");
      setJoke(getRandomJoke());
    } catch {
      showToast("Could not generate the PDF. Please try again.", "error");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard title="Generate with AI" subtitle="AI will write your summary and improve your experience and project descriptions from what you entered.">
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
            className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          Use Demo Mode (no API key needed — uses sample AI output for testing)
        </label>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-medium px-5 py-3 transition-colors"
        >
          <Sparkles className="w-4 h-4" /> {resume ? "Regenerate Resume" : "Generate Resume"}
        </button>
      </SectionCard>

      {loading && <LoadingOverlay />}

      {resume && (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                      template === t.id
                        ? "bg-brand-600 border-brand-600 text-white"
                        : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing((e) => !e)}
                  className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Pencil className="w-3.5 h-3.5" /> {editing ? "Done Editing" : "Edit Resume"}
                </button>
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                </button>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-60"
                >
                  <Download className="w-3.5 h-3.5" /> {downloading ? "Preparing…" : "Download PDF"}
                </button>
              </div>
            </div>

            {resultDemo && (
              <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2 mb-4">
                This resume was generated in Demo Mode using sample AI output — no live API call was made.
              </p>
            )}

            {editing ? (
              <EditPanel resume={resume} setResume={setResume} />
            ) : (
              <div className="overflow-x-auto bg-slate-200 dark:bg-slate-800 rounded-xl p-4">
                <div className="shadow-xl">
                  <ResumePreview personal={data.personal} resume={resume} template={template} />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {!analysis && (
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-brand-200 dark:border-brand-900 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 font-medium px-4 py-3 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors disabled:opacity-60"
              >
                <Wand2 className="w-4 h-4" /> {analyzing ? "Analyzing…" : "Run ATS Analysis"}
              </button>
            )}
            {analysis && <AtsPanel analysis={analysis} demoMode={demoMode} />}
          </div>
        </div>
      )}

      {joke && <JokeToast message={joke} durationMs={6000} onDone={() => setJoke(null)} />}
    </div>
  );
}

function EditPanel({
  resume,
  setResume,
}: {
  resume: GeneratedResume;
  setResume: (r: GeneratedResume) => void;
}) {
  return (
    <div className="space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
      <div>
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Summary</span>
        <TextArea
          rows={3}
          value={resume.summary}
          onChange={(e) => setResume({ ...resume, summary: e.target.value })}
        />
      </div>

      {resume.experience.map((exp, i) => (
        <div key={exp.id}>
          <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {exp.position} @ {exp.company}
          </span>
          <TextArea
            rows={3}
            value={exp.bullets.join("\n")}
            onChange={(e) => {
              const bullets = e.target.value.split("\n");
              const updated = [...resume.experience];
              updated[i] = { ...exp, bullets };
              setResume({ ...resume, experience: updated });
            }}
          />
        </div>
      ))}

      {resume.projects.map((proj, i) => (
        <div key={proj.id}>
          <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{proj.name}</span>
          <TextArea
            rows={2}
            value={proj.description}
            onChange={(e) => {
              const updated = [...resume.projects];
              updated[i] = { ...proj, description: e.target.value };
              setResume({ ...resume, projects: updated });
            }}
          />
        </div>
      ))}
    </div>
  );
}
