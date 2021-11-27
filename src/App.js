import './App.css';
import {useContext, useState} from "react";
import Header from "./components/Task/Header";
import AddTask from "./components/Task/AddTask";
import CustomToast from "./components/Task/CustomToast";
import UserContext from "./store/user-context";


const App = () => {
    const [toastShow, setToastShow] = useState(false);
    const userCtx = useContext(UserContext);
    const handleToastClose = () => {
        setToastShow(false);
    };

    return (
        <>
            <Header/>
            <AddTask isLoggedIn={userCtx.isLoggedIn}/>
            {toastShow && <CustomToast
                show={toastShow}
                onClose={handleToastClose}
                message={'Task added successfully!'}
            />}
        </>
    );
}

export default App;
