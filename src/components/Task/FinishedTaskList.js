import {useState, useEffect} from "react";
import {Container, Table} from "react-bootstrap";
import ApiService from "../../utils/ApiService";

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

    return (
        <Container className={'mt-5'}>
            <Table striped bordered hover variant={"dark"}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {userFinishedTasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default FinishedTaskList;
