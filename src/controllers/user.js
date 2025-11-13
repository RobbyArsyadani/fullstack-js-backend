import {
  deleteUserById,
  findAlluser,
  findUserById,
} from "#root/models/userModel.js";

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const existing = await findUserById(id);
  if (!existing) {
    return res.status(400).json({ message: "User tidak ditemukan" });
  }
  await deleteUserById(id);

  return res.status(200).json({ message: "Data berhasil dihapus" });
};

export const getAllUsers = async (req, res) => {
  const data = await findAlluser();

  if (!data) {
    return res.status(400).json({ message: "Tidak ada sama sekali" });
  }

  return res.status(200).json({ data, message: "Data ada nih" });
};

