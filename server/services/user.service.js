import { readUsers } from "../databases/users.js";

export function doesUserExist(user) {
  const users = readUsers();

  if (users[user]?.passwordHash) {
    return true;
  }
  return false;
}
