import {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import TaskItem from "./TaskItem";
import ApiService from "../../utils/ApiService";
import UpdateTaskModal from "./UpdateTaskModal";

const TaskItemList = (props) => {
    const removeTaskHandler = (id) => {
        ApiService.delete(`task/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                props.onRemove(id);
                props.onShowToast({
                    show: true,
                    message: response.data,
                    type: 'success'
                });
            })
            .catch((error) => {
                props.onShowToast({
                    show: true,
                    message: error.response.data,
                    type: 'danger'
                })
            })
    };

    const updateTaskHandler = (updatedTask) => {
        ApiService.put(`task/${updatedTask.id}`,  {
            title: updatedTask.title,
            description: updatedTask.description
        },   {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                props.onUpdate(updatedTask);
                props.onShowToast({
                    show: true,
                    message: response.data.message,
                    type: 'success'
                });
            })
            .catch((error) => {
                props.onShowToast({
                    show: true,
                    message: error.response.data,
                    type: 'danger'
                })
            })
    };

    return (
        <>
            <Container fluid className={'mb-4'} style={{
                backgroundColor: '#817f7f'
            }}>
                <Row xs={3} className="g-4 ">
                    {props.tasks.map((task) => (
                        <Col key={task.id}>
                            <TaskItem
                                title={task.title}
                                description={task.description}
                                onRemove={removeTaskHandler.bind(null, task.id)}
                                onUpdate={updateTaskHandler}
                                task={task}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>

    );
};

export default TaskItemList;
