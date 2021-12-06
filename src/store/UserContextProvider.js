import React, {useEffect, useState} from "react";
import UserContext from "./user-context";
import {useHistory} from 'react-router-dom';
import {toast} from "react-toastify";

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

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        toast.success('User logout successfully!');
        routeChange('/home');
    };

    return (
        <UserContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                displayedUsername: displayedUsername,
                onLogin: loginHandler,
                onLogout: logoutHandler
            }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
