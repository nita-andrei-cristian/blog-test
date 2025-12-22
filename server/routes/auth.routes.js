import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controller.js";

const router = Router();

import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute
  max: 5, // 5 încercări
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Try again later."
  }
});

router.post("/login", loginLimiter, login);
router.post("/register", loginLimiter, register);
router.get("/signout", loginLimiter, logout);

export default router;
