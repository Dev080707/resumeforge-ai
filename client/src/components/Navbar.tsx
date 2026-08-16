import { Link, useLocation } from "react-router-dom";
import { FileText, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";

export default function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <span className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <FileText className="w-4.5 h-4.5 text-white" />
          </span>
          ResumeForge <span className="text-brand-600">AI</span>
        </Link>

        <div className="flex items-center gap-3">
          {location.pathname !== "/builder" && (
            <Link
              to="/builder"
              className="hidden sm:inline-flex items-center rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              Create Resume
            </Link>
          )}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
