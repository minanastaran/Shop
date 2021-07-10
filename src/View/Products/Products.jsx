import React from 'react'
import { Container, Grid , IconButton} from '@material-ui/core';
import { Link } from 'react-router-dom'
import products from '../../DataBase/DBtest';
//component
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//icon
import  {DeleteForever} from '@material-ui/icons';



const Products = () => {
    return (
        <Container>
            <Grid className="BodyPages product_card_content">
                {products.map((item, index) => (
                    <Grid key={index} >
                        <Card >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={item.image}
                                    title={item.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.desc}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className='footer'>
                                {/* <Button size="small" color="primary">
                        Share
                      </Button> */}
                                <Link 
                                size="small" 
                                color="primary" 
                                className='link'
                                to={`/Product/${item._id}`}>
                                    اطلاعات بیشتر
                                </Link>
                                <IconButton  aria-label="add an alarm">
                                  <DeleteForever />
                                </IconButton>
                            </CardActions> 
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Products
