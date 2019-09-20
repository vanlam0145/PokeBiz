import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const isAuth = localStorage.getItem('isAuth');
    return (
        <Route
            {...rest}
            render={props =>
                isAuth ? (
                    <Component {...props} {...rest} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                  from: props.location
                                }
                            }}
                        />
                    )
                }
        />
    );
}

export default PrivateRoute;