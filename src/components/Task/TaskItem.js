import {Button, Card} from "react-bootstrap";
import {useState} from "react";
import UpdateTaskModal from "./UpdateTaskModal";
import ApiService from "../../utils/ApiService";

const TaskItem = (props) => {
    const [updateTaskModalShow, setUpdateTaskModalShow] = useState(false);

    const handleUpdateTaskModalShow = () => {
        setUpdateTaskModalShow(true);
    };

    const handleUpdateTaskModalClose = () => {
        setUpdateTaskModalShow(false);
    }

    const updateTask = (updatedTask) => {
        handleUpdateTaskModalClose();
        props.onUpdate(updatedTask);
    }

    return (
        <>
            <Card style={{
                backgroundColor: '#b0abab'
            }}>
                <Card.Header></Card.Header>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.description}</Card.Text>
                    <Button variant={"success"}>Done</Button>
                    <Button variant={"warning"} onClick={handleUpdateTaskModalShow}>Update</Button>
                    <Button variant={"danger"} onClick={props.onRemove}>Delete</Button>
                </Card.Body>
            </Card>
            {updateTaskModalShow && <UpdateTaskModal
                show={updateTaskModalShow}
                onHide={handleUpdateTaskModalClose}
                task={props.task}
                onSubmit={updateTask}
            />}
        </>


    );
};

export default TaskItem;
