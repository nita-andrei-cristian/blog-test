import { Router } from "express";
import { getUser, getUserData,getStatus } from "../controllers/user.controller.js";

const router = Router();

function protectedRoute(req, res, next) {
  if (!req.session.user) return res.sendStatus(401);
  next();
}

router.get("/user", protectedRoute, getUser);
router.get("/get-user-data", protectedRoute, getUserData);
router.get("/status", protectedRoute, getStatus);

export default router;
