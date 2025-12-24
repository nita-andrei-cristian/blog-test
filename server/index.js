import express from "express";
import session from "express-session";

import authRoutes from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";
import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 10000, // 100 requests per IP
  message: {
    message: "Too many requests, please try again later."
  }
});

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "Backend123",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(globalLimiter);

app.use(authRoutes);
app.use(postsRoutes);
app.use(userRoutes);

app.listen(3000)
