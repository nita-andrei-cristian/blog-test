import fs from "node:fs";
import path from "node:path";

export function readJsonFile(filePath, fallback = {}) {
  try {
    if (!fs.existsSync(filePath)) {
      writeJsonFile(filePath, fallback);
      return { ...fallback };
    }

    const raw = fs.readFileSync(filePath, "utf-8").trim();
    if (!raw) return { ...fallback };

    return JSON.parse(raw);
  } catch (error) {
    return { ...fallback };
  }
}

export function writeJsonFile(filePath, data) {
  const directory = path.dirname(filePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
