import React from 'react';

const UserContext = React.createContext({
    isLoggedIn: false,
    onLogin: (username, token) => {},
    onLogout: () => {},
    displayedUsername: '',
    onShowToast: (response) => {}
});

export default UserContext;
