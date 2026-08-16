import { useEffect, useState } from "react";
import { Menu, Save, Sparkles, Trash2, X } from "lucide-react";
import { emptyResumeData, ResumeData } from "../types/resume";
import BuilderSidebar, { steps } from "../components/BuilderSidebar";
import PersonalStep from "../components/steps/PersonalStep";
import EducationStep from "../components/steps/EducationStep";
import ExperienceStep from "../components/steps/ExperienceStep";
import ProjectsStep from "../components/steps/ProjectsStep";
import SkillsStep from "../components/steps/SkillsStep";
import AchievementsStep from "../components/steps/AchievementsStep";
import JobDescriptionStep from "../components/steps/JobDescriptionStep";
import GenerateStep from "../components/steps/GenerateStep";
import { calculateCompletion, clearResumeFromStorage, loadResumeFromStorage, saveResumeToStorage } from "../utils/helpers";
import { demoResumeData } from "../utils/demoData";
import { useToast } from "../hooks/useToast";

export default function BuilderPage() {
  const { showToast } = useToast();
  const [active, setActive] = useState("personal");
  const [data, setData] = useState<ResumeData>(() => loadResumeFromStorage() ?? emptyResumeData);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  // Auto-save to localStorage whenever data changes.
  useEffect(() => {
    saveResumeToStorage(data);
  }, [data]);

  const update = (updater: (prev: ResumeData) => ResumeData) => setData(updater);

  const handleSave = () => {
    saveResumeToStorage(data);
    showToast("Saved locally");
  };

  const handleDemoData = () => {
    setData(demoResumeData);
    showToast("Demo data loaded");
  };

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    setData(emptyResumeData);
    clearResumeFromStorage();
    setConfirmClear(false);
    showToast("Resume cleared");
  };

  const completion = calculateCompletion(data);

  const renderStep = () => {
    switch (active) {
      case "personal":
        return <PersonalStep data={data} setData={update} />;
      case "education":
        return <EducationStep data={data} setData={update} />;
      case "experience":
        return <ExperienceStep data={data} setData={update} />;
      case "projects":
        return <ProjectsStep data={data} setData={update} />;
      case "skills":
        return <SkillsStep data={data} setData={update} />;
      case "achievements":
        return <AchievementsStep data={data} setData={update} />;
      case "jobDescription":
        return <JobDescriptionStep data={data} setData={update} />;
      case "generate":
        return <GenerateStep data={data} />;
      default:
        return null;
    }
  };

  const currentIndex = steps.findIndex((s) => s.id === active);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Resume Builder</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your progress is saved automatically in this browser.</p>
        </div>
        <button
          onClick={() => setMobileNavOpen(true)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700"
          aria-label="Open section menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={handleDemoData}
          className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-brand-200 dark:border-brand-900 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" /> Try Demo Data
        </button>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Save className="w-3.5 h-3.5" /> Save Resume
        </button>
        <button
          onClick={handleClear}
          onBlur={() => setConfirmClear(false)}
          className={`inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border transition-colors ${
            confirmClear
              ? "border-red-300 bg-red-50 text-red-700 dark:bg-red-900/20 dark:border-red-900 dark:text-red-300"
              : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" /> {confirmClear ? "Click again to confirm" : "Clear Resume"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <BuilderSidebar active={active} onSelect={setActive} completion={completion} />
        </aside>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 lg:hidden" onClick={() => setMobileNavOpen(false)}>
            <div
              className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-slate-900 p-5 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-slate-900 dark:text-white">Sections</span>
                <button onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <BuilderSidebar
                active={active}
                onSelect={(id) => {
                  setActive(id);
                  setMobileNavOpen(false);
                }}
                completion={completion}
              />
            </div>
          </div>
        )}

        <main className="min-w-0">
          {renderStep()}

          <div className="flex justify-between mt-6">
            <button
              disabled={currentIndex === 0}
              onClick={() => setActive(steps[Math.max(0, currentIndex - 1)].id)}
              className="text-sm px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Back
            </button>
            {currentIndex < steps.length - 1 && (
              <button
                onClick={() => setActive(steps[Math.min(steps.length - 1, currentIndex + 1)].id)}
                className="text-sm px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-colors"
              >
                Next: {steps[currentIndex + 1].label}
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
