import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);      // sending information to the server => POST
router.post("/login", login);
router.post("/logout", logout);

export default router;