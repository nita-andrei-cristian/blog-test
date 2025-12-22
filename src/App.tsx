import AuthPage from "./auth/page";
import UserPage from "./user/page";
import Heropage from "./hero/page";
import PostPage from "./post/page";

import type { User } from "./types/db";

import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Heropage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}

export default App;
