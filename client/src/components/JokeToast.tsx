import { useEffect, useState } from "react";
import { Smile, X } from "lucide-react";

/**
 * Shows a single message for `durationMs`, then calls onDone. Also
 * dismissible early via the close button. Purely presentational — the
 * caller owns when to show it (see GenerateStep.tsx, triggered after a
 * successful PDF download).
 */
export default function JokeToast({
  message,
  durationMs = 6000,
  onDone,
}: {
  message: string;
  durationMs?: number;
  onDone: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), durationMs - 300);
    const doneTimer = setTimeout(onDone, durationMs);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs]);

  return (
    <div
      role="status"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[calc(100%-2rem)] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-card px-4 py-3">
        <Smile className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-700 dark:text-slate-200 flex-1">{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            onDone();
          }}
          aria-label="Dismiss"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
