import React from 'react'
import { Box , Grid, IconButton , Button , Typography,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const ItemList = ({data , Delete}) => {

    console.log(data)
    return (
        <Grid container xs={12} className='list__item'>
            
            <Grid item xs={4}>
                <img src={`http://localhost:5000/${data.productId.image[0]}`} alt={''} className="imgitem"/>
            </Grid>
            <Grid item xs={8} className='desc'>
                <IconButton onClick={()=>Delete(data._id,data.productId.price * data.count)}>
                    <CloseIcon />
                </IconButton>
                <Typography className='title'>{data.productId.title}</Typography>
                <Typography className='count'>{data.count} عدد</Typography>
                <Typography className='price'>{data.productId.price * data.count} تومان</Typography>
            </Grid>
        </Grid>
    )
}

export default ItemList
