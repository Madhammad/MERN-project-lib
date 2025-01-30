import multer from "multer";
import { v4 as uuid4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "api/public/image");
  },
  filename: function (req, file, cb) {
    const newfileName = uuid4() + path.extname(file.originalname);
    cb(null, newfileName);
  },
});

export const upload = multer({
  storage,
});
