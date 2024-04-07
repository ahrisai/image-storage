import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
const app = express();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage: storage });
app.use(cors({ origin: "http://localhost:5173" }));
app.post("/upload", upload.single("avatar"), (req, res) => {
  const avatar = req.file;

  if (!avatar) {
    return res.status(400).send("No file uploaded.");
  }

  res.status(200).send(avatar.path);
});

app.use("/uploads", express.static("uploads"));

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
