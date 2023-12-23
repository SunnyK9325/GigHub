import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/:id", getUser);                            
router.delete("/:id", verifyToken, deleteUser);                             // before this function it gonna visit this middleware first , if there is a problem, it gonna return error before going this function, if everything is fine our function gonna run.

export default router;