import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useContext, useState} from "react";
import RegisterUserModal from "../User/register/RegisterUserModal";
import UserContext from "../../store/user-context";
import {Link} from "react-router-dom";

const Header = () => {
    const [showRegisterUserModal, setShowRegisterUserModal] = useState(false);

    const userCtx = useContext(UserContext);

    const handleRegisterModalShow = () => {
        setShowRegisterUserModal(true);
    };

    const handleRegisterModalClose = () => {
        setShowRegisterUserModal(false);
    };

    return (
        <>
            <Navbar expand="md" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to={"/"}>TodoList</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto" fill>
                            {userCtx.isLoggedIn && <Link to={"/active"} className="nav-link">Active tasks</Link>}
                            {userCtx.isLoggedIn && <Link to={"/finished"} className="nav-link">Finished tasks</Link>}
                        </Nav>
                        <Nav fill>
                            {!userCtx.isLoggedIn &&
                            <Nav.Link onClick={handleRegisterModalShow}>Register</Nav.Link>}
                            {userCtx.isLoggedIn  &&
                            <Nav.Link disabled active>{userCtx.displayedUsername}</Nav.Link>}
                            {userCtx.isLoggedIn &&
                            <Nav.Link onClick={userCtx.onLogout}>Logout</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showRegisterUserModal && <RegisterUserModal
                show={showRegisterUserModal}
                onHide={handleRegisterModalClose}
                onShowToast={userCtx.onShowToast}
            />}
        </>
    );
};

export default Header;
