import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { Grid, Box, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ItemList from './ItemList';
import { DataContext } from '../../GlobalState/DataContext.js'
//Redux
import { useDispatch,useSelector } from 'react-redux';
import {DeleteOrderItem , CheckExsistProduct} from '../../Redux/action/saleAction'
import {ShowProductList} from '../../Redux/action/productAction'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const MyBag = ({ show, close }) => {

  const dispatch = useDispatch()
  let products=useSelector((state)=> state.sale)
  
  const globaldata = useContext(DataContext)

  const [open, setOpen] = React.useState(show);
  const [itemlist, setitemlist] = useState();
  const history = useHistory()

  useEffect(() => {
    // dispatch(ShowProductList())
    // setitemlist(products.orderitem)
  }, [])

  const handleClose = () => {
    setOpen(false);
    close()
  };

  const sendtofactor = () => {
    if(products && products.orderitem.length>0){
      console.log(products.orderitem);
      dispatch(CheckExsistProduct(products.orderitem))
        history.push('/Invoice')
        handleClose()
     }
  }

  const DeleteOrderitem = (orderitem_id, price) => {
    dispatch(DeleteOrderItem(orderitem_id,price))
  }

  return (
    <div >
      {products &&
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" className='mybag'>
            <IconButton aria-label="close" onClick={handleClose} className="modal__header__close-btn">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className=''>
            <Box className='content'>
              <Box className='icon'>
                <ShoppingCartIcon />
              </Box>
              {products.orderitem.length>0?
                <Grid xs={12} className='list'>
                  {products.orderitem.map((item, index) =>
                    <ItemList key={index} data={item} Delete={DeleteOrderitem} />
                  )}
                  <Box className='total data'>
                    <Typography className='totalcount'> ?????????? ???? ?????????? ???????????? ?????? :{products.orderitem.length} ??????</Typography>
                    <Typography className='totalprice'> ?????? ???? : {products.totalprice}</Typography>
                  </Box>
                </Grid>
                :
                <Typography className='totalprice'>?????? ???????? ?????? ???????? ????????????</Typography>
              }
            </Box>
          </DialogContent>
          <DialogActions className='footer'>
            {products.orderitem.length > 0 &&
              <>
                <Button onClick={handleClose} color="primary">
                  ?????????? ????????
                </Button>
                <Button onClick={() => sendtofactor()} color="primary">
                  ?????? ????????
                </Button>
              </>
            }
          </DialogActions>

        </Dialog>

      }
    </div>
  )
}

export default MyBag

///*-----------------------------------------------------------------------------------------*///
// import React, { useState, useEffect, useContext } from 'react'
// import axios from 'axios';
// import { useHistory } from 'react-router';
// import { Grid, Box, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';
// import ItemList from './ItemList';
// import { DataContext } from '../../GlobalState/DataContext.js'

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });


// const MyBag = ({ show, close }) => {

//   // const UserData=JSON.parse(window.localStorage.getItem("UserData"))

//   const globaldata = useContext(DataContext)

//   const [open, setOpen] = React.useState(show);
//   const [itemlist, setitemlist] = React.useState();
//   const history = useHistory()

//   useEffect(() => {
//     ShowMyBag()
//   }, [])

//   const ShowMyBag = () => {
//     axios.post(`http://localhost:5000/Sale/showorder`, {
//       'userid': globaldata.userdata.userId
//     })
//       .then(function (response) {
//         //handle success
//         console.log(response.data.data)
//         setitemlist(response.data.data)
//       })
//       .catch(function (response) {
//         //handle error
//         console.log(response);
//       });
//   }

//   const handleClose = () => {
//     setOpen(false);
//     close()
//   };

//   const sendtofactor = () => {
//     if(globaldata.myorders){
//       axios.post('http://localhost:5000/sale/invoice',{
//           'userid':globaldata.userdata.userId,
//           'orderid':globaldata.myorders._id,
//           'order':globaldata.myorders
//       })
//       .then(function (response) {
//           //handle success
//           history.push('/Invoice')
//           handleClose()
//       })
//       .catch(function (response) {
//           //handle error
//           console.log(response);
//       });
//      }
//   }

//   const DeleteOrderitem = (id, price) => {
//     console.log(id)
//     axios.post(`http://localhost:5000/Sale/deleteOrderitem`, {
//       'orderId': itemlist._id,
//       'orderitemId': id,
//       'price': itemlist.totalprice - price,
//     })
//       .then(function (response) {
//         //handle success
//         ShowMyBag()
//         globaldata.mybag()
//       })
//       .catch(function (response) {
//         //handle error
//         console.log(response);
//       });
//   }

//   return (
//     <div >
//       {itemlist && itemlist.orderItems &&
//         <Dialog
//           open={open}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleClose}
//           aria-labelledby="alert-dialog-slide-title"
//           aria-describedby="alert-dialog-slide-description"
//         >
//           <DialogTitle id="alert-dialog-slide-title" className='mybag'>
//             <IconButton aria-label="close" onClick={handleClose} className="modal__header__close-btn">
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent className=''>
//             <Box className='content'>
//               <Box className='icon'>
//                 <ShoppingCartIcon />
//               </Box>
//               {itemlist.orderItems && itemlist.orderItems.length > 0 ?

//                 <Grid xs={12} className='list'>
//                   {itemlist && itemlist.orderItems.length > 0 && itemlist.orderItems.map((item, index) =>
//                     <ItemList key={index} data={item} Delete={DeleteOrderitem} />
//                   )}
//                   <Box className='total data'>
//                     <Typography className='totalcount'> ?????????? ???? ?????????? ???????????? ?????? :{itemlist.orderItems.length} ??????</Typography>
//                     <Typography className='totalprice'> ?????? ???? : {itemlist.totalprice}</Typography>
//                   </Box>
//                 </Grid>
//                 :
//                 <Typography className='totalprice'>?????? ???????? ?????? ???????? ????????????</Typography>
//               }
//             </Box>
//           </DialogContent>
//           <DialogActions className='footer'>
//             {itemlist.orderItems && itemlist.orderItems.length > 0 &&
//               <>
//                 <Button onClick={handleClose} color="primary">
//                   ?????????? ????????
//                 </Button>
//                 <Button onClick={() => sendtofactor()} color="primary">
//                   ?????? ????????
//                 </Button>
//               </>
//             }
//           </DialogActions>

//         </Dialog>

//       }
//     </div>
//   )
// }

// export default MyBag
