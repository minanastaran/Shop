import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Box, TextField, Button, Grid, Typography, IconButton } from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';
import Modal from '../../Components/Modal/Modal'
import Checkbox from '@material-ui/core/Checkbox';

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'


import image1 from '../../image/download (1).jfif'
import image2 from '../../image/download (2).jfif'
import image3 from '../../image/download (3).jfif'
import image4 from '../../image/download (4).jfif'

const TaskManager = () => {

    const UserData = JSON.parse(window.localStorage.getItem("UserData"))
    const [Data, setData] = useState()
    const [open, setopen] = useState(false)
    const [showdialog, setshowdialog] = useState(false)

    useEffect(() => {
        updatedata()
    }, [])

    const updatedata = () => {
        axios.get('http://localhost:5000/Task')
            .then(function (response) {
                setData(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const ShowModal = () => {
        setshowdialog(true)
        setopen(true)
    }
    const CloseModal = () => {
        setshowdialog(false)
        setopen(false)
        updatedata()
    }


    const handleChange = (task) => {
        let checkstate
        if (task.state === 'wait') {
            checkstate = 'done'
        }
        else {
            checkstate = 'wait'
        }

        axios.post('http://localhost:5000/Task/update', {
            'id': task._id,
            'state': checkstate
        })
            .then(function (response) {
                updatedata()
                // console.log(JSON.stringify(response.data.data));
                // setData(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const DeletePost = (id) => {
        axios.delete('http://localhost:5000/Task/Delete', {
            data: {
                'id': id
            },
            headers: {
                'Authorization': `Basic ${UserData.token}`
            }
        })
            .then(function (response) {
                updatedata()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const items=[image1,image2,image3,image4]
    const params = {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        spaceBetween: 30
      }
    return (
        <div className="BodyPages">
            <Container>
                 <Box className='boxcard'>
                 <Box className='carousel-wrapper'>
                 <Carousel autoPlay={true} >
                 <div>
      <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
      <p className="legend">Legend 1</p>
    </div>
    <div>
      <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
      <p className="legend">Legend 2</p>
    </div>
                </Carousel>
                </Box>
                 </Box>
                <Box className='boxcard'>
                    <p>لیست وظایف</p>
                    {Data && Data.map((item, index) => {
                        return (
                            <Box key={index} className={'boxcard_item'}>
                                <Box display={'flex'} >
                                    <Checkbox
                                        checked={item.state === 'done' ? true : false}
                                        onChange={() => handleChange(item)}
                                        color="primary" />
                                    <p>{item.title} </p>
                                </Box>
                                <IconButton aria-label="add an alarm" onClick={() => DeletePost(item._id)}>
                                    <DeleteForever />
                                </IconButton>
                            </Box>
                        )
                    })}
                    <Box>
                        <IconButton aria-label="add an alarm" onClick={() => ShowModal()}>
                            <Edit />
                            افزودن وظایف
                        </IconButton>
                    </Box>
                </Box>
            </Container>
            {showdialog &&
                <Modal
                    onClose={() => CloseModal()}
                    isOpen={open}
                    title='افزودن وظایف'
                >
                    <AddNewTask />
                </Modal>
            }



        </div>
    )
}

export default TaskManager

const AddNewTask = () => {

    const [task, settask] = useState('')

    const submithandler = () => {
        axios.post('http://localhost:5000/Task/Add', {
            'title': task
        })
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <TextField
                label="شرح"
                variant="outlined"
                value={task}
                margin="normal"
                className='marginright'
                onChange={e => settask(e.target.value)} />
            <Button
                size="large"
                variant="contained"
                className='bluebtn'
                onClick={() => submithandler()}
            >
                افزودن
            </Button>
        </>
    )
}