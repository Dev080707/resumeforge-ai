import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import BuilderPage from "./pages/BuilderPage";
import { ToastProvider } from "./hooks/useToast";
import InteractiveBackground from "./components/InteractiveBackground";

export default function App() {
  return (
    <ToastProvider>
      <InteractiveBackground />
      <div className="min-h-screen bg-transparent transition-colors">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route
            path="*"
            element={
              <div className="max-w-xl mx-auto text-center py-24">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Page not found</h1>
                <p className="text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist.</p>
              </div>
            }
          />
        </Routes>
        <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-400">
          ResumeForge AI — Built for the Generative AI Mini Challenge.
        </footer>
      </div>
    </ToastProvider>
  );
}
