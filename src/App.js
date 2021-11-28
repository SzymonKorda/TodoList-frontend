import './App.css';
import Header from "./components/Task/Header";
import AddTask from "./components/Task/AddTask";
import {Route, Switch, Redirect} from "react-router-dom";
import Home from "./components/Task/Home";
import FinishedTaskList from "./components/Task/FinishedTaskList";

const App = () => {
    return (
        <div style={{
            backgroundColor: '#817f7f'
        }}>
            <Header/>
            <Switch>
                <Route path = "/active" component = {AddTask}/>
                <Route path = "/finished" component = {FinishedTaskList}/>
                <Route path = {["/", "/home"]} component = {Home}/>
            </Switch>
        </div>
    );
}

export default App;
