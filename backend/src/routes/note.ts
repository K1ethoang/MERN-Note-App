import express from "express";
import NoteController from "../controllers/NoteController";

const router = express.Router();

router.get("/", NoteController.getNotes);
router.get("/:noteId", NoteController.getNote);
router.patch("/:noteId", NoteController.updateNote);
router.delete("/:noteId", NoteController.deleteNote);
router.post("/create", NoteController.createNote);

export default router;