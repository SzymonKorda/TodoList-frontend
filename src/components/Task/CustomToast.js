import {ToastContainer, Toast} from "react-bootstrap";

const CustomToast = (props) => {
    return (
        <ToastContainer position={"top-end"} onClick={props.onClose}>
            <Toast
                show={props.show}
                onClose={props.onClose}
                delay={3000}
                autohide animation={true}
                bg={props.bg}
            >
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default CustomToast;
