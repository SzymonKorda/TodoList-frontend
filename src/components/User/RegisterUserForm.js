import {Button, Form, Modal} from "react-bootstrap";
import {useRef} from "react";

const RegisterUserForm = (props) => {
    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const enteredUsername = usernameInputRef.current.value;
        const enteredEmail= emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        props.onSubmit(enteredUsername, enteredEmail, enteredPassword);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" ref={usernameInputRef}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="example@gmail.com" ref={emailInputRef}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" ref={passwordInputRef}/>
            </Form.Group>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button type={'submit'}>Submit</Button>
            </Modal.Footer>
        </Form>
    );
};

export default RegisterUserForm;
