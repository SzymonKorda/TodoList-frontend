import {Button, Modal, ModalFooter} from "react-bootstrap";

const DeleteTaskWarningModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Deleting task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to delete this task?
            </Modal.Body>
            <ModalFooter>
                <Button variant={"outline-dark"} onClick={props.onHide}>Cancel</Button>
                <Button variant={"danger"} onClick={props.onConfirm}>Confirm</Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteTaskWarningModal;
