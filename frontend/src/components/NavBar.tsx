import { Container, Nav, Navbar } from "react-bootstrap";
import { UserModel } from "../models/UserModel";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
    loggedInUser: UserModel | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogOutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogOutSuccessful }: NavBarProps) => {


    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand>
                    Cool Notes App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView
                                user={loggedInUser}
                                onLogoutSuccessful={onLogOutSuccessful} />
                            : <NavBarLoggedOutView
                                onLoginClicked={onLoginClicked}
                                onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;