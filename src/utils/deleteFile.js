import fs from "fs";
import path from "path";

export function deleteFile(filename) {
  if (!filename) {
    return;
  }

  const filepath = path.join(process.cwd(), "uploads", filename);

  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
}

