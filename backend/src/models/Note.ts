import mongoose from "mongoose";

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });

export default mongoose.model("Note", NoteSchema);