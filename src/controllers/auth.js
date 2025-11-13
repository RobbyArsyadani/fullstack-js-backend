import {
  findUserByUsernameOrEmail,
  createUser,
} from "#root/models/userModel.js";
import bcrypt from "bcrypt";

export const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await findUserByUsernameOrEmail({ username, email });
    if (!user) {
      return res.status(401).json({ message: "data tidak ditemukan" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }
    return res.status(200).json({ message: "Login berhasil", user });
  } catch (err) {
    return res.status(401).json({ message: "Error tidak diketahui" });
  }
};

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existing = await findUserByUsernameOrEmail({ username, email });
  if (existing) {
    console.log(existing);
    return res.status(400).json({ message: "User sudah terdaftar" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(existing);
  const result = await createUser({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(200).json({ data: result, message: "Registrasi berhasil" });
};

