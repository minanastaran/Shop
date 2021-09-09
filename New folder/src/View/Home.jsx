import React, { useState } from 'react'
import { Container, Box, Grid } from '@material-ui/core';
import { MonetizationOn, AlarmOn, Brightness4, Payment } from '@material-ui/icons';


const Home = () => {
    
    return (
        <div className="BodyPages">
            <Box className='desc_part'>
                <Container>
                    <Grid className={"Home_grid_part"}>
                        <Grid item className='first'>
                            <p>عنوان توضیحات ...</p>
                            <span className="m-0">
                                Jan 28, 2013 — Tag fans Bill Akers, Patrick Schultheis, Sean Raftis and Mike Konesky. Sean Raftis. By ... Update: In Epic Game of Tag, There's a New 'It'. "You're like a ... Continue reading your article with a WSJ membership. New Year Sale.
                            </span>
                            <button>touch me !</button>
                        </Grid>
                        <Grid item className='tworow'>
                            <Grid item>
                                <MonetizationOn className="ml-2 Icon_Home_Sec" />
                                <Box>
                                    <p>مقرون به صرفه</p>
                                    <span className="m-0">
                                        عنوان موضوععنوان موضوععنوان موضوععنوان موضوععنوان موضوع
                                    </span>
                                </Box>
                            </Grid>
                            <Grid item>
                                <AlarmOn className="ml-2 Icon_Home_Sec" />
                                <Box>
                                    <p>صرفه جویی در زمان</p>
                                    <span className="m-0">
                                        عنوان موضوععنوان موضوععنوان موضوععنوان موضوععنوان موضوع
                                    </span>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item className='tworow'>
                            <Grid item>
                                <Brightness4 className="ml-2 Icon_Home_Sec" />
                                <Box className='textbox'>
                                    <p>بدون محدودیت زمان</p>
                                    <span className="m-0">
                                        عنوان موضوععنوان موضوععنوان موضوععنوان موضوععنوان موضوع
                                    </span>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Payment className="ml-2 Icon_Home_Sec" />
                                <Box>
                                    <p>عنوان موضوع</p>
                                    <span className="m-0">
                                        عنوان موضوععنوان موضوععنوان موضوععنوان موضوععنوان موضوع
                                    </span>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Container>
                </Box>
        </div>
    )
}

 export default Home
