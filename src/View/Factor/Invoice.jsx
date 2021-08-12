import React,{useEffect,useContext} from 'react'
import axios from 'axios';
import { Container, Grid ,Button,Box , IconButton , Typography} from '@material-ui/core';
import { DataContext } from '../../GlobalState/DataContext';

const Invoice = () => {

    const globalstate=useContext(DataContext)
    
    useEffect(() => {
        submit_my_orders()
    }, [])

    const submit_my_orders=()=>{
        // console.log(JSON.stringify(globalstate.myorders) + " === " + globalstate.myorders.orderItems)
       if(globalstate.myorders){
        axios.post('http://localhost:5000/sale/invoice',{
            'userid':globalstate.userdata.userId,
            'orderid':globalstate.myorders._id,
            'orderitems':globalstate.myorders.orderItems
        })
        .then(function (response) {
            //handle success
            console.log(response.data);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
       }
    }

    return (
        <div className="BodyPages">
            <Container>
                <Box className='invice'>
                        <Typography>{globalstate.userdata.userName} عزیز</Typography>
                        <hr/>
                        
                </Box>
            </Container>
        </div>
    )
}

export default Invoice
