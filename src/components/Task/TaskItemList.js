import {Alert, Button, CardGroup, Col, Container, Row} from "react-bootstrap";
import TaskItem from "./TaskItem";
import ApiService from "../../utils/ApiService";
import {toast} from "react-toastify";
import {useState} from "react";

const TaskItemList = (props) => {
    const removeTaskHandler = (id) => {
        ApiService.deleteTask(id)
            .then((response) => {
                toast.success(response.data);
                props.onRemove(id);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    };

    const updateTaskHandler = (updatedTask) => {
        const task = {
            title: updatedTask.title,
            description: updatedTask.description
        };
        ApiService.updateTask(updatedTask, task)
            .then((response) => {
                toast.success(response.data);
                props.onUpdate(updatedTask);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    };

    const finishTaskHandler = (id) => {
        ApiService.finishTask(id)
            .then((response) => {
                toast.success(response.data);
                props.onFinish();
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    };

    return (
        // <>
        <Container fluid>
            <Row xs={1} md={3} className="g-4 bg-transparent">
                {props.tasks.map((task) => (
                    <Col key={task.id}>
                        <TaskItem
                            title={task.title}
                            description={task.description}
                            onRemove={removeTaskHandler.bind(null, task.id)}
                            onUpdate={updateTaskHandler}
                            onFinish={finishTaskHandler.bind(null, task.id)}
                            task={task}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
        // </>

    );
};

export default TaskItemList;
