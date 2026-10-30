import express from "express";
import { chatWithAssistant } from "../controllers/aiController.js";

export const aiRouter = express.Router();

const requestWindows = new Map();
const requestLimit = 10;
const windowDuration = 60 * 1000;
let lastCleanup = Date.now();

aiRouter.post("/chat", (req, res, next) => {
  const now = Date.now();
  if (now - lastCleanup >= windowDuration) {
    for (const [ip, window] of requestWindows) {
      if (window.resetAt <= now) requestWindows.delete(ip);
    }
    lastCleanup = now;
  }

  const ip = req.ip;
  let window = requestWindows.get(ip);
  if (!window || window.resetAt <= now) {
    window = { count: 0, resetAt: now + windowDuration };
    requestWindows.set(ip, window);
  }

  if (window.count >= requestLimit) {
    return res.status(429).json({
      success: false,
      message: "Too many chat requests. Please wait a minute and try again.",
    });
  }

  window.count += 1;
  return chatWithAssistant(req, res, next);
});
