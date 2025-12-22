import { Router } from "express";
import {
  getAllPosts,
  getPost,
  getRecommendedPosts,
} from "../services/posts.service.js";

const router = Router();

router.get("/get-posts", getRecommendedPosts);

router.post("/get-post", getPost);

router.get("/posts", getAllPosts);

export default router;
