import React from 'react'
import {Switch , Route , Redirect} from 'react-router-dom'
import PrivateRoute from '../Util/PrivateRoute'
//Pages
import Home from '../View/Home'
import AddProduct from '../View/AddProducts/AddProduct'
import Products from '../View/Products/Products'
import ProductDetails from '../View/ProductDetails/ProductDetails'
import Users from '../View/User/login'
import EditProduct from '../View/AddProducts/EditProduct'
import Profile from '../View/User/Profile/Profile'

const BodyPages = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <PrivateRoute path='/AddProduct' exact component={AddProduct}/>
            <Route path='/Products' exact component={Products}/>
            <Route path='/Product/:id' exact component={ProductDetails}/>
            <Route path='/users' exact component={Users}/>
            <PrivateRoute path='/Edit/:productid' exact component={EditProduct}/>
            <PrivateRoute path='/Profile/:uid' exact component={Profile}/>

            <Redirect to='/' exact component={Home}/>
        </Switch>
    )
}
export default BodyPages;
