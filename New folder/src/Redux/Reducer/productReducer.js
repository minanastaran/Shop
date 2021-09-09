import {PRODUCT_LIST_REQUEST ,
     SHOW_PRODUCT ,
     UPDATE_PRODUCT_AFTER_DELETE,
     UPDATE_PRODUCT_AFTER_ADD,
     SHOW_PRODUCT_DETAILS
    } from '../Constants/constants'

const initialState = {
    products: [],
    productdetails:{},

    //pagination
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: null,

    filter: {
        q: '',
        like: 0,
        price: 0,
        date:0,
    },

};

export default function productReducers(state = initialState, { type, payload }) {
    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                products:[]
            };
        case SHOW_PRODUCT:
            return {
                ...state,
                products:payload
            };
        case UPDATE_PRODUCT_AFTER_DELETE :
            let new_productList
            new_productList=state.products.filter(item => item._id !== payload)
            return{
                ...state,
                products:new_productList
            }
        case UPDATE_PRODUCT_AFTER_ADD :
            let new_productList2
            new_productList2=[payload,...state.products]
            return{
                ...state,
                products:new_productList2
            }
        /*-----------------------------------------*/
        case SHOW_PRODUCT_DETAILS:
            return {
                ...state,
                productdetails:payload
            };
        default:
            return state;
    }
}


