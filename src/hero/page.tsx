import { useEffect, useState } from "react";
import type { Post } from "../types/db";
import { BrowserRouter, Link } from "react-router-dom";

export default function Hero() {
  const [postData, setPostData] = useState<{
    posts: Post[];
    total: { pages: number };
  }>({ posts: [], total: { pages: 10 } });
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch(`/api/get-posts?page=${page}&limit=8&q=${search}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setPostData(res));
  }, [page, search]);

  return (
    <div>
      <h1>Welcome to my blog</h1>
      <p>Feel free to chat and have fun</p>

      <section className="m-10">
        <div className="flex justify-center mt-4 text-lg gap-5 items-center">
          <p>Pages</p>
          {...Array.from({ length: postData.total.pages }).map((_, index) => (
            <button
              onClick={() => setPage(index + 1)}
              className="bg-white/20 rounded-lg px-5 cursor-pointer"
              style={{ opacity: index + 1 == page ? 1 : 0.3 }}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <form
          onSubmit={(ev:any) => {
            ev.preventDefault();
            const formData = new FormData(ev.target);
            const data = Object.fromEntries(formData.entries()) as any;

            setSearch(data.search);
          }}
          className="flex justify-center my-10 gap-3"
        >
          <input
            type="text"
            className="rounded-3xl p-2"
            name="search"
            placeholder="Search..."
          />
          <button className="rounded-3xl p-2 px-5" type="submit">
            Send
          </button>
        </form>
        <ul className="flex flex-wrap justify-center gap-5 w-2/3 mx-auto">
          {...postData.posts.map((p) => (
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
      </section>

      <section className="flex gap-2 w-fit mx-auto px-10 justify-center bg-blue-700/30 min-h-20 text-xl items-center rounded-xl">
        <p>Let's get to know you!</p>
        <Link to={"/login"}>Log in</Link>
      </section>

      <section className="flex gap-2  w-fit mx-auto px-10 mt-2 rounded-xl justify-center bg-yellow-700/30 min-h-20 text-xl items-center">
        <p>Manage your account!</p>
        <Link className="text-yellow-400" to={"/user"}>
          See account
        </Link>
      </section>
    </div>
  );
}
