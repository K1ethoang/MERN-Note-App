import { RequestHandler } from "express";
import NoteModel from "../models/Note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

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
        const authenticatedUserId = req.session.userId;

        try {
            assertIsDefined(authenticatedUserId);

            const notes = await NoteModel.find({ userId: authenticatedUserId });
            res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/notes/:noteId
    getNote: RequestHandler = async (req, res, next) => {
        const noteId = req.params.noteId;
        const authenticatedUserId = req.session.userId;

        try {
            assertIsDefined(authenticatedUserId);

            if (!mongoose.isValidObjectId(noteId)) {
                throw createHttpError(400, "Invalid note id");
            }

            const note = await NoteModel.findById(noteId);

            if (!note) {
                throw createHttpError(404, "Note not found");
            }

            if (!note.userId?.equals(authenticatedUserId)) {
                throw createHttpError(401, "You cannot access this note");
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
        const authenticatedUserId = req.session.userId;

        try {
            assertIsDefined(authenticatedUserId);

            if (!title) {
                throw createHttpError(400, "Note must have a title");
            }

            const newNote = await NoteModel.create({ userId: authenticatedUserId, title, text });
            res.status(200).json(newNote);
        } catch (error) {
            next(error);
        }
    }

    // [PATCH] /api/notes/:noteId
    updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
        const noteId = req.params.noteId;
        const { title: newTitle, text: newText } = req.body;
        const authenticatedUserId = req.session.userId;

        try {
            assertIsDefined(authenticatedUserId);

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

            if (!note.userId?.equals(authenticatedUserId)) {
                throw createHttpError(401, "You cannot access this note");
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
        const authenticatedUserId = req.session.userId;

        try {
            assertIsDefined(authenticatedUserId);

            if (!mongoose.isValidObjectId(noteId)) {
                throw createHttpError(400, "Invalid note id");
            }

            const note = await NoteModel.findById(noteId);

            if (!note) {
                throw createHttpError(404, "Note not found");
            }

            if (!note.userId?.equals(authenticatedUserId)) {
                throw createHttpError(401, "You cannot access this note");
            }

            await note.deleteOne();

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

}
export default new ApiController;