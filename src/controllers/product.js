import {
  findAllProducts,
  findProductById,
  deleteProduct,
  createProduct,
  findProductByName,
  updateProduct,
} from "#root/models/productModel.js";

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

  const exsisting = await findProductById(id);

  if (!exsisting) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }

  await deleteProduct(id);

  return res
    .status(200)
    .json({ data: exsisting, message: "Data berhasil dihapus" });
};

export const makeProduct = async (req, res) => {
  const { name, description } = req.body;

  const existing = await findProductByName(name);

  if (existing) {
    return res.status(400).json({ message: "Product sudah ada" });
  }

  const data = await createProduct({ name, description });

  return res.status(200).json({ data, message: "Produk berhasil ditambahkan" });
};

export const updatedProduct = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  const data = await updateProduct(id, { name, description });

  if (!data) {
    res.status(404).json({ message: "Data tidak ditemukan" });
  }

  return res.status(200).json({ data, message: "Data berhaasil diperbarui" });
};

