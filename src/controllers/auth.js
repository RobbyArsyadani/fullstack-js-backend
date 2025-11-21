import {
  findUserByUsernameOrEmail,
  createUser,
} from "#root/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await findUserByUsernameOrEmail({ username, email });
    if (!user) {
      return res.status(401).json({ message: "data tidak ditemukan" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    const token = jwt.sign(
      { username: user.username, role: "admin" },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "1 hours",
      }
    );

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }
    return res.status(200).json({ message: "Login berhasil", token });
  } catch (err) {
    return res.status(401).json({ message: "Error tidak diketahui" });
  }
};

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existing = await findUserByUsernameOrEmail({ username, email });
  if (existing) {
    return res.status(400).json({ message: "User sudah terdaftar" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await createUser({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({ data: result, message: "Registrasi berhasil" });
};

