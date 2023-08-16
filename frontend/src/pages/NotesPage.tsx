import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import styles from "../assets/styles/NotesPage.module.css";
import { UserModel } from "../models/UserModel";

interface NotesPageProps {
    loggedInUser: UserModel | null,
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
    return (<Container className={styles.notesPage}>
        <>
            {loggedInUser
                ? <NotesPageLoggedInView />
                : <NotesPageLoggedOutView />
            }
        </>
    </Container >);
}

export default NotesPage;