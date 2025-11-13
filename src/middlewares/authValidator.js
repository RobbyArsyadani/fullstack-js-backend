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

