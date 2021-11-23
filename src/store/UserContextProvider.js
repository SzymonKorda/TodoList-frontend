import {useEffect, useState} from "react";
import UserContext from "./user-context";

const UserContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [displayedUsername, setDisplayedUsername] = useState('');

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isLoggedIn');
        if (isUserLoggedIn === '1') {
            const username = localStorage.getItem('username');
            setIsLoggedIn(true);
            setDisplayedUsername(username);
        }
    }, [])

    const loginHandler = (username, token) => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', '1');
        setDisplayedUsername(username);
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    };

    //TODO: add logout toast notification
    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
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
