import React, { useEffect, useState , useContext } from 'react'
import axios from '../../api/baseurl';
import { useParams, useHistory } from 'react-router';
import { Container, Box, Button , IconButton, Breadcrumbs, Link } from '@material-ui/core';
import { Edit, ArrowBackIos, DriveEta } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import products from '../../DataBase/DBtest'
import GallerySlider from '../../Components/GallerySlider/GallerySlider'

import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import {DataContext} from '../../GlobalState/DataContext'
import { MessageLang } from '../../Languages/Provider';

//Redux
import { useSelector , useDispatch } from 'react-redux';
import {DetailsProduct} from '../../Redux/action/productAction'
import {CheckOrder ,CreateOrderItem} from '../../Redux/action/saleAction'

const ProductDetails = () => {

    const dispatch=useDispatch()
    const  products=useSelector((state)=> state.product.productdetails)
    const  sale =useSelector((state)=> state.sale)

    const UserData = JSON.parse(window.localStorage.getItem("UserData"))
    const globaldata = useContext(DataContext)

    const history = useHistory()
    const product_id = useParams().id

    const [likelist, setlikelist] = useState([])
    const [like, setlike] = useState()
    // const [products, setproducts] = useState({})
    const [Edit_products, setEdit_products] = useState(false)


    useEffect(() => {
        ShowProduct()
        Getmyfav()
    }, [])

    const ShowProduct=()=>{
        dispatch(DetailsProduct(product_id))
    }

    const Getmyfav=()=>{
        axios.get(`http://localhost:5000/User/mylikelist/${UserData.userId}`)
            .then(function (response) {
               setlikelist(response.data.data)
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    const addlike = (id,count,value) => {
        if(value){
           
            axios.post(`http://localhost:5000/Products/addlike`, {
            
                    'productid': id,
                    'userid':UserData.userId,
                    'count':count+1
            })
            .then(function (response) {
                //handle success
                ShowProduct()
                Getmyfav()
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        }
        else{
            axios.post(`http://localhost:5000/Products/dislike`,{
                'productid': id,
                'userid':UserData.userId,
                'count':count-1
            })
            .then(function (response) {
                //handle success
                ShowProduct()
                Getmyfav()
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        }
        ShowProduct()
        Getmyfav()
    }

    const handleClick = (cat,catitem) => { 
        if(!catitem){
            history.push(`/Products/${cat._id}`)
        }
        else{
            history.push(`/Products/${cat._id}/${catitem._id}`)
        }
    }

    const ShowEditProduct = (productid) => {
        history.push({
            pathname: `/Edit/${productid}`,
            state: { data: products }
        })
    }
    
    const AddToBag=(productid,title,image,count,price)=>{
        //exist order >>> add orderitem
        if(sale.orderid){
            dispatch(CreateOrderItem(productid,title,image,count,price))
        }
        //null >> create order & add orderitem
        else{
            dispatch(CheckOrder(UserData.userId,productid,title,image,count,price))
        }
    }

    let mainimg=products.image
    let showgallery= mainimg && products.gallery && mainimg.concat(products.gallery)

    return (
        <Container>
            <div className="BodyPages">
                {products &&
                    <Card className="productDetails">
                        <IconButton aria-label="delete" className='back' onClick={() => history.goBack()}>
                            <ArrowBackIos />
                        </IconButton>
                        <div>

                            <Box >
                            <GallerySlider list={showgallery}/>
                            <CardContent>
                                <Breadcrumbs aria-label="breadcrumb">
                                    {products.cat && 
                                        <Link color="inherit" onClick={()=>handleClick(products.cat,false)}>
                                            {products.cat._id}
                                        </Link>
                                    }
                                    {products.catitem && 
                                        <Link color="inherit"  onClick={()=>handleClick(products.cat,products.catitem)}>
                                            {products.catitem._id}
                                        </Link>
                                    }
                                    <Typography color="textPrimary">{products.title}</Typography>
                                </Breadcrumbs>
                                <Checkbox icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                    name="checkedH"
                                    checked={likelist.includes(products._id)}
                                    onChange={e => addlike(products._id,products.like,e.target.checked)} />
                                {/* </Typography> */}
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {products.desc}
                                </Typography>
                            </CardContent>

                            <Box className='footer'>
                                <div variant="contained" className="priceBox">
                                    <Typography className="priceBox_text" variant="body2" color="textSecondary" component="p">
                                        {products.price}
                                    </Typography>
                                </div>

                                {UserData && UserData.userId === products.creator &&
                                    <IconButton aria-label="add an alarm" onClick={() => ShowEditProduct(products._id)}>
                                        <Edit />
                                        ویرایش
                                    </IconButton>
                                }
                            </Box>
                                
                               <Box  mt={3}>
                               <Button
                                    size="large"
                                    className='addbtn'
                                    disabled={products.count===0 ? true : false}
                                    onClick={() => AddToBag(products._id,products.title,products.image[0],1,products.price)}
                                    fullwidth
                                >
                                    {products.count===0 ? 'ناموجود' : <MessageLang id="AddtoBag" />}
                                </Button>
                               </Box>
                            </Box>
                        </div>
                    </Card>
                }
            </div>
        </Container>
    )
}

export default ProductDetails

///*-------------------------------------------------------------------------------------*/

// import React, { useEffect, useState , useContext } from 'react'
// import axios from '../../api/baseurl';
// import { useParams, useHistory } from 'react-router';
// import { Container, Box, Button , IconButton, Breadcrumbs, Link } from '@material-ui/core';
// import { Edit, ArrowBackIos, DriveEta } from '@material-ui/icons';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
// import products from '../../DataBase/DBtest'
// import GallerySlider from '../../Components/GallerySlider/GallerySlider'

// import Checkbox from '@material-ui/core/Checkbox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// import {DataContext} from '../../GlobalState/DataContext'
// import { MessageLang } from '../../Languages/Provider';

// const ProductDetails = () => {

//     const UserData = JSON.parse(window.localStorage.getItem("UserData"))
//     const globaldata = useContext(DataContext)

//     const history = useHistory()
//     const product_id = useParams().id

//     const [likelist, setlikelist] = useState([])
//     const [like, setlike] = useState()
//     const [products, setproducts] = useState({})
//     const [Edit_products, setEdit_products] = useState(false)


//     useEffect(() => {
//         ShowProduct()
//         Getmyfav()
//     }, [])

//     const ShowProduct=()=>{
//         axios.get(`http://localhost:5000/Products/${product_id}`)
//         .then(function (response) {
//             //handle success
//             setproducts(response.data.data)
//         })
//         .catch(function (response) {
//             //handle error
//             console.log(response);
//         });
//     }
//     const Getmyfav=()=>{
//         axios.get(`http://localhost:5000/User/mylikelist/${UserData.userId}`)
//             .then(function (response) {
//                setlikelist(response.data.data)
//             })
//             .catch(function (response) {
//                 //handle error
//                 console.log(response);
//             });
//     }

//     const addlike = (id,count,value) => {
//         if(value){
           
//             axios.post(`http://localhost:5000/Products/addlike`, {
            
//                     'productid': id,
//                     'userid':UserData.userId,
//                     'count':count+1
//             })
//             .then(function (response) {
//                 //handle success
//                 ShowProduct()
//                 Getmyfav()
//             })
//             .catch(function (response) {
//                 //handle error
//                 console.log(response);
//             });
//         }
//         else{
//             axios.post(`http://localhost:5000/Products/dislike`,{
//                 'productid': id,
//                 'userid':UserData.userId,
//                 'count':count-1
//             })
//             .then(function (response) {
//                 //handle success
//                 ShowProduct()
//                 Getmyfav()
//             })
//             .catch(function (response) {
//                 //handle error
//                 console.log(response);
//             });
//         }
//         ShowProduct()
//         Getmyfav()
//     }

//     const handleClick = (cat,catitem) => { 
//         if(!catitem){
//             history.push(`/Products/${cat._id}`)
//         }
//         else{
//             history.push(`/Products/${cat._id}/${catitem._id}`)
//         }
//     }

//     const ShowEditProduct = (productid) => {
//         history.push({
//             pathname: `/Edit/${productid}`,
//             state: { data: products }
//         })
//     }
    
//     const AddToBag=(id,count,price)=>{
//         axios.post(`http://localhost:5000/Sale/Add`,{
//             'userId':UserData.userId,
//             'productId':id,
//             'count':count,
//             'price':price
//         })
//         .then(function (response) {
//             globaldata.mybag()
//             //handle success
//             // console.log(response.data.data.orderItems.length+" <<<")
//             // bag_number=response.data.data.orderItems.length
//             // setaddtobag(true)
//         })
//         .catch(function (response) {
//             //handle error
//             console.log(response);
//         });
//     }

//     let mainimg=products.image
//     let showgallery= mainimg && products.gallery && mainimg.concat(products.gallery)

//     return (
//         <Container>
//             <div className="BodyPages">
//                 {products &&
//                     <Card className="productDetails">
//                         <IconButton aria-label="delete" className='back' onClick={() => history.goBack()}>
//                             <ArrowBackIos />
//                         </IconButton>
//                         <div>

//                             <Box >
//                             <GallerySlider list={showgallery}/>
//                             <CardContent>
//                                 <Breadcrumbs aria-label="breadcrumb">
//                                     {products.cat && 
//                                         <Link color="inherit" onClick={()=>handleClick(products.cat,false)}>
//                                             {products.cat._id}
//                                         </Link>
//                                     }
//                                     {products.catitem && 
//                                         <Link color="inherit"  onClick={()=>handleClick(products.cat,products.catitem)}>
//                                             {products.catitem._id}
//                                         </Link>
//                                     }
//                                     <Typography color="textPrimary">{products.title}</Typography>
//                                 </Breadcrumbs>
//                                 <Checkbox icon={<FavoriteBorder />}
//                                     checkedIcon={<Favorite />}
//                                     name="checkedH"
//                                     checked={likelist.includes(products._id)}
//                                     onChange={e => addlike(products._id,products.like,e.target.checked)} />
//                                 {/* </Typography> */}
//                                 <Typography variant="body2" color="textSecondary" component="p">
//                                     {products.desc}
//                                 </Typography>
//                             </CardContent>

//                             <Box className='footer'>
//                                 <div variant="contained" className="priceBox">
//                                     <Typography className="priceBox_text" variant="body2" color="textSecondary" component="p">
//                                         {products.price}
//                                     </Typography>
//                                 </div>

//                                 {UserData && UserData.userId === products.creator &&
//                                     <IconButton aria-label="add an alarm" onClick={() => ShowEditProduct(products._id)}>
//                                         <Edit />
//                                         ویرایش
//                                     </IconButton>
//                                 }
//                             </Box>
                                
//                                <Box  mt={3}>
//                                <Button
//                                     size="large"
//                                     className='addbtn'
//                                     disabled={products.count===0 ? true : false}
//                                     onClick={() => AddToBag(products._id,1,products.price)}
//                                     fullwidth
//                                 >
//                                     {products.count===0 ? 'ناموجود' : <MessageLang id="AddtoBag" />}
//                                 </Button>
//                                </Box>
//                             </Box>
//                         </div>
//                     </Card>
//                 }
//             </div>
//         </Container>
//     )
// }

// export default ProductDetails
