import React from 'react'
import { useParams } from 'react-router';
import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import products from '../../DataBase/DBtest'

const ProductDetails = () => {

    const car_id=useParams().id
    const data=products.find((item)=>{return item._id===car_id})

    return (
         <Container>
            <div className="BodyPages">
                <Card className="productDetails">
                    <div>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={data.image}
                            title={data.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {data.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {data.desc}
                            </Typography>
                        </CardContent>
                        
                        <div variant="contained" className="priceBox">
                            <Typography className="priceBox_text" variant="body2" color="textSecondary" component="p">
                                {data.price}
                            </Typography>
                        </div>
                    </div>
                </Card>
            </div> 
        </Container>
    )
}

export default ProductDetails
