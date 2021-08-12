import React , { useContext} from 'react'
import { Route, Redirect } from 'react-router-dom';
import {DataContext} from '../GlobalState/DataContext'

const PrivateRoute = ({component: Component, ...rest}) => {

    const globaldata = useContext(DataContext)
    const User = globaldata.isLogged ;//window.localStorage.getItem('UserData')
    return (
        <Route {...rest} 
            render={props => (
                User ? <Component {...props} /> : <Redirect to="/users" />
        )} />
    )
}

export default PrivateRoute
