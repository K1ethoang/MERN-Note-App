import { Container } from 'react-bootstrap';
import styles from "./assets/styles/NotesPage.module.css";
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import { UserModel } from './models/UserModel';
import * as UsersApi from "./network/users_api";
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => { setShowLoginModal(true) }}
        onSignUpClicked={() => { setShowSignUpModal(true) }}
        onLogOutSuccessful={() => { setLoggedInUser(null) }}
      />

      <Container className={styles.notesPage}>
        <>
          {loggedInUser
            ? <NotesPageLoggedInView />
            : <NotesPageLoggedOutView />
          }
        </>
        {
          showSignUpModal &&
          <SignUpModal
            onDismiss={() => { setShowSignUpModal(false) }}
            onSignUpSuccessful={(newUser) => {
              setLoggedInUser(newUser);
              setShowSignUpModal(false);
            }}
          />
        }
        {
          showLoginModal &&
          <LoginModal
            onDismiss={() => { setShowLoginModal(false) }}
            onLoginSuccessful={(newUser) => {
              setLoggedInUser(newUser);
              setShowLoginModal(false);
            }}
          />
        }
      </Container >
    </div>
  );
}

export default App;
