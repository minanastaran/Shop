import React from 'react'
import { Container, Grid , IconButton} from '@material-ui/core';
import { Link } from 'react-router-dom';

//component
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//icon
import  {DeleteForever} from '@material-ui/icons';

const ProductCard = ({item , UserData , DeletePost}) => {
    return (
        <Grid className='card'>
                        <Card >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={`http://localhost:5000/${item.image[0]}`}
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
                             
                                <Link 
                                size="small" 
                                color="primary" 
                                className='link'
                                to={`/Product/${item._id}`}>
                                    اطلاعات بیشتر
                                </Link>
                                {UserData && UserData.userId === item.creator &&  
                                    <IconButton  aria-label="add an alarm" onClick={()=>DeletePost(item._id)}>  
                                        <DeleteForever />
                                    </IconButton>
                                }
                            </CardActions> 
                        </Card>
                    </Grid>
    )
}

export default ProductCard
