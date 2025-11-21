import express from "express";
import authRoutes from "#root/routes/auth.js";
import userRoutes from "#root/routes/user.js";
import productRoutes from "#root/routes/product.js";
import multer from "multer";
import cors from "cors";
import "dotenv/config";
import "#root/database/db.js";
import path from "path";
const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

