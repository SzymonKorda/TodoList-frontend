import {Modal} from "react-bootstrap";
import RegisterUserForm from "./RegisterUserForm";
import ApiService from "../../utils/ApiService";

const RegisterUserModal = (props) => {
    const registerUserHandler = (enteredUsername, enteredEmail, enteredPassword) => {
        const user = {
            username: enteredUsername,
            email: enteredEmail,
            password: enteredPassword
        }
        ApiService.post('auth/signup', user)
            .then((response) => {
                props.onShowToast({
                    show: true,
                    message: response.data.message,
                    type: 'success'
                })
            })
            //TODO: add error message on server side
            .catch((error) => {
                props.onShowToast({
                    show: true,
                    message: error.response.data.message,
                    type: 'danger'
                })
            })
        props.onHide();
    };

    const registerModal =
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Register user
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegisterUserForm
                    onSubmit={registerUserHandler}
                    onHide={props.onHide}
                />
            </Modal.Body>
        </Modal>

    return (
        <>
            {registerModal}
        </>
    );
};

export default RegisterUserModal;
