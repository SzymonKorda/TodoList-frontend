import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useContext, useState} from "react";
import RegisterUserModal from "../User/register/RegisterUserModal";
import LoginUserModal from "../User/login/LoginUserModal";
import UserContext from "../../store/user-context";
import {Link} from "react-router-dom";

const Header = () => {
    const [showRegisterUserModal, setShowRegisterUserModal] = useState(false);
    const [loginUserModalShow, setLoginUserModalShow] = useState(false);
    const userCtx = useContext(UserContext);

    const handleRegisterModalShow = () => {
        setShowRegisterUserModal(true);
    };

    const handleRegisterModalClose = () => {
        setShowRegisterUserModal(false);
    };

    const handleLoginModalShow = () => {
        setLoginUserModalShow(true);
    };

    const handleLoginModalClose = () => {
        setLoginUserModalShow(false);
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand  href="/home">TodoList</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {userCtx.isLoggedIn && <Link to={"/active"} className="nav-link">Active tasks</Link>}
                            {userCtx.isLoggedIn && <Link to={"/finished"} className="nav-link">Finished tasks</Link>}
                        </Nav>
                        <Nav>
                            {!userCtx.isLoggedIn &&
                            <Button variant={"dark"} onClick={handleLoginModalShow}>Sign in</Button>}
                            {!userCtx.isLoggedIn &&
                            <Button variant={"dark"} onClick={handleRegisterModalShow}>Register</Button>}
                            {userCtx.isLoggedIn &&
                            <Button variant={"dark"} disabled>{userCtx.displayedUsername}</Button>}
                            {userCtx.isLoggedIn && <Button variant={"dark"} onClick={userCtx.onLogout}>Logout</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showRegisterUserModal && <RegisterUserModal
                show={showRegisterUserModal}
                onHide={handleRegisterModalClose}
                onShowToast={userCtx.onShowToast}
            />}
            {loginUserModalShow && <LoginUserModal
                show={loginUserModalShow}
                onHide={handleLoginModalClose}
                onLogin={userCtx.onLogin}
                onShowToast={userCtx.onShowToast}
            />}
        </>
    );
};

export default Header;
