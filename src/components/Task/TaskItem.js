import {Button, ButtonGroup, Card, CardGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useState} from "react";
import UpdateTaskModal from "./UpdateTaskModal";
import DeleteTaskWarningModal from "./DeleteTaskWarningModal";
import SimpleTaskInfoModal from "./SimpleTaskInfoModal";

const TaskItem = (props) => {
    const [updateTaskModalShow, setUpdateTaskModalShow] = useState(false);
    const [deleteTaskModalShow, setDeleteTaskModalShow] = useState(false);
    const [simpleTaskInfoModalShow, setSimpleTaskInfoModalShow] = useState(false);
    // const [showTooltip, setShowTooltip] = useState(true);

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

    const renderTooltip = (props) => (
        // console.log(window.innerHeight)
        (window.innerWidth > 992) ?
        <Tooltip id="button-tooltip" {...props}>
            Press to show full content
        </Tooltip> : <div></div>
        // : <div></div>*/}
    );

    return (
        <>
            <Card  style={{
                // backgroundColor: '#b0abab',
                // backgroundColor: '#eaf5f5'

            }}>
                <Card.Header></Card.Header>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 100, hide: 100 }}
                    overlay={renderTooltip}
                >
                    <Card.Body onClick={handleSimpleTaskInfoModalShow} style={{cursor:'pointer'}}>
                        <Card.Title style={{ height: "30px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{props.title}</Card.Title>
                        <Card.Text style={{height: "50px", overflow: "hidden" , textOverflow: "ellipsis", display: '-webkit-box',
                            webkitLineClamp: '2', webkitBoxOrient: 'vertical', whiteSpace: 'pre-wrap'}}>{props.description}</Card.Text>
                    </Card.Body>
                </OverlayTrigger>
                <Card.Footer>
                    <Button className={"me-1"} variant={"success"} onClick={props.onFinish}>Finish</Button>
                    <Button className={"me-1"} variant={"warning"} onClick={handleUpdateTaskModalShow}>Update</Button>
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
