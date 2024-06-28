import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as AuthService from '../../service/AuthService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                const isAuthenticated = AuthService.isAuthenticated();
                if (isAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
    );
};

export default ProtectedRoute;
