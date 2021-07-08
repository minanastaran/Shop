import React from 'react'
import {Route} from 'react-router-dom'
//Pages
import Home from '../View/Home'
import Products from '../View/Products'
import ProductDetails from '../View/ProductDetails'

const BodyPages = () => {
    return (
        <div>
            <Route path='/' exact component={Home}/>
            <Route path='/Products' exact component={Products}/>
            <Route path='/Product' exact component={ProductDetails}/>
        </div>
    )
}
export default BodyPages;
