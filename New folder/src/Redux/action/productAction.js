import { PRODUCT_LIST_REQUEST,
    SHOW_PRODUCT,
    UPDATE_PRODUCT_AFTER_DELETE,
    UPDATE_PRODUCT_AFTER_ADD,
    SHOW_PRODUCT_DETAILS
} from '../Constants/constants'
import axios from 'axios'

// axios.defaults.baseURL=;


export const ShowProductList = (cat,catitem) => async function(dispatch,getState){
    let data
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        if(catitem){
            data = await axios.post('http://localhost:5000/Products/searchbycatitem',{'catitem':catitem})
        }
        else if(cat){
            data = await axios.post('http://localhost:5000/Products/searchbycat',{'cat':cat})
        }
        else{
            data = await axios.get('http://localhost:5000/Products')
        }
        dispatch({type:SHOW_PRODUCT , payload:data.data.data})
    } catch (error) {
        console.log(error)
    }
}

export const AddNewProduct =(title,desc,price,soldprice,count,cat,catitem,totalimg,userId)=>async function (dispatch , getState){
    let new_product
    try {
        // dispatch(finduser())
        const FormData=require('form-data');
        const form =new FormData();
        form.append('title',title)
        form.append('desc',desc)
        form.append('price',price)
        form.append('sold_price',soldprice)
        form.append('count',count)
        form.append('cat',cat)
        form.append('catitem',catitem)
        // form.append('image',file_main)y
        
        for (let i = 0; i < totalimg.length; i++) {
            form.append('image',totalimg[i])
        }

        form.append('creator',userId)
        new_product = await axios.post('http://localhost:5000/Products/Add',form)
        if(new_product){
            dispatch({type:UPDATE_PRODUCT_AFTER_ADD , payload:new_product.data.data})
        }
    } catch (error) {
        console.log(error)
    }
}

export const DeleteProductById=(productid,usertoken)=> async function (dispatch , getState){
    let data
    try {
        data = await axios.delete(`http://localhost:5000/Products/Delete`,{
                data:{
                    'id':productid
                },
                headers: {
                    'Authorization': `Basic ${usertoken}` 
                  }
            })
        dispatch({type: UPDATE_PRODUCT_AFTER_DELETE,payload: productid})
    } catch (error) {
        console.log(error)
    }
}

export const DetailsProduct=(productid)=>async function (dispatch,getState){
    let product
    try {
        product=await axios.get(`http://localhost:5000/Products/${productid}`)
    } catch (error) {
        console.log(error)
    }
    dispatch({type:SHOW_PRODUCT_DETAILS,payload:product.data.data})
}



// export const DeleteProduct =()=>async function (dispatch , getState){
//     try {
//         await axios.delete(`http://localhost:5000/Products/Delete`,{
//             data:{
//                 'id':delete_productById
//             },
//             headers: {
//                 'Authorization': `Basic ${UserData.token}` 
//               }
//         })
//         .then(function (response) {
//             //handle success
//             console.log(response.data.message);
//             // setproducts(prevproducts =>
//             //     prevproducts.filter(post => post._id !== delete_productById)    
//             // )
//         })
//         .catch(function (response) {
//             //handle error
//             console.log(response);
//         });
        
//     } catch (error) {
        
//     }
// }

// export const clearFilters = () => {
//     return async function (dispatch) {
//         dispatch({
//             type: CLEAR_PRODUCT_FILTER,
//         })
//     }
// }

// export const loadProducts = () => {
//     return async function (dispatch, getState) {
//         dispatch(asyncActionStart());
//         try {
//             const params = axiosParams(getState)
//             const response = await agent.Products.list(params)
//             const companies = response.result.data

//             const { current_page, last_page, per_page, total } = response.result
//             dispatch({
//                 type: FETCH_PRODUCTS,
//                 payload: {
//                     companies,
//                     current_page, last_page, per_page, total
//                 }
//             });
//             dispatch(asyncActionFinish());
//         } catch (error) {
//             dispatch(asyncActionError(error));
//         }
//     };
// }