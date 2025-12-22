import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Post } from "../types/db";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    fetch("/api/get-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials : "include",
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((res) => {
        setPost(res.post);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <h1>{post?.title}</h1>

      <nav>
        <Link to="/">Back to home</Link>
      </nav>

      <img src={post?.picture} className="rounded-2xl max-h-[33vh] w-full object-cover mx-auto" />
      <div dangerouslySetInnerHTML={{__html : post?.content || ''}}  className="flex flex-col gap-2 text-lg w-2/3 mx-auto text-left"/>
    </section>
  );
}
