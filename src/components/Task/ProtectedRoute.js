import React, {useContext} from "react";
import {Redirect, Route, useHistory} from "react-router-dom";
import UserContext from "../../store/user-context";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const userCtx = useContext(UserContext);

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                userCtx.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};

export default ProtectedRoute;
