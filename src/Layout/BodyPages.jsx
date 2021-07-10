import React from 'react'
import {Switch , Route} from 'react-router-dom'
//Pages
import Home from '../View/Home'
import Products from '../View/Products/Products'
import ProductDetails from '../View/ProductDetails/ProductDetails'

const BodyPages = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/Products' exact component={Products}/>
            <Route path='/Product/:id' exact component={ProductDetails}/>
        </Switch>
    )
}
export default BodyPages;
