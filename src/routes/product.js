import {
  deleteProductById,
  getAllProducts,
  getProductById,
  makeProduct,
  updatedProduct,
} from "#root/controllers/product.js";
import express from "express";

const router = express.Router();

router.get("/", getAllProducts);
router.delete("/:id", deleteProductById);
router.get("/:id", getProductById);
router.post("/addProduct", makeProduct);
router.put("/edit/:id", updatedProduct);

export default router;

