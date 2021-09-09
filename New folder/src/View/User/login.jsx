import React, { useState , useContext} from 'react'
import { useHistory } from 'react-router';
import axios from '../../api/baseurl';

import { Container, Grid, Box, TextField, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MessageLang } from '../../Languages/Provider';
import FileUpload from '../../Components/FileUpload/FileUpload';

import {DataContext} from '../../GlobalState/DataContext.js'


const Login = () => {
    const globaldata=useContext(DataContext)
    const history=useHistory()
    var regex = new RegExp('^(\\+98|0)?9\\d{9}$');  //phone validation
    var checkEmail = new RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    const [loading, setloading] = useState(false)
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const [validator_phone, setvalidator_phone] = useState(false)
    const [validator_email, setvalidator_email] = useState(false)
    const [validator_password, setvalidator_password] = useState(false)
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
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
        var result_phone = regex.test(username);

        if(result_phone){
            setvalidator_phone(false)
        }else{
            setvalidator_phone(true)
        }
        if(password_.length<6){
            setvalidator_password(true)
        }
        else{
            setvalidator_password(false)
        }
        if(!validator_phone && !validator_password){
            axios.post('http://localhost:5000/User/login',{
                'user_Id': username,
                'user_pass' :password
            })
            .then(function (response) {
                console.log(response.data);
                window.localStorage.setItem('UserData',JSON.stringify(response.data))
                globaldata.login()
                if(response.data.data==='ok'){
                    history.replace('/')
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    }
    const registerhandler = () => {
        var result_phone = regex.test(phone);
        var result_email = checkEmail.test(email);

        //phone
        if(result_phone){
            setvalidator_phone(false)
        }else{
            setvalidator_phone(true)
        }

        //email
        if( email !=='' && result_email){
            setvalidator_email(false)
        }
        else{
            setvalidator_email(true)
        }

        if(password_.length<6){
            setvalidator_password(true)
        }
        else{
            setvalidator_password(false)
        }

        if(!validator_phone && !validator_password && !validator_email){
            const FormData = require('form-data');
    
            const form = new FormData();
            form.append('id', phone);
            form.append('name', name);
            form.append('email', email);
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

    }

    return (
        <div className="BodyPages">
            <Container>
                <Grid className='user'>
                    <Grid item>
                        <Box className='user__form'>
                            <TextField
                                error={validator_phone}
                                label="نام کاربری"
                                variant="outlined"
                                value={username}
                                fullWidth
                                margin="normal"
                                onChange={e => setusername(e.target.value)}
                                helperText={validator_phone ? "شماره موبایل نا معتبر" :null}
                                />
                            <TextField
                                error={validator_password}
                                label="کلمه عبور"
                                variant="outlined"
                                margin="normal"
                                value={password}
                                fullWidth
                                onChange={e => setpassword(e.target.value)} 
                                helperText={validator_password ? "حداقل 6 کارکتر" :null}
                                />
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
                                error={validator_phone}
                                label="شماره موبایل"
                                variant="outlined"
                                value={phone}
                                fullWidth
                                margin="normal"
                                onChange={e => setphone(e.target.value)} 
                                helperText={validator_phone ? "شماره موبایل نا معتبر" :null}
                                />
                            <TextField
                                error={validator_email}
                                label="ایمیل"
                                variant="outlined"
                                value={email}
                                fullWidth
                                margin="normal"
                                onChange={e => setemail(e.target.value)} 
                                helperText={validator_email ? "ایمیل نا معتبر" :null}
                                />
                            <TextField
                                label="نام"
                                variant="outlined"
                                margin="normal"
                                value={name}
                                fullWidth
                                onChange={e => setname(e.target.value)} />
                            <TextField
                                error={validator_password}
                                label="کلمه عبور"
                                variant="outlined"
                                margin="normal"
                                value={password_}
                                fullWidth
                                type="password"
                                onChange={e => setpassword_(e.target.value)} 
                                helperText={validator_password ? "حداقل 6 کارکتر" :null}
                                />
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
