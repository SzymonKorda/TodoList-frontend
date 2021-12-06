import {Modal} from "react-bootstrap";
import LoginUserForm from "./LoginUserForm";
import ApiService from "../../../utils/ApiService";
import {toast} from "react-toastify";

const LoginUserModal = (props) => {
    const loginUserHandler = (enteredUsername, enteredPassword) => {
        const credentials = {
            username: enteredUsername,
            password: enteredPassword
        }
        ApiService.post('auth/signin', credentials)
            .then((response) => {
                toast.success('User logged successfully!');
                const token = response.data.accessToken;
                const username = response.data.username;
                props.onHide();
                props.onLogin(username, token)
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
    };

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginUserForm
                    onSubmit={loginUserHandler}
                    onHide={props.onHide}
                />
            </Modal.Body>
        </Modal>
    );
};

export default LoginUserModal;
