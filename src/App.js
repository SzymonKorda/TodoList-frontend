import './App.css';
import {useState} from "react";
import axios from "axios";
import Navbar from "./components/Task/Header";
import Jumbotron from "./components/Task/Jumbotron";
import TaskItemList from "./components/Task/TaskItemList";
import NewTaskModal from "./components/Task/NewTaskModal";
import LoginUserModal from "./components/User/LoginUserModal";
import CustomToast from "./components/Task/CustomToast";


const App = () => {
    const [newTaskModalShow, setNewTaskModalShow] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [toastShow, setToastShow] = useState(false);
    // const [toastMessage, settoastMessage] = useState(false);
    const [loginUserModalShow, setLoginUserModalShow] = useState(false);
    const [userLogin, setUserLogin] = useState(false);
    const [changeUsername, setChangeUsername] = useState('');

    const handleTaskModalShow = () => {
        setNewTaskModalShow(true);
    };

    const handleTaskModalClose = () => {
        setNewTaskModalShow(false);
    }

    const handleLoginModalShow = () => {
        setLoginUserModalShow(true);
    };

    const handleLoginModalClose = () => {
        setLoginUserModalShow(false);
    };

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

    const loginUserHandler = (enteredUsername, enteredPassword) => {
        setLoginUserModalShow(false);
        const credentials = {
            username: enteredUsername,
            password: enteredPassword
        }
        axios.post('http://localhost:8080/api/auth/signin', credentials)
            .then((response) => {
                setChangeUsername(response.data.username);
                setUserLogin(true);
                localStorage.setItem('Token', response.data.accessToken);
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

    const handleUserLogout = () => {
        localStorage.removeItem('Token');
        setUserLogin(false);
    };

    return (
        <>
            <Navbar
                onLogin={handleLoginModalShow}
                isLogin={userLogin}
                username={changeUsername}
                onLogout={handleUserLogout}
            />
            {userLogin && <Jumbotron onShowModal={handleTaskModalShow} loggedIn={userLogin}/>}
            {userLogin ? <TaskItemList tasks={taskList}/> :
                <Jumbotron onShowModal={handleTaskModalShow} loggedIn={userLogin}/>}
            {newTaskModalShow && <NewTaskModal
                show={newTaskModalShow}
                onHide={handleTaskModalClose}
                onAdd={addTaskHandler}/>}
            {loginUserModalShow && <LoginUserModal
                show={loginUserModalShow}
                onHide={handleLoginModalClose}
                onSubmit={loginUserHandler}
            />}
            {toastShow && <CustomToast
                show={toastShow}
                onClose={handleToastClose}
                message={'Task added successfully!'}
            />}
        </>
    );
}

export default App;
