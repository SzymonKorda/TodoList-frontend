import './App.css';
import Header from "./components/Task/Header";
import AddTask from "./components/Task/AddTask";
import {Route, Switch, Redirect} from "react-router-dom";
import Home from "./components/Task/Home";
import FinishedTaskList from "./components/Task/FinishedTaskList";
import {ToastContainer} from "react-toastify";
import React, {useContext} from "react";
import UserContext from "./store/user-context";
import ProtectedRoute from "./components/Task/ProtectedRoute";

const App = () => {
    return (
        <div
            style={{
                backgroundColor: '#817f7f'
            }}
        >
            <ToastContainer
                position="top-center"
                theme="colored"
                autoClose={4000}
                hideProgressBar={false}
                pauseOnHover={false}
                closeOnClick={true}
                draggable={true}
                progress={undefined}
            />
            <Header/>
            {/*TODO safe router links*/}
            <Switch>
                <Route exact path={["/", "/home"]} component={Home}/>
                <ProtectedRoute exact path="/active" component={AddTask}/>
                <ProtectedRoute exact path="/finished" component={FinishedTaskList}/>
            </Switch>
        </div>
    )
        ;
}

export default App;
