import {
  findAllProducts,
  findProductById,
  deleteProduct,
  createProduct,
  findProductByName,
  updateProduct,
} from "#root/models/productModel.js";
import { deleteFile } from "#root/utils/deleteFile.js";

export const getAllProducts = async (req, res) => {
  const data = await findAllProducts();

  if (!data) {
    return res.status(404).json({ message: "Tidak ada data sama sekali" });
  }

  return res.status(200).json({ data: data });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const data = await findProductById(id);

  if (!data) {
    return res.status(404).json({ message: "Data tidak ada" });
  }

  return res.status(200).json({ data: [data] });
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  const existing = await findProductById(id);

  if (!existing) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }

  if (existing.image_path) {
    deleteFile(existing.image_path);
  }

  await deleteProduct(id);

  return res
    .status(200)
    .json({ data: existing, message: "Data berhasil dihapus" });
};

export const makeProduct = async (req, res) => {
  const { name, description } = req.body;

  const existing = await findProductByName(name);

  if (existing) {
    return res.status(400).json({ message: "Product sudah ada" });
  }

  const image = req.file ? req.file.filename : null;

  const data = await createProduct({ name, description, image });

  return res.status(201).json({ data, message: "Produk berhasil ditambahkan" });
};

export const updatedProduct = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const newImage = req.file?.filename;

  const existing = await findProductById(id);

  if (!existing) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }

  if (newImage && existing.image_path) {
    deleteFile(existing.image_path);
  }

  const data = await updateProduct(id, {
    name,
    description,
    image: newImage || existing.image_path,
  });

  return res.status(200).json({ data, message: "Data berhasil diperbarui" });
};

