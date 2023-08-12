import { useEffect, useState } from 'react';
import { NoteModel } from './models/NoteModel';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./assets/styles/NotesPage.module.css";
import styleUtils from "./assets/styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import { FaPlus } from "react-icons/fa";
import AddEditNoteDialog from './components/AddEditNoteDialogProps';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button
        className={`mb-3 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}>
        <FaPlus />
        Add new note
      </Button>

      <Row xs={1} md={3} xl={4} className="g-4">
        {notes.map(note => (
          <Col key={note._id} >
            <Note
              note={note}
              className={styles.note}
              onNoteClicked={setNoteToEdit}
              onDeleteNoteClicked={deleteNote}
            />
          </Col>
        ))}
      </Row>
      {
        showAddNoteDialog &&
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      }
      {noteToEdit &&
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote));
            setNoteToEdit(null);
          }}
        />
      }
    </Container >
  );
}

export default App;
