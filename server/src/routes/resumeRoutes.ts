import { Router } from "express";
import { analyzeResume, generateResume } from "../controllers/resumeController";

const router = Router();

router.post("/generate", generateResume);
router.post("/analyze", analyzeResume);

export default router;
