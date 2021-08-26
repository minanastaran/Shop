import axios from "axios"
import {CHECK_OPEN_BAG ,
    UPDATE_OPENORDER ,
    CREATE_ORDER ,
    ADD_ORDERITEM,
    UPDATE_ORDER ,
    UPDATE_ORDER_ITEM,
    Delete_ORDER_ITEM,
    CREATE_SOLD_AND_EXIST_LIST
} from '../Constants/constants'
import {ShowProductList} from './productAction'
import { useSelector } from "react-redux"

export const CheckOrder = (userId,productid,title,image,count,price)=>async function (dispatch,getState){
    let result
    try {
        result=await axios.post('http://localhost:5000/Sale/checkbagstate',{
            'userId':userId
        })
        if(!result.data){
            console.log(11)
            dispatch(CreateOrder(userId,productid,title,image,count,price))
        }
        else{
            console.log(22)
            dispatch(UpdateCheckOrder(result.data._id,userId))
            dispatch(CreateOrderItem(productid,title,image,count,price))
        }
    } catch (error) {
        console.log(error)
    }
}

export const UpdateCheckOrder = (orderid,userid)=>async function (dispatch,getState){
    dispatch({
        type: UPDATE_OPENORDER,
        payload:{
            orderid:orderid ,
            userid:userid}
    })
}

export const CreateOrder = (userid,productid,title,image,count,price) => async function (dispatch,getState){
    let result
    try {
        result=await axios.post('http://localhost:5000/Sale/createOrder',{
            'userId':userid
        })
    } catch (error) {
        console.log(error)
    }
    dispatch({
        type:CREATE_ORDER,
        payload:{
            orderid:result.data.data._id,
            userId:userid,
            date:new Date()
        }
    })
    // dispatch(UpdateCheckOrder(userid))
    dispatch(CreateOrderItem(productid,title,image,count,price))
}

export const CreateOrderItem = (productid,title,image,count,price)=>async function (dispatch,getState){
    //check exist product 
    dispatch({
        type: UPDATE_ORDER,
        payload:{
            totalprice:getState().sale.totalprice + (price*count),
            orderitem:{
                Order:getState().sale.orderid,
                productid:productid,
                image:image,
                title:title,
                count:count,
                price:price,
                date:new Date()
            }
        }
    })
}

export const DeleteOrderItem = (product_id,price) => async function (dispatch,getState){
    dispatch({
        type: Delete_ORDER_ITEM,
        payload:{
            totalprice:price,
            orderitem:product_id
        }
    })
}

export const CheckExsistProduct = (orderitems)=>async function (dispatch,getState){
    let result
    try {
        result = await axios.post('http://localhost:5000/sale/createinvice',{
            'orderitems':orderitems
        })
        if(result){
            // console.log(result.data.data+"!!!!")
            dispatch(CreateSoldAndExistList(result.data.message))
        }
    } catch (error) {
        console.log(error)
    }
}

export const Deletelastinvoice=(user)=>async function (dispatch , getState){
    try {
        await axios.post(`http://localhost:5000/sale/lastinvoice`,{
            'userId':user
        })
    } catch (error) {
        console.log(error)
    }
}

export const CreateSoldAndExistList = (list)=>async function (dispatch,getState){
    dispatch({
        type: CREATE_SOLD_AND_EXIST_LIST,
        payload:list.sold
    })
}
/*-----------------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------------------*/