import {Button, ButtonGroup, Card, CardGroup} from "react-bootstrap";
import {useState} from "react";
import UpdateTaskModal from "./UpdateTaskModal";
import DeleteTaskWarningModal from "./DeleteTaskWarningModal";

const TaskItem = (props) => {
    const [updateTaskModalShow, setUpdateTaskModalShow] = useState(false);
    const [deleteTaskModalShow, setDeleteTaskModalShow] = useState(false);

    const handleDeleteTaskModalShow = () => {
        setDeleteTaskModalShow(true);
    };

    const handleDeleteTaskModalClose = () => {
        setDeleteTaskModalShow(false);
    }

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
                backgroundColor: '#b0abab',
            }}>
                <Card.Header></Card.Header>
                <Card.Body>
                    <Card.Title style={{ height: "20px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{props.title}</Card.Title>
                    <Card.Text style={{height: "50px", overflow: "hidden" , textOverflow: "ellipsis", display: '-webkit-box',
                    webkitLineClamp: '2', webkitBoxOrient: 'vertical'}}>{props.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant={"success"} onClick={props.onFinish}>Finish</Button>
                    <Button variant={"warning"} onClick={handleUpdateTaskModalShow}>Update</Button>
                    <Button variant={"danger"} onClick={handleDeleteTaskModalShow}>Delete</Button>
                </Card.Footer>
            </Card>
            {updateTaskModalShow && <UpdateTaskModal
                show={updateTaskModalShow}
                onHide={handleUpdateTaskModalClose}
                task={props.task}
                onSubmit={updateTask}
            />}
            {deleteTaskModalShow && <DeleteTaskWarningModal
                show={deleteTaskModalShow}
                onHide={handleDeleteTaskModalClose}
                onConfirm={props.onRemove}
            />}
        </>
    );
};

export default TaskItem;
