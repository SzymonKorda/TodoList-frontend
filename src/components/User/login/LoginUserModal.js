import {Modal} from "react-bootstrap";
import LoginUserForm from "./LoginUserForm";
import ApiService from "../../../utils/ApiService";

const LoginUserModal = (props) => {
    const loginUserHandler = (enteredUsername, enteredPassword) => {
        //TODO: validation
        const credentials = {
            username: enteredUsername,
            password: enteredPassword
        }
        ApiService.post('auth/signin', credentials)
            .then((response) => {
                props.onShowToast({
                    show: true,
                    //TODO: add error message on server side
                    message: "User logged successfully",
                    type: 'success'
                })
                const token = response.data.accessToken;
                const username = response.data.username;
                props.onLogin(username, token)
                // axios.get('http://localhost:8080/api/task', {
                //     headers: {
                //         'Authorization': 'Bearer ' + localStorage.getItem('Token')
                //     }
                // })
                //     .then((response) => {
                //         console.log(response.data);
                //         // setTaskList(response.data);
                //     })
                //     .catch((error) => {
                //         console.log(error);
                //     })
            })
            .catch((error) => {
                props.onShowToast({
                    show: true,
                    message: error.response.data.message,
                    type: 'danger'
                })
            })
        props.onHide();
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
