import {
  GetPosts,
  registerComment,
} from "../services/posts.service.js";

export function publishComment(req, res) {
  const session = req.session;
  if (!session || !session.user)
    return res.status(400).json({ error: "Nu exista user" });

  var content = (req.body || {}).content;
  if (!(typeof content == "string") || content.trim().length == 0) {
    return res.status(400).json({ error: "Invalid content for comment" });
  }
  var postTitle = (req.body || {}).post || "";
  const post = GetPosts().find((p) => p.title == postTitle);
  if (!post || !post.file_name) {
    return res.status(400).json({ error: "Invalid psot" });
  }

  const comments = registerComment(post.file_name, content, session.user);
  res.json({
    comments,
  });
}
