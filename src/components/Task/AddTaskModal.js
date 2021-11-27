import {Modal} from "react-bootstrap";
import AddTaskForm from "./AddTaskForm";
import ApiService from "../../utils/ApiService";

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
                props.onAddTask();
                console.log(response.data);
                props.onShowToast({
                    show: true,
                    message: response.data,
                    type: 'success'
                })
            })
            .catch((error) => {
                props.onShowToast({
                    show: true,
                    message: error.response.data,
                    type: 'success'
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
