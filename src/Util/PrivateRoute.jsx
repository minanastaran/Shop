import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {

    const User = window.localStorage.getItem('UserData')
    return (
        <Route {...rest} 
            render={props => (
                User ? <Component {...props} /> : <Redirect to="/users" />
        )} />
    )
}

export default PrivateRoute
