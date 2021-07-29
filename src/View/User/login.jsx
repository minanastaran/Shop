import React, { useState } from 'react'
import { useHistory } from 'react-router';
import axios from '../../api/baseurl';

import { Container, Grid, Box, TextField, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MessageLang } from '../../Languages/Provider';
import FileUpload from '../../Components/FileUpload/FileUpload';


const Login = () => {
    const history=useHistory()
    const [loading, setloading] = useState(false)
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const [phone, setphone] = useState('')
    const [password_, setpassword_] = useState('')
    const [name, setname] = useState('')
    const [profileimage, setprofileimage] = useState('')

    const [showfilename, setshowfilename] = useState([]);
    const [file, setfile] = useState([]);

    const Upload = (e) => {
        setprofileimage(e.target.files[0])
        if (e.target.files[0].name) {
            let file_type = e.target.files[0].type
            if (file_type && file_type.split("/")[1] === 'png' || 
                file_type && file_type.split("/")[1] === 'jpg' ||  
                file_type && file_type.split("/")[1] === 'jpeg' ){
                setshowfilename(e.target.files[0].name)
            }
            else {
                setshowfilename("type")
            }
        }
    }

    const loginhandler = () => {
        axios.post('http://localhost:5000/User/login',{
            'user_Id': username,
            'user_pass' :password
        })
        .then(function (response) {
            console.log(response.data);
            window.localStorage.setItem('UserData',JSON.stringify(response.data))
            if(response.data.data==='ok'){
                history.replace('/')
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const registerhandler = () => {
        const FormData = require('form-data');

        const form = new FormData();
        form.append('id', phone);
        form.append('name', name);
        form.append('password', password_);
        form.append('image', profileimage);
        
        axios.post('http://localhost:5000/User/register',form)
        .then(function (response) {
            //handle success
            console.log(response.data.data);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    return (
        <div className="BodyPages">
            <Container>
                <Grid className='user'>
                    <Grid item>
                        <Box className='user__form'>
                            <TextField
                                label="نام کاربری"
                                variant="outlined"
                                value={username}
                                fullWidth
                                margin="normal"
                                onChange={e => setusername(e.target.value)} />
                            <TextField
                                label="کلمه عبور"
                                variant="outlined"
                                margin="normal"
                                value={password}
                                fullWidth
                                onChange={e => setpassword(e.target.value)} />
                            <Button
                                size="large"
                                fullWidth
                                variant="contained"
                                className='bluebtn btn_mt'
                                onClick={() => loginhandler()}
                            >
                                {loading ? <CircularProgress color='action' size={26} /> : <MessageLang id="form.login" />}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box className='user__form'>
                            <TextField
                                label="شماره موبایل"
                                variant="outlined"
                                value={phone}
                                fullWidth
                                margin="normal"
                                onChange={e => setphone(e.target.value)} />
                            <TextField
                                label="نام"
                                variant="outlined"
                                margin="normal"
                                value={name}
                                fullWidth
                                onChange={e => setname(e.target.value)} />
                            <TextField
                                label="کلمه عبور"
                                variant="outlined"
                                margin="normal"
                                value={password_}
                                fullWidth
                                type="password"
                                onChange={e => setpassword_(e.target.value)} />
                            <FileUpload
                                formatfile={".jpg , .png , .jepg, .jfif"}
                                multiple={true}
                                showfilename={showfilename}
                                showimg={profileimage}
                                from='general'
                                Upload_Func={Upload}/>
                            <Button
                                size="large"
                                fullWidth
                                variant="contained"
                                className='bluebtn btn_mt'
                                onClick={() => registerhandler()}
                            >
                                {loading ? <CircularProgress color='action' size={26} /> : <MessageLang id="form.register" />}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Login
