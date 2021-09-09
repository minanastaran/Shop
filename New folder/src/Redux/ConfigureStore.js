import React from 'react'
import thunk from 'redux-thunk'
import { createStore , applyMiddleware } from 'redux'
//controll
import { devToolsEnhancer , composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './Reducer/rootReducer'
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist:['sale','lang']
}

const middleware=[thunk]

export const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(applyMiddleware(...middleware))
)

export const persisedStor = persistStore(store)


/*-------------------------------------------------------*/

// const ConfigureStore = () => {

//     const initialState={}
//     const middleware=[thunk]
//     return (
//         createStore(rootReducer,
//             initialState,
//             composeWithDevTools(applyMiddleware(...middleware))
//         )
//     )
// }

// export default ConfigureStore
