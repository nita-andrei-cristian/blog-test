import bcrypt from "bcrypt";

import USERS from "../databases/users.js";

const SALT_ROUNDS = 10;

export async function register(req, res) {
  const { user, pass } = req.body || {};

  if (!user || !pass) {
    return res.status(400).json({ message: "missing credentials" });
  }

  if (USERS[user]?.passwordHash) {
    return res.status(409).json({ message: "user already exists" });
  }

  const passwordHash = await bcrypt.hash(pass, SALT_ROUNDS);

  USERS[user] = {
    ...USERS[user],
    passwordHash,
  };

  req.session.user = { name: user };

  return res.json({ status: "ok" });
}

export async function login(req, res) {
  const { user, pass } = req.body || {};

  if (!user || !pass) {
    return res.status(400).json({ message: "missing credentials" });
  }

  const account = USERS[user];

  if (!account?.passwordHash) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  const match = await bcrypt.compare(pass, account.passwordHash);

  if (!match) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  req.session.user = { name: user };

  return res.json({ status: "ok" });
}

export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "logout failed" });
    }

    res.clearCookie("connect.sid");
    return res.json({ status: "ok" });
  });
}
