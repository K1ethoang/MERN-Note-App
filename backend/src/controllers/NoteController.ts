import { RequestHandler } from "express";
import NoteModel from "../models/Note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface CreateNodeBody {
    title?: string,
    text?: string,
}

interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

class ApiController {
    // [GET] /api/notes
    getNotes: RequestHandler = async (req, res, next) => {
        try {
            const notes = await NoteModel.find();
            res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/notes/:noteId
    getNote: RequestHandler = async (req, res, next) => {
        const noteId = req.params.noteId;
        try {
            if (!mongoose.isValidObjectId(noteId)) {
                throw createHttpError(400, "Invalid note id");
            }

            const note = await NoteModel.findById(noteId);

            if (!note) {
                throw createHttpError(404, "Note not found");
            }
            res.status(200).json(note);
        } catch (error) {
            next(error);
        }
    }

    // [POST] /api/notes/create
    createNote: RequestHandler<unknown, unknown, CreateNodeBody, unknown> = async (req, res, next) => {
        const title = req.body.title;
        const text = req.body.text;
        try {
            if (!title) {
                throw createHttpError(400, "Note must have a title");
            }
            const newNote = await NoteModel.create({ title, text });
            res.status(200).json(newNote);
        } catch (error) {
            next(error);
        }
    }

    // [PATCH] /api/notes/:noteId
    updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
        const noteId = req.params.noteId;
        const newTitle = req.body.title;
        const newText = req.body.text;
        try {
            if (!mongoose.isValidObjectId(noteId)) {
                throw createHttpError(400, "Invalid note id");
            }

            if (!newTitle) {
                throw createHttpError(400, "Note must have a title");
            }

            const note = await NoteModel.findById(noteId);

            if (!note) {
                throw createHttpError(404, "Not note found");
            }

            note.title = newTitle;
            note.text = newText;

            const updateNote = await note.save();

            res.status(200).json(updateNote);
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /api/notes/:noteId
    deleteNote: RequestHandler = async (req, res, next) => {
        const noteId = req.params.noteId;
        try {
            if (!mongoose.isValidObjectId(noteId)) {
                throw createHttpError(400, "Invalid note id");
            }

            const note = await NoteModel.findById(noteId);

            if (!note) {
                throw createHttpError(404, "Note not found");
            }

            await note.deleteOne();

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

}
export default new ApiController;