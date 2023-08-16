import express from "express";
import UserController from "../controllers/UserController";
import { requireAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/", requireAuth, UserController.getAuthenticatedUser);
router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;