import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { Container, Grid ,Button,Box , IconButton , Typography} from '@material-ui/core';
import { DataContext } from '../../GlobalState/DataContext';
import {MonetizationOn , Close} from '@material-ui/icons';
//component
import ItemList from '../MyBag/ItemList';

//Redux
import { useSelector , useDispatch} from 'react-redux';
import {CreateSoldAndExistList , Deletelastinvoice} from '../../Redux/action/saleAction'

const Invoice = () => {

    const globaldata=useContext(DataContext)
    const [myorders,setmyorders]=useState([])
    let history = useHistory()
    let dispatch=useDispatch() 
    let order_sold= useSelector(state => state.sale.soldlist)
    
    useEffect(() => {
        dispatch(Deletelastinvoice(globaldata.userdata.userId))
        show_my_invoice()
    }, [])

    const show_my_invoice = () =>{
        if(globaldata){
            axios.post('http://localhost:5000/sale/myinvoice',{
                'userId':globaldata.userdata.userId,
            })
            .then(function (response) {
                //handle success
                setmyorders(response.data.data)
                console.log(JSON.stringify(response.data.data))
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        }
    }

    const SubmitHandler =() =>{
        axios.post('http://localhost:5000/sale/addfactor',{
            'orderId':myorders._id
        })
        .then(function (response) {
            //handle success
            console.log(response.data.data)
            history.push('/Products')
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    const CancelHandler =()=>{
        axios.post('http://localhost:5000/sale/deleteInvoice',{
                'orderId':myorders._id
        })
        .then(function (response) {
            //handle success
            console.log(response.data.data)
            history.push('/Products')
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    return (
        <div className="BodyPages">
            <Container>
                <Box className='invoice'>
                        <Typography>{globaldata.userdata.userName} عزیز</Typography>
                        <hr/>
                        <ul>
                            <li>
                                <Grid container >
                                    <Grid item xs={3}>نام کالا</Grid>
                                    <Grid item xs={3}>تعداد</Grid>
                                    <Grid item xs={3}>قیمت پایه</Grid>
                                    <Grid item xs={3}>قیمت کل</Grid>
                                </Grid>
                            </li>
                        {myorders && myorders.orderItems && myorders.orderItems.map((item,index)=>{
                            return(
                                <li key={index}>
                                    <ItemList key={index} data={
                                       { image:item.productId.image[0],
                                        title:item.productId.title,
                                        count:item.count,
                                        price:item.productId.price}} />
                                    {/* <Grid container >
                                        <Grid item xs={3}>{item.productId.title}</Grid>
                                        <Grid item xs={3}>{item.count}</Grid>
                                        <Grid item xs={3}>{item.productId.price}</Grid>
                                        <Grid item xs={3}>{item.count*item.productId.price}</Grid>
                                    </Grid> */}
                                </li>
                            )
                        })}
                        {order_sold && order_sold.length>0 && order_sold.map((item,index)=>{
                            return(
                                <li key={index} className='sold'>
                                    <Grid container >
                                        <Grid item xs={3}>{item.title}</Grid>
                                        <Grid item xs={3}>{item.count}</Grid>
                                        <Grid item xs={3}>{item.price}</Grid>
                                        <Grid item xs={3}>{item.count*item.price}</Grid>
                                    </Grid>
                            </li>
                            )
                        })}
                        </ul>
                        
                </Box>
                <Box className='invoicebtns'>
                    <Button variant="outlined" color="secondary" onClick={()=>SubmitHandler()}>
                        <MonetizationOn/>
                        پرداخت
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={()=>CancelHandler()}>
                        <Close/>
                        انصراف
                    </Button>
                </Box>
            </Container>
        </div>
    )
}

export default Invoice

///*------------------------------------------------------------------------------------- *///

// import React,{useState,useEffect,useContext} from 'react'
// import axios from 'axios';
// import { useHistory } from 'react-router';
// import { Container, Grid ,Button,Box , IconButton , Typography} from '@material-ui/core';
// import { DataContext } from '../../GlobalState/DataContext';
// import {MonetizationOn , Close} from '@material-ui/icons';

// const Invoice = () => {

//     const globaldata=useContext(DataContext)
//     const [myorders,setmyorders]=useState([])
//     let history = useHistory()
    
//     useEffect(() => {
//         show_my_invoice()
//     }, [])

//     const show_my_invoice = () =>{
//         if(globaldata.myorders){
//             axios.post('http://localhost:5000/sale/myinvoice',{
//                 'userId':globaldata.userdata.userId,
//             })
//             .then(function (response) {
//                 //handle success
//                 console.log(response.data.data)
//                 setmyorders(response.data.data)
//             })
//             .catch(function (response) {
//                 //handle error
//                 console.log(response);
//             });
//         }
//     }

//     const SubmitHandler =() =>{
//         axios.post('http://localhost:5000/sale/addfactor',{
//             'orderId':myorders._id
//         })
//         .then(function (response) {
//             //handle success
//             console.log(response.data.data)
//             history.push('/Products')
//         })
//         .catch(function (response) {
//             //handle error
//             console.log(response);
//         });
//     }

//     const CancelHandler =()=>{
//         axios.post('http://localhost:5000/sale/deleteInvoice',{
//                 'orderId':myorders._id
//         })
//         .then(function (response) {
//             //handle success
//             console.log(response.data.data)
//             history.push('/Products')
//         })
//         .catch(function (response) {
//             //handle error
//             console.log(response);
//         });
//     }

//     return (
//         <div className="BodyPages">
//             <Container>
//                 <Box className='invoice'>
//                         <Typography>{globaldata.userdata.userName} عزیز</Typography>
//                         <hr/>

//                         <ul>
//                             <li>
//                                 <Grid container >
//                                     <Grid item xs={3}>نام کالا</Grid>
//                                     <Grid item xs={3}>تعداد</Grid>
//                                     <Grid item xs={3}>قیمت پایه</Grid>
//                                     <Grid item xs={3}>قیمت کل</Grid>
//                                 </Grid>
//                             </li>
//                         {myorders && myorders.orderItems && myorders.orderItems.map((item,index)=>{
//                             return(
//                                 <li key={index}>
//                                     <Grid container >
//                                         <Grid item xs={3}>{item.productId.title}</Grid>
//                                         <Grid item xs={3}>{item.count}</Grid>
//                                         <Grid item xs={3}>{item.productId.price}</Grid>
//                                         <Grid item xs={3}>{item.count*item.productId.price}</Grid>
//                                     </Grid>
//                             </li>
//                             )
//                         })}
//                         </ul>
                        
//                 </Box>
//                 <Box className='invoicebtns'>
//                     <Button variant="outlined" color="secondary" onClick={()=>SubmitHandler()}>
//                         <MonetizationOn/>
//                         پرداخت
//                     </Button>
//                     <Button variant="outlined" color="secondary" onClick={()=>CancelHandler()}>
//                         <Close/>
//                         انصراف
//                     </Button>
//                 </Box>
//             </Container>
//         </div>
//     )
// }

// export default Invoice
