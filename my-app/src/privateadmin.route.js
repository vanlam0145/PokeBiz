import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateAdminRoute = ({
    component: Component,
    ...rest
}) => {
    const isAdmin = localStorage.getItem('isAdmin');
    return (
        <Route
            {...rest}
            render={props =>
                isAdmin ? (
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

export default PrivateAdminRoute;