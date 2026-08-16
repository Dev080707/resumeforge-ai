import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Target,
  Layers,
  Download,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Writing",
    desc: "Turn rough notes about your experience and projects into polished, professional resume content.",
  },
  {
    icon: ShieldCheck,
    title: "ATS-Friendly Formatting",
    desc: "Clean, parseable layouts designed to work well with Applicant Tracking Systems.",
  },
  {
    icon: Target,
    title: "Job Description Matching",
    desc: "Paste a job description and see how your resume aligns with what the role is asking for.",
  },
  {
    icon: Layers,
    title: "Professional Templates",
    desc: "Switch between multiple resume templates without losing any of your information.",
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    desc: "Download a print-ready, A4-formatted PDF in one click, whenever you're ready.",
  },
  {
    icon: Lightbulb,
    title: "Improvement Suggestions",
    desc: "Get an AI Resume Compatibility Score with concrete strengths and improvement areas.",
  },
];

const steps = [
  { n: "01", title: "Enter your information", desc: "Add your education, skills, projects and experience — only what's true." },
  { n: "02", title: "Let AI improve your content", desc: "AI rewrites and organizes your content into clear, professional language." },
  { n: "03", title: "Download your professional resume", desc: "Preview, tweak the wording, pick a template, and export a polished PDF." },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-900 rounded-full px-3 py-1 mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Generative AI Mini Challenge
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Build a better resume.
            <br />
            <span className="text-brand-600">Let AI do the heavy lifting.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-lg">
            Create a professional, ATS-friendly resume in minutes. Turn your experience, skills and
            projects into a resume designed to help you stand out.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium px-5 py-3 transition-colors shadow-card"
            >
              Create My Resume <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Resume mockup */}
        <div className="relative">
          <div className="absolute -inset-6 bg-brand-100 dark:bg-brand-900/20 rounded-3xl blur-2xl opacity-60" />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-card p-6 sm:p-8">
            <div className="h-3 w-32 bg-slate-800 dark:bg-white rounded mb-2" />
            <div className="h-2 w-24 bg-brand-300 rounded mb-6" />
            <div className="space-y-2 mb-5">
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-2 w-5/6 bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-2 w-4/6 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-2 w-20 bg-slate-700 dark:bg-slate-300 rounded mb-3" />
            <div className="space-y-2 mb-5">
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-2 w-3/4 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-2 w-20 bg-slate-700 dark:bg-slate-300 rounded mb-3" />
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "Python", "SQL"].map((s) => (
                <span key={s} className="text-[10px] px-2 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-900">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-slate-200 dark:border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-card">
                <div className="text-3xl font-bold text-brand-200 dark:text-brand-800 mb-4">{s.n}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-200 dark:border-slate-800 py-20 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Everything you need to apply with confidence
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-card hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Optimization explainer */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            AI Resume Optimization
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            ResumeForge AI improves the wording of your resume without changing your facts. It can refine:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Professional summary",
              "Project descriptions",
              "Experience descriptions",
              "Action verbs",
              "Clarity",
              "Keyword relevance",
            ].map((item) => (
              <span key={item} className="text-sm px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 dark:border-slate-800 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to build your resume?
          </h2>
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 transition-colors shadow-card"
          >
            Create Your Resume <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
