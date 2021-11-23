import {Button, Form, Modal} from "react-bootstrap";
import {useRef} from "react";

const LoginUserForm = (props) => {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        props.onSubmit(enteredUsername, enteredPassword);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" ref={usernameInputRef}/>
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

export default LoginUserForm;
