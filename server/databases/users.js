import path from "node:path";
import { fileURLToPath } from "node:url";

import { readJsonFile, writeJsonFile } from "./json-file.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_PATH = path.join(__dirname, "users.json");

export function readUsers() {
  return readJsonFile(USERS_PATH, {});
}

export function writeUsers(users) {
  writeJsonFile(USERS_PATH, users);
}
