import {useState, useEffect} from "react";
import {Button, Container, Table} from "react-bootstrap";
import ApiService from "../../utils/ApiService";
import {toast} from "react-toastify";

const FinishedTaskList = () => {
    const [userFinishedTasks, setUserFinishedTasks] = useState([]);

    useEffect(() => {
        getUserActiveTasks();
    }, []);

    const getUserActiveTasks = () => {
        ApiService.get('task', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                //TODO why active instead of isActive => check getUserTasks on backend
                let taskList = response.data;
                taskList = taskList.filter((task) => {
                    return !task.active
                })
                console.log(taskList);
                setUserFinishedTasks(taskList);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const removeTaskHandler = (id) => {
        ApiService.delete(`task/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                toast.error(response.data);
                getUserActiveTasks();
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    };

    return (
        <Container className={'mt-5'}>
            <Table striped bordered hover variant={"dark"}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created On</th>
                    <th>Finished On</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {userFinishedTasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.createdOn}</td>
                        <td>{task.finishedOn}</td>
                        <td>
                            <Button
                                variant={"danger"}
                                size={"sm"}
                                onClick={removeTaskHandler.bind(null, task.id)}>
                                Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default FinishedTaskList;
