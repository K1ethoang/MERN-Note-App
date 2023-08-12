import { useEffect, useState } from 'react';
import { NoteModel } from './models/NoteModel';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./assets/styles/NotesPage.module.css";
import styleUtils from "./assets/styles/utils.module.css";
import * as NoteApi from "./network/notes_api";
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Button
        className={`mb-3 ${styleUtils.blockCenter}`}
        onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </Button>

      <Row xs={1} md={3} xl={4} className="g-4">
        {notes.map(note => (
          <Col key={note._id} >
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {
        showAddNoteDialog &&
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      }
    </Container >
  );
}

export default App;
