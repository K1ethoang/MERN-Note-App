import express from "express";
import NoteController from "../controllers/NoteController";

const router = express.Router();

router.get("/:noteId", NoteController.getNote);
router.get("/", NoteController.getNotes);
router.post("/", NoteController.createNode);

export default router;