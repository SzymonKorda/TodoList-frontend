import {Modal} from "react-bootstrap";
import UpdateTaskForm from './UpdateTaskForm';

const UpdateTaskModal = (props) => {
    const onSubmit = (enteredTitle, enteredDescription) => {
        const updatedTask = {
            id: props.task.id,
            title: enteredTitle,
            description: enteredDescription
        };
        props.onSubmit(updatedTask);
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
                    Updating task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdateTaskForm
                    onHide={props.onHide}
                    task={props.task}
                    onSubmit={onSubmit}
                />
            </Modal.Body>
        </Modal>
    );
};

export default UpdateTaskModal;
