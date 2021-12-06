import './App.css';
import Header from "./components/Task/Header";
import AddTask from "./components/Task/AddTask";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Task/Home";
import FinishedTaskList from "./components/Task/FinishedTaskList";
import {ToastContainer} from "react-toastify";
import React from "react";

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
            <Switch>
                <Route path="/active" component={AddTask}/>
                <Route path="/finished" component={FinishedTaskList}/>
                <Route path={["/", "/home"]} component={Home}/>
            </Switch>
        </div>
    )
        ;
}

export default App;
