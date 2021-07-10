import React from 'react'
import { Container , TextField } from '@material-ui/core';

const Home = () => {
    return (
        <Container>
            <div className="BodyPages">
                <TextField id="outlined-basic" label="نام و نام خانوادگی" variant="outlined" />
            </div> 
        </Container>
    )
}

export default Home
