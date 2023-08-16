import { Container } from 'react-bootstrap';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import { UserModel } from './models/UserModel';
import * as UsersApi from "./network/users_api";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import styles from "./assets/styles/App.module.css";

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
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => { setShowLoginModal(true) }}
          onSignUpClicked={() => { setShowSignUpModal(true) }}
          onLogOutSuccessful={() => { setLoggedInUser(null) }}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/privacy"
              element={<PrivacyPage />}
            />
            <Route
              path="/*"
              element={<NotFoundPage />}
            />
          </Routes>
        </Container>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
