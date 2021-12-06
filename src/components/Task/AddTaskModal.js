import {Modal} from "react-bootstrap";
import AddTaskForm from "./AddTaskForm";
import ApiService from "../../utils/ApiService";
import {toast} from "react-toastify";

const AddTaskModal = (props) => {
    const addTaskHandler = (enteredTitle, enteredDescription) => {
        const task = {
            title: enteredTitle,
            description: enteredDescription
        }
        ApiService.post('task', task, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                toast.success(response.data)
                props.onHide();
                props.onAddTask();
            })
            .catch((error) => {
                toast.error(error.response.data);
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
                    Adding new task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddTaskForm
                    onSubmit={addTaskHandler}
                    onHide={props.onHide}
                />
            </Modal.Body>
        </Modal>
    );
};

export default AddTaskModal;
