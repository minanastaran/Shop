import React from 'react'
import { combineReducers } from 'redux'
import  productReducer  from './productReducer'
import saleRaducer from './saleRaducer'
import langReducer from './langReducer'

const rootReducer = combineReducers({
    product:productReducer,
    sale:saleRaducer,
    lang:langReducer,
})

export default rootReducer
