import { Route, Redirect, RouteProps } from 'react-router-dom'
import React from 'react';


export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    isAllowed: boolean;
    restrictedPath: string;
    authenticationPath: string;
}

const PrivateRoute: React.FC<ProtectedRouteProps> = props => {
    let redirectPath = '';
    if (!props.isAuthenticated) {
        redirectPath = props.authenticationPath;
    }
    if (props.isAuthenticated && !props.isAllowed) {
        redirectPath = props.restrictedPath;
    }

    if (redirectPath) {
        const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
        return <Route {...props} />;
    }
}

export default PrivateRoute