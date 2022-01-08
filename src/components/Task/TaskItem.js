import {Button, ButtonGroup, Card, CardGroup} from "react-bootstrap";
import {useState} from "react";
import UpdateTaskModal from "./UpdateTaskModal";
import DeleteTaskWarningModal from "./DeleteTaskWarningModal";
import SimpleTaskInfoModal from "./SimpleTaskInfoModal";

const TaskItem = (props) => {
    const [updateTaskModalShow, setUpdateTaskModalShow] = useState(false);
    const [deleteTaskModalShow, setDeleteTaskModalShow] = useState(false);
    const [simpleTaskInfoModalShow, setSimpleTaskInfoModalShow] = useState(false);

    const handleSimpleTaskInfoModalShow = () => {
        setSimpleTaskInfoModalShow(true);
    };

    const handleSimpleTaskInfoModalClose = () => {
        setSimpleTaskInfoModalShow(false);
    }

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
                <Card.Body onClick={handleSimpleTaskInfoModalShow}>
                    <Card.Title style={{ height: "30px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{props.title}</Card.Title>
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
            {simpleTaskInfoModalShow && <SimpleTaskInfoModal
                show={simpleTaskInfoModalShow}
                onHide={handleSimpleTaskInfoModalClose}
                task={props.task}
            />}
        </>
    );
};
export default TaskItem;
