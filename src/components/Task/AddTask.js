import {Button, Container, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import AddTaskModal from "./AddTaskModal";
import TaskItemList from "./TaskItemList";
import ApiService from "../../utils/ApiService";
import UserContext from "../../store/user-context";

const AddTask = (props) => {
    const userCtx = useContext(UserContext);
    const [newTaskModalShow, setNewTaskModalShow] = useState(false);
    const [userActiveTasks, setUserActiveTasks] = useState([]);

    const handleTaskModalShow = () => {
        setNewTaskModalShow(true);
    };

    const handleTaskModalClose = () => {
        setNewTaskModalShow(false);
    }

    const addTask = () => {
        getUserActiveTasks();
    };

    const removeTask = (id) => {
        setUserActiveTasks(((prevState) => {
            return prevState.filter((task) => {
                return task.id !== id;
            })
        }))
    };

    const updateTask = (updatedTask) => {
        setUserActiveTasks((prevState) => {
           const taskToUpdateIndex =  prevState.findIndex((task) => {
               return task.id === updatedTask.id;
           })
            let updatedTasks = [...prevState];
            updatedTasks[taskToUpdateIndex] = updatedTask;
            return updatedTasks;
        });
    };

    const getUserActiveTasks = () => {
        ApiService.getUserActiveTasks()
            .then((response) => {
                setUserActiveTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        getUserActiveTasks();
    }, []);

    return (
        <>
            <Container fluid className="text-center mb-4">
                <Row>
                    <div className="h-100 p-5 bg-secondary">
                        <h2>The best task managing App</h2>
                        <p>Manage your tasks fast and easily</p>
                        {userCtx.isLoggedIn && <Button
                            variant="dark"
                            size="lg"
                            onClick={handleTaskModalShow}
                        >
                            Add Task
                        </Button>}
                    </div>
                </Row>
            </Container>
            {userCtx.isLoggedIn &&
            <TaskItemList
                tasks={userActiveTasks}
                onShowToast={userCtx.onShowToast}
                onRemove={removeTask}
                onUpdate={updateTask}
                onFinish={addTask}
            />}
            {newTaskModalShow && <AddTaskModal
                show={newTaskModalShow}
                onHide={handleTaskModalClose}
                onAddTask={addTask}
                onShowToast={userCtx.onShowToast}
            />}
        </>


    );
};

export default AddTask;
