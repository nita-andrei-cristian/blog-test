import path from "node:path";
import { fileURLToPath } from "node:url";

import { readJsonFile, writeJsonFile } from "./json-file.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VISITS_PATH = path.join(__dirname, "visits.json");

export function readVisits() {
  return readJsonFile(VISITS_PATH, {});
}

export function writeVisits(visits) {
  writeJsonFile(VISITS_PATH, visits);
}
