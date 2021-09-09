import React from 'react'
import {Box} from '@material-ui/core';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const GallerySlider = ({ list }) => {
    return (
        <Box className='carousel-wrapper'>
            <Carousel autoPlay={true} >
                {list && list.map((item, index) =>
                    <img key={index} src={`http://localhost:5000/${item}`} />
                )}
            </Carousel>
        </Box>
    )
}

export default GallerySlider
