import { useEffect, useState } from "react";
import type { User } from "../types/db";
import { Link, useNavigate } from "react-router-dom";

function UserDashboard({ user }: { user: User }) {
  const navigate = useNavigate();

  const signOut = () => {
    fetch("/api/signout");
    navigate("/");
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("/api/get-user-data", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setUserData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      {userData ? (
        <section className="m-2">
          {Object.keys((userData as any).visits).map((key, value) => (
            <div className="flex justify-center gap-3">
              <p>{key}</p>
              <p className="text-yellow-500" >{value}</p>
            </div>
          ))}
        </section>
      ) : (
        <p>No data found :(</p>
      )}
      <button
        className="bg-red-700/30 text-red-200/80 border-red-200/40 m-2 cursor-pointer"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/status", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setUser(res.user))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {user ? <UserDashboard user={user} /> : <div>No user found</div>}
      <div
        className="bg-purple-700/30 text-purple-200/80 border-purple-200/40 border-2 m-2
        cursor-pointer w-fit mx-auto p-2 rounded-xl"
      >
        <Link to="/">Go Back</Link>
      </div>
    </>
  );
}
