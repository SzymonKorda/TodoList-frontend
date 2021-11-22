import {ToastContainer, Toast} from "react-bootstrap";

const TaskToast = (props) => {
    return (
        <ToastContainer position={"top-end"} onClick={props.onClose}>
            <Toast
                show={props.show}
                onClose={props.onClose}
                delay={2000}
                autohide animation={true}
                bg={'success'}
            >
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default TaskToast;
