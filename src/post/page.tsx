import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Post } from "../types/db";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/api/get-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((res) => {
        setPost(res.post);
        if (res.post.comments) setComments(res.post.comments);
      })
      .catch((err) => console.error(err));
  }, []);

  const postComment = (ev: any) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const data = Object.fromEntries(formData.entries());

    fetch("/api/publish-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ post: post?.title || " ", ...data }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.comments) setComments(res.comments);
      })
      .catch((err) => console.error(err));

    ev.target.reset();
  };

  return (
    <section className="flex flex-col gap-5 w-2/3 mx-auto">
      <h1>{post?.title}</h1>

      <nav>
        <Link to="/">Back to home</Link>
      </nav>

      <img
        src={post?.picture}
        className="rounded-2xl max-h-[33vh] w-full object-cover mx-auto"
      />
      <div
        dangerouslySetInnerHTML={{ __html: post?.content || "" }}
        className="flex flex-col gap-2 text-lg mx-auto text-left"
      />

      <form onSubmit={postComment} className="w-full flex gap-4">
        <input
          type="text"
          className="w-full rounded-xl px-3"
          placeholder="Wow this was a good read!"
          name="content"
        />
        <button type="submit">Send</button>
      </form>

      <ul className="flex flex-col gap-2">
        {...comments.map((comment: any, i) => (
          <div
            key={i}
            className="flex bg-white/5 p-3 rounded-xl justify-between"
          >
            <p>{comment.content}</p>
            <p>
              <span className="bold">~{comment.user.name} </span>
              <span className="ml-2"> at {comment.date}</span>
            </p>
          </div>
        ))}
      </ul>
    </section>
  );
}
