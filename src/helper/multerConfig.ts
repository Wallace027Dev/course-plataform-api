import multer from "multer";
import path from "node:path";
import slugify from "slugify";
import fs from "fs";

const uploadPath = path.resolve(__dirname, "..", "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(_req, file, callback) {
      const originalName = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );

      // Separa a extensão
      const ext = path.extname(originalName);
      const baseName = path.basename(originalName, ext);

      // Slugify apenas o nome
      const sanitized = slugify(baseName, {
        lower: true,
        strict: true
      });

      callback(null, `${Date.now()}-${sanitized}${ext}`);
    }
  })
});

export const uploads = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "audio", maxCount: 1 },
  { name: "pdf", maxCount: 1 }
]);