import './App.css';
import {useContext, useState} from "react";
import axios from "axios";
import Header from "./components/Task/Header";
import Jumbotron from "./components/Task/Jumbotron";
import TaskItemList from "./components/Task/TaskItemList";
import NewTaskModal from "./components/Task/NewTaskModal";
import CustomToast from "./components/Task/CustomToast";
import UserContextProvider from "./store/UserContextProvider";
import UserContext from "./store/user-context";


const App = () => {
    const [newTaskModalShow, setNewTaskModalShow] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [toastShow, setToastShow] = useState(false);
    const userCtx = useContext(UserContext);


    const handleTaskModalShow = () => {
        setNewTaskModalShow(true);
    };

    const handleTaskModalClose = () => {
        setNewTaskModalShow(false);
    }

    const handleToastClose = () => {
        setToastShow(false);
    };

    const addTaskHandler = (enteredTitle, enteredDescription) => {
        setNewTaskModalShow(false);
        setToastShow(true);
        // const task = {
        //     id: Math.random().toString(),
        //     title: enteredTitle,
        //     description: enteredDescription
        // };
        // setTaskList((prevState => {
        //     return [task, ...prevState];
        // }));
        const task1 = {
            title: enteredTitle,
            description: enteredDescription
        }
        axios.post('http://localhost:8080/api/task', task1, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            }
        })
            .then((response) => {
                axios.get('http://localhost:8080/api/task', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('Token')
                    }
                })
                    .then((response) => {
                        console.log(response.data);
                        setTaskList(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <UserContextProvider>
            <Header/>
            {!userCtx.isLoggedIn && <Jumbotron onShowModal={handleTaskModalShow} loggedIn={!userCtx.isLoggedIn}/>}
            {!userCtx.isLoggedIn ? <TaskItemList tasks={taskList}/> :
                <Jumbotron onShowModal={handleTaskModalShow} loggedIn={!userCtx.isLoggedIn}/>}
            {newTaskModalShow && <NewTaskModal
                show={newTaskModalShow}
                onHide={handleTaskModalClose}
                onAdd={addTaskHandler}/>}
            {toastShow && <CustomToast
                show={toastShow}
                onClose={handleToastClose}
                message={'Task added successfully!'}
            />}
        </UserContextProvider>
    );
}

export default App;
