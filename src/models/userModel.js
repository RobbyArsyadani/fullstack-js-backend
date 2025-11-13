import db from "#root/database/db.js";
import { param } from "express-validator";

export const findAlluser = async () => {
  const [rows] = await db.query(
    "SELECT id, username, email, password FROM users"
  );
  return rows;
};

export const findUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, username, password FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const createUser = async ({ username, email, password }) => {
  const [result] = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );
  return { id: result.insertId, username, email };
};

export const updateUser = async (id, { username }) => {
  await db.query("UPDATE users SET username = ? WHERE id = ?", [username, id]);
  return findUserById(id);
};

export const deleteUserById = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export const findUserByUsernameOrEmail = async ({ username, email }) => {
  if (!username && !email) {
    throw new Error("Username atau email harus diisi");
  }

  let query = "SELECT username, email, password FROM users WHERE";
  let params = [];

  if (username && email) {
    query += " username = ? OR email = ?";
    params.push(username, email);
  } else if (username) {
    query += " username = ?";
    params.push(username);
  } else if (email) {
    query += " email = ?";
    params.push(email);
  }
  const [rows] = await db.query(query, params);
  return rows[0];
};

