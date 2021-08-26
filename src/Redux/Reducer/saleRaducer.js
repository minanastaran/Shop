import {CHECK_OPEN_BAG ,
    UPDATE_OPENORDER ,
    CREATE_ORDER ,
    ADD_ORDERITEM,
    UPDATE_ORDER ,
    UPDATE_ORDER_ITEM,
    Delete_ORDER_ITEM,
    CREATE_SOLD_AND_EXIST_LIST
} from '../Constants/constants'

const initialState={
    orderid:null,
    userId:'',
    date:null,
    updatedate:null,
    state:'await' , // await , rez , sabt
    totalprice:0,

    //orderitem
    orderitem:[],

    soldlist:[],
};

export default function saleReducers(state=initialState,{type,payload}){
    switch(type){
        case UPDATE_OPENORDER:
            return{
                ...state,
                orderid:payload.orderid,
                userId:payload.userid
            }
        case CREATE_ORDER:
            return{
                ...state,
                orderid:payload.orderid,
                userId:payload.userId,
                date:payload.date,
                updatedate:payload.date
            }
        // case ADD_ORDERITEM:
        //     return{
        //         ...state,
        //     }
        case UPDATE_ORDER:
            return{
                ...state,
                totalprice:payload.totalprice,
                orderitem:[...state.orderitem , payload.orderitem]
            }
        // case UPDATE_ORDER_ITEM:
        //     return{
        //         ...state,
        //     }
        case Delete_ORDER_ITEM:
            return{
                ...state,
                totalprice:state.totalprice-payload.totalprice,
                orderitem:state.orderitem.filter((item)=>item.productid !== payload.orderitem)
            }
        case CREATE_SOLD_AND_EXIST_LIST:
            return{
                ...state,
                soldlist:payload,
                orderitem:[],
                orderid:null,
            }
        default:
            return state;
    }
}