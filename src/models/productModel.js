import db from "#root/database/db.js";

export const createProduct = async ({ name, description, image }) => {
  const [result] = await db.query(
    "INSERT INTO products (product_name, product_description, image_path) VALUES(?, ?, ?)",
    [name, description, image]
  );
  return { id: result.insertId, result };
};

export const findProductById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, product_name, product_description, image_path FROM products WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const findAllProducts = async () => {
  const [rows] = await db.query(
    "SELECT id, product_name, product_description, image_path FROM products"
  );
  return rows;
};

export const deleteProduct = async (id) => {
  const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export const updateProduct = async (id, { name, description, image }) => {
  const [rows] = await db.query(
    "UPDATE products SET product_name = ?, product_description = ?, image_path = ? WHERE id = ?",
    [name, description, image, id]
  );
  return findProductById(id);
};

export const findProductByName = async (name) => {
  const [data] = await db.query(
    "SELECT id, product_name, product_description, image_path FROM products WHERE product_name = ?",
    [name]
  );

  return data[0];
};

