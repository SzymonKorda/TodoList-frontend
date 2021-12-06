import React from 'react';

const UserContext = React.createContext({
    isLoggedIn: false,
    onLogin: (username, token) => {},
    onLogout: () => {},
    displayedUsername: ''
});

export default UserContext;
