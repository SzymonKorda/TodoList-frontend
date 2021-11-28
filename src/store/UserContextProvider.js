import {useEffect, useState} from "react";
import UserContext from "./user-context";
import CustomToast from "../components/Task/CustomToast";
import {useHistory} from 'react-router-dom';

const UserContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [displayedUsername, setDisplayedUsername] = useState('');
    const [showToast, setShowToast] = useState({show: false, message: '', type: ''})

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isLoggedIn');
        if (isUserLoggedIn === '1') {
            const username = localStorage.getItem('username');
            setIsLoggedIn(true);
            setDisplayedUsername(username);
        }
    }, [])

    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    };

    const loginHandler = (username, token) => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', '1');
        setDisplayedUsername(username);
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        routeChange('/active');
    };

    //TODO: add logout toast notification
    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        const response = {
            show: true,
            message: 'User logout successfully!',
            type: 'success'
        }
        showToastHandler(response);
        routeChange('/home');
    };

    //TODO Toasts stacking
    const showToastHandler = (response) => {
        setShowToast({
            show: response.show,
            message: response.message,
            type: response.type
        })
    };

    const closeToastHandler = () => {
        setShowToast({
            show: false,
            message: '',
            type: ''
        })
    };

    return (
        <UserContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                displayedUsername: displayedUsername,
                onLogin: loginHandler,
                onLogout: logoutHandler,
                onShowToast: showToastHandler,
            }}>
            {props.children}
            {showToast.show && <CustomToast
                show={showToast.show}
                onClose={closeToastHandler}
                message={showToast.message}
                bg={showToast.type}
            />}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
