import React from 'react'
import { Button, Box, Grid, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

//component
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//icon
import { DeleteForever } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MessageLang } from '../Languages/Provider';


const ProductCard = ({ item, loading, UserData, DeletePost, AddToBag }) => {

    return (
        <Grid item xs={3} className='card' key={item._id}>
            <Card className='maincard'>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={item.image && `http://localhost:5000/${item.image[0]}`}
                        title={item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.desc}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className='footer'>
                    <Box className='actions'>
                        <Link
                            size="small"
                            color="primary"
                            className='link'
                            to={`/Product/${item._id}`}>
                            اطلاعات بیشتر
                        </Link>
                        {UserData && UserData.userId === item.creator &&
                            <IconButton aria-label="add an alarm" onClick={() => DeletePost(item._id)}>
                                <DeleteForever />
                            </IconButton>
                        }
                    </Box>
                    <Box>
                        <Button
                            size="large"
                            className='addbtn'
                            disabled={item.count === 0 ? true : false}
                            onClick={() => AddToBag(item._id,item.title,item.image[0], 1, item.price)}
                            fullwidth
                        >
                            {item.count === 0 ? 'ناموجود' : <MessageLang id="AddtoBag" />}
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard
