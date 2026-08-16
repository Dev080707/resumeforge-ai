import { useEffect, useState } from "react";

const steps = [
  "Analyzing your information",
  "Improving your professional summary",
  "Optimizing your experience",
  "Refining project descriptions",
  "Checking ATS compatibility",
  "Preparing your resume",
];

// Width (%) of each skeleton line on the mini resume card, revealed one at a
// time in step with `steps` above so the page visibly "fills in" as it loads.
const lineWidths = ["85%", "55%", "70%", "40%", "90%", "60%"];

/**
 * Creative-but-minimal loading overlay: a small resume-page card "types
 * itself out" line by line with a scanning highlight sweeping down it,
 * synced to the status text below. Purely visual — the actual result only
 * appears once the API call resolves (see GenerateStep.tsx, unchanged).
 */
export default function LoadingOverlay({ label = "Building your resume" }: { label?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i < steps.length - 1 ? i + 1 : i));
    }, 650);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <style>{`
        @keyframes rf-scan {
          0% { transform: translateY(-8%); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(108%); opacity: 0; }
        }
        @keyframes rf-line-in {
          from { width: 0%; opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes rf-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="flex flex-col items-center gap-6">
        {/* mini resume page */}
        <div className="relative w-[168px] h-[220px] rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-card overflow-hidden p-4">
          {/* scanning highlight */}
          <div
            className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-black/[0.06] dark:via-white/[0.08] to-transparent"
            style={{ animation: "rf-scan 2.1s ease-in-out infinite" }}
          />

          {/* header block */}
          <div className="h-2.5 rounded-full bg-slate-800 dark:bg-slate-200 mb-1.5" style={{ width: "70%" }} />
          <div className="h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mb-4" style={{ width: "45%" }} />

          {/* body lines, revealed progressively */}
          <div className="space-y-2">
            {lineWidths.map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
              >
                {i <= index && (
                  <div
                    className="h-full rounded-full bg-slate-400 dark:bg-slate-600"
                    style={{ width: w, animation: "rf-line-in 0.5s ease-out" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* blinking cursor at the active line */}
          <span
            className="inline-block w-1 h-1.5 bg-black dark:bg-white ml-0.5 align-middle"
            style={{ animation: "rf-blink 1s step-end infinite" }}
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-black dark:text-white">{label}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 min-h-[1rem]">{steps[index]}</p>
        </div>
      </div>
    </div>
  );
}
