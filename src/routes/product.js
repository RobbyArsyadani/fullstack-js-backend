import {
  deleteProductById,
  getAllProducts,
  getProductById,
  makeProduct,
  updatedProduct,
} from "#root/controllers/product.js";
import { onlyAdmin } from "#root/middlewares/authValidator.js";
import verifyToken from "#root/middlewares/tokenValidator.js";
import express from "express";
import { upload } from "#root/utils/upload.js";

const router = express.Router();

router.get("/", getAllProducts);
router.delete("/:id", deleteProductById);
router.get("/:id", getProductById);
router.post("/addProduct", upload.single("image"), makeProduct);
router.put("/edit/:id", upload.single("image"), updatedProduct);

export default router;

