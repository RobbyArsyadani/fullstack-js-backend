import express from "express";
import { login, register } from "#root/controllers/auth.js";
import {
  loginValidation,
  registerValidation,
} from "#root/middlewares/authValidator.js";
import { validate } from "#root/middlewares/validate.js";

const router = express.Router();

router.post("/login", loginValidation, validate, login);
router.post("/register", registerValidation, validate, register);

export default router;

