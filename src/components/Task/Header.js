import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";
import RegisterUserModal from "../User/RegisterUserModal";
import CustomToast from "./CustomToast";

const Header = (props) => {
    const [registerUserModalShow, setRegisterUserModalShow] = useState(false);
    const [showToast, setShowToast] = useState({show: false, message: '', type: ''})

    const handleRegisterModalShow = () => {
        setRegisterUserModalShow(true);
    };

    const handleRegisterModalClose = () => {
        setRegisterUserModalShow(false);
    };

    const handleToastShow = (response) => {
        setShowToast({
            show: response.show,
            message: response.message,
            type: response.type
        })
    };

    const handleToastClose = () => {
        setShowToast({
            show: false,
            message: '',
            type: ''
        })
    };

    const isLogin = props.isLogin;

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">TodoList</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            {!isLogin && <Button variant={"dark"} onClick={props.onLogin}>Sign In</Button>}
                            {!isLogin && <Button variant={"dark"} onClick={handleRegisterModalShow}>Sign Up</Button>}
                            {isLogin && <Button variant={"dark"} disabled>{props.username}</Button>}
                            {isLogin && <Button variant={"dark"} onClick={props.onLogout}>Logout</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {registerUserModalShow && <RegisterUserModal
                show={registerUserModalShow}
                onHide={handleRegisterModalClose}
                onShowToast={handleToastShow}
            />}
            {showToast.show && <CustomToast
                show={showToast.show}
                onClose={handleToastClose}
                message={showToast.message}
                bg={showToast.type}
            />}
        </>
    );
};

export default Header;
