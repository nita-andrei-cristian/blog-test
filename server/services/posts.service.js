import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import USERS from "../databases/users.js";
import VISITS from "../databases/visits.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHED_POSTS = [];

export function GetPosts() {
  if (CACHED_POSTS.length > 0) return CACHED_POSTS;

  const DIRECTORY = path.join(__dirname, "..", "..", "public", "posts");

  const files = fs.readdirSync(DIRECTORY).filter((f) => f.endsWith("json"));

  const posts = files.map((file) => {
    const content = fs.readFileSync(path.join(DIRECTORY, file), "utf-8");

    return JSON.parse(content);
  });
  CACHED_POSTS.push(...posts);

  return posts;
}

export function GetPostsByTag(tag) {
  const posts = GetPosts();
  return posts.filter((p) => p.tags.find((t) => t == tag));
}

export function RegisterVisit(user, tags) {
  if (!USERS.hasOwnProperty(user)) {
    USERS[user] = {};
  }

  if (!VISITS.hasOwnProperty(user)) VISITS[user] = {};

  console.log("User visit registered!");
  tags.forEach((tag) => {
    if (!VISITS[user].hasOwnProperty(tag)) VISITS[user][tag] = 0;
    VISITS[user][tag]++;
  });

  return { status: 200, message: "visit has been registered" };
}

export function GetUserPrefferedPosts(user) {
  console.log(VISITS);

  if (!user) {
    return GetPosts();
  }
  if (!USERS.hasOwnProperty(user)) {
    USERS[user] = {};
  }

  if (!VISITS.hasOwnProperty(user)) VISITS[user] = {};
  const tags = Object.entries(VISITS[user])
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  const posts = GetPosts();

  if (tags.length == 0) {
    console.log("User has no preffered posts");
    return posts;
  } else {
    const top3 = tags.slice(0, 3);

    const postsByTag = top3.flatMap((tag) => GetPostsByTag(tag));
    const unique = [];
    const seen = new Set();

    for (const post of postsByTag) {
      if (!seen.has(post.title)) {
        // dacă titlul este unic
        seen.add(post.title);
        unique.push(post);
      }
    }

    return unique;
  }
}

export function GetUserPreferredPosts(user) {
  if (!user) return GetPosts();
  if (!VISITS[user]) return GetPosts();

  const tags = Object.entries(VISITS[user])
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
  if (tags.length === 0) return GetPosts();

  const top3 = tags.slice(0, 3);

  const combined = top3.flatMap((tag) => GetPostsByTag(tag));
  if (combined.length === 0) return GetPosts();

  const seen = new Set();
  const unique = [];

  for (const post of combined) {
    if (!seen.has(post.title)) {
      seen.add(post.title);
      unique.push(post);
    }
  }

  return unique;
}

export function getAllPosts(req, res) {
  return res.json({ posts: GetPosts() });
}

export function getPost(req, res) {
  const { id } = req.body || {};

  const post = GetPosts().find((item) => item.title === id);

  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  const user = req.session?.user?.name;
  if (user) {
    RegisterVisit(user, post.tags || []);
  }

  return res.json({ post });
}

export function getRecommendedPosts(req, res) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(20, parseInt(req.query.limit) || 10);
  const queue = (req.query.q || "").toLowerCase();

  const start = (page - 1) * limit;
  const end = page * limit;

  const user = req.session?.user?.name;
  var results = GetUserPreferredPosts(user);

  if (queue.length > 0){
    results = results.filter(post =>
      post.title.toLowerCase().includes(queue.toLowerCase()) ||
      post.content.toLowerCase().includes(queue.toLowerCase()) ||
      post.tags.join(" ").toLowerCase().includes(queue.toLowerCase()) 
    );
  }

  return res.json({
    page,
    limit,
    total: { posts: results.length, pages: Math.ceil(results.length / limit) },
    posts: results.slice(start, end),
  });
}
