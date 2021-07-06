import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../../store';

export type PrivateRouteProps = {
    component: React.Component<any, any>,
    
}


const PrivateRoute = ({component: Component, ...rest}: PrivateRouteProps) : JSX.Element => {
    
    const userState = useSelector<RootState, RootState["userState"]>((state: RootState) => state.userState);
    return (

        <Route {...rest} render={props => (
            userState.isUserLoggedIn ?
                <div></div>
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;