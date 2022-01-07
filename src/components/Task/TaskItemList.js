import {Alert, Button, CardGroup, Col, Container, Row} from "react-bootstrap";
import TaskItem from "./TaskItem";
import ApiService from "../../utils/ApiService";
import {toast} from "react-toastify";
import {useState} from "react";

const TaskItemList = (props) => {
    const removeTaskHandler = (id) => {
        ApiService.delete(`task/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                toast.error(response.data);
                props.onRemove(id);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    };

    const updateTaskHandler = (updatedTask) => {
        ApiService.put(`task/${updatedTask.id}`, {
            title: updatedTask.title,
            description: updatedTask.description
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                toast.warning(response.data);
                props.onUpdate(updatedTask);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    };

    const finishTaskHandler = (id) => {
        ApiService.post(`task/${id}/finish`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
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
        <Container fluid className={'mb-4'} style={{
            backgroundColor: '#817f7f'
        }}>
            <Row xs={1} md={3} className="g-4 ">
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
