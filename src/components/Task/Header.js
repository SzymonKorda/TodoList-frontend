import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import RegisterUserModal from "../User/RegisterUserModal";

const Header = (props) => {
    const [registerUserModalShow, setRegisterUserModalShow] = useState(false);

    const handleRegisterModalShow = () => {
        setRegisterUserModalShow(true);
    };

    const handleRegisterModalClose = () => {
        setRegisterUserModalShow(false);
    };

    const registerUserHandler = (enteredUsername, enteredEmail, enteredPassword) => {
        setRegisterUserModalShow(false);
        const user = {
            username: enteredUsername,
            email: enteredEmail,
            password: enteredPassword
        }
        axios.post('http://localhost:8080/api/auth/signup', user)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
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
                        <Nav className="me-auto">
                            {/*<Button variant={"dark"}>New Task</Button>*/}
                        </Nav>
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
                onSubmit={registerUserHandler}/>}
        </>
    );
};

export default Header;
