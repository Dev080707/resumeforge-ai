import { NextFunction, Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Catches anything unhandled (e.g. malformed JSON body) and returns a clean
// error instead of leaking a stack trace to the client.
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong on the server. Please try again." });
}
