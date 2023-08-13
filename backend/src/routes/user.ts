import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);
router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;