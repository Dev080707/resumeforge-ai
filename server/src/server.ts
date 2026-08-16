import "dotenv/config";
import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiConfigured: Boolean(process.env.GEMINI_API_KEY) });
});

app.use("/api/resume", resumeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`ResumeForge AI server running on http://localhost:${PORT}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is not set. Real AI generation will fail until it's configured in server/.env (Demo Mode will still work).");
  }
});
