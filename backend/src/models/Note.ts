import { Schema, InferSchemaType, model } from "mongoose";

const NoteSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });

type Note = InferSchemaType<typeof NoteSchema>;

export default model<Note>("Note", NoteSchema);
