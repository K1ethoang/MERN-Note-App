import { RequestHandler } from "express";
import NoteModel from "../models/Note";

class ApiController {
    // [GET] api/notes
    getNotes: RequestHandler = async (req, res, next) => {
        try {
            const notes = await NoteModel.find();
            res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    }

    // [GET] api/notes/:noteId
    getNote: RequestHandler = async (req, res, next) => {
        const noteId = req.params.noteId;
        try {
            const note = await NoteModel.findById(noteId);
            res.status(200).json(note);
        } catch (error) {
            next(error);
        }
    }

    // [POST] api/notes
    createNode: RequestHandler = async (req, res, next) => {
        try {
            const newNote = await NoteModel.create(req.body);
            res.status(200).json(newNote);
        } catch (error) {
            next(error);
        }
    }

}
export default new ApiController;