import db from "#root/database/db.js";

export const createProduct = async ({ name, description }) => {
  const [result] = await db.query(
    "INSERT INTO products (product_name, product_description) VALUES(?, ?)",
    [name, description]
  );
  return { id: result.insertId, result };
};

export const findProductById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, product_name, product_description FROM products WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const findAllProducts = async () => {
  const [rows] = await db.query(
    "SELECT id, product_name, product_description FROM products"
  );
  return rows;
};

export const deleteProduct = async (id) => {
  const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export const updateProduct = async (id, { name, description }) => {
  const [rows] = await db.query(
    "UPDATE products SET product_name = ?, product_description = ? WHERE id = ?",
    [name, description, id]
  );
  return findProductById(id);
};

export const findProductByName = async (name) => {
  const [data] = await db.query(
    "SELECT id, product_name, product_description FROM products WHERE product_name = ?",
    [name]
  );

  return data[0];
};

