import React from 'react'
import { Container,Grid } from '@material-ui/core';

const Footer = () => {
    return (
        <div className="Footer">
            <Container className="footer_container">
                <Grid container spacing={1}>
                    <Grid item sm={4}>1</Grid>
                    <Grid item sm={4}>2</Grid>
                    <Grid item sm={4}>3</Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default Footer;