import { useEffect, useState } from "react";
import type { Post } from "../types/db";
import { BrowserRouter, Link } from "react-router-dom";

export default function Hero() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/get-posts", {credentials: "include"})
      .then((res) => res.json())
      .then((res) => setPosts(res.posts));
  }, []);

  return (
    <div>
      <h1>Welcome to my blog</h1>
      <p>Feel free to chat and have fun</p>

      <ul className="m-10 flex flex-wrap justify-center gap-5">
        {...posts.map((p) => (
          <li
            key={p.title}
            className="max-w-40 cursor-pointer hover:scale-110 transition"
          >
            <Link to={`/post/${p.title}`}>
              <img
                className="rounded-xl"
                src={p.picture}
                alt={p.title + " image"}
              />
              <p className="">{p.title}</p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="flex gap-2 w-fit mx-auto px-10 justify-center bg-blue-700/30 min-h-20 text-xl items-center rounded-xl">
        <p>Let's get to know you!</p>
        <Link to={"/login"}>Log in</Link>
      </section>

      <section className="flex gap-2  w-fit mx-auto px-10 mt-2 rounded-xl justify-center bg-yellow-700/30 min-h-20 text-xl items-center">
        <p>Manage your account!</p>
        <Link className="text-yellow-400" to={"/user"}>See account</Link>
      </section>
    </div>
  );
}
