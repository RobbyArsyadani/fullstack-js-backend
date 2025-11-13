import express from "express";
import authRoutes from "#root/routes/auth.js";
import userRoutes from "#root/routes/user.js";
import productRoutes from "#root/routes/product.js";
import cors from "cors";
import "dotenv/config";
import "#root/database/db.js";
const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

