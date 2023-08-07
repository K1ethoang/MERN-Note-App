import express from "express";
import NoteController from "../controllers/NoteController";

const router = express.Router();

router.post("/create", NoteController.createNode);
router.get("/:noteId", NoteController.getNote);
router.get("/", NoteController.getNotes);

export default router;