import { body } from "express-validator";

export const loginValidation = [
  body("username").optional(),

  body("email").optional().isEmail().withMessage("Email tidak valid"),

  body("password").notEmpty().withMessage("Password tidak boleh kosong"),
];

export const registerValidation = [
  body("username").notEmpty().withMessage("Wajib isi username"),
  body("email").isEmail().notEmpty().withMessage("Wajib isi email"),
  body("password").notEmpty(),
];

export const onlyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Hanya admin yang boleh akses" });
  }
  next();
};

