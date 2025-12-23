import { Router } from "express";
import {
  getAllPosts,
  getPost,
  getRecommendedPosts,
} from "../services/posts.service.js";
import { publishComment } from "../controllers/post.controller.js";

const router = Router();

router.get("/get-posts", getRecommendedPosts);

router.post("/get-post", getPost);

router.get("/posts", getAllPosts);

router.post("/publish-comment", publishComment);

export default router;
