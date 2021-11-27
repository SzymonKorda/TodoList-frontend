import {Button, Container, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import AddTaskModal from "./AddTaskModal";
import TaskItemList from "./TaskItemList";
import ApiService from "../../utils/ApiService";
import UserContext from "../../store/user-context";

const AddTask = (props) => {
    const userCtx = useContext(UserContext);
    const [newTaskModalShow, setNewTaskModalShow] = useState(false);
    const [userTasks, setUserTasks] = useState([]);

    const handleTaskModalShow = () => {
        setNewTaskModalShow(true);
    };

    const handleTaskModalClose = () => {
        setNewTaskModalShow(false);
    }

    const addTask = () => {
        getUserTasks();
    };

    const getUserTasks = () => {
        ApiService.get('task', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                // console.log(response.data);
                setUserTasks(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        getUserTasks();
    }, []);

    return (
        <>
            <Container fluid className="text-center mb-4">
                <Row>
                    <div className="h-100 p-5 bg-secondary">
                        <h2>The best task managing App</h2>
                        <p>Manage your tasks fast and easily</p>
                        {props.isLoggedIn && <Button
                            variant="dark"
                            size="lg"
                            onClick={handleTaskModalShow}
                        >
                            Add Task
                        </Button>}
                    </div>
                </Row>
            </Container>
            {props.isLoggedIn && <TaskItemList tasks={userTasks}/>}
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
