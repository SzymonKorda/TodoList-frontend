import './App.css';
import Header from "./components/Task/Header";
import AddTask from "./components/Task/AddTask";
import {Route, Switch, Redirect} from "react-router-dom";
import Home from "./components/Task/Home";
import FinishedTaskList from "./components/Task/FinishedTaskList";
import {ToastContainer} from "react-toastify";
import React, {useContext, useEffect} from "react";
import ProtectedRoute from "./components/Task/ProtectedRoute";
import PageNotFound from "./components/Task/PageNotFound";

const App = () => {
    return (
        <div>
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
            <Switch className={"bg-transparent"}>
                <Route exact path="/" component={Home}/>
                <ProtectedRoute path="/active" component={AddTask}/>
                <ProtectedRoute path="/finished" component={FinishedTaskList}/>
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    )
        ;
}

export default App;
