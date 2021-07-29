import React,{useEffect,useState} from 'react'
import axios from '../../api/baseurl';
import { useParams ,useHistory } from 'react-router';
import { Container,Box ,IconButton } from '@material-ui/core';
import  {Edit , ArrowBackIos} from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import products from '../../DataBase/DBtest'


import AddProduct from '../AddProducts/AddProduct'

const ProductDetails = () => {

    const UserData=JSON.parse(window.localStorage.getItem("UserData"))
    const history = useHistory()
    const car_id=useParams().id

    const [products,setproducts]=useState({})
    const [Edit_products,setEdit_products]=useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5000/Products/${car_id}`)
        .then(function (response) {
            //handle success
            setproducts(response.data.data)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }, [])


    const ShowEditProduct=(productid)=>{
        history.push({
            pathname:`/Edit/${productid}` , 
            state:{ data: products}
        })
    }

    return (
         <Container>
            <div className="BodyPages">
                {products  && 
                <Card className="productDetails">
                    <IconButton aria-label="delete" className='back' onClick={()=>history.goBack()}>
                        <ArrowBackIos />
                    </IconButton>
                <div>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={`http://localhost:5000/${products.image[0]}`}
                        title={products.name}
                    />
                   
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {products.name}
                        </Typography>
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
                            <IconButton  aria-label="add an alarm" onClick={()=>ShowEditProduct(products._id)}>  
                                <Edit />
                                ویرایش
                            </IconButton>
                        }
                    </Box>
                </div>
            </Card>
        }
            </div> 
        </Container>
    )
}

export default ProductDetails
