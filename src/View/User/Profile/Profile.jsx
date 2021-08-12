import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router';
import axios from '../../../api/baseurl'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Box, TextField, Button, Grid, Typography } from '@material-ui/core';
import { Edit, ArrowBackIos } from '@material-ui/icons';
import Card from '../../../Components/Card'
import FileUpload from '../../../Components/FileUpload/FileUpload'
import Modal from '../../../Components/Modal/Modal'
import { MessageLang } from '../../../Languages/Provider';
import FormData from 'formdata';

const Profile = () => {

    const userid=useParams().uid

    const UserData=JSON.parse(window.localStorage.getItem("UserData"))
    const [user,setuser]=useState()
    const [loading, setloading] = useState(false)
    const [open, setopen] = useState(false)
    const [products, setproducts] = useState()
    const [editprofile_image, seteditprofile_image] = useState(false)
    const [showfilename, setshowfilename] = useState();
    const [file, setfile] = useState();
    
    useEffect(() => {
        axios.get(`http://localhost:5000/User/${userid}`)
        .then(function (response) {
            //handle success
            setuser(response.data.data)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }, [open])

    useEffect(() => {
        axios.get(`http://localhost:5000/Products/profile/${userid}`)
        .then(function (response) {
            //handle success
            setproducts(response.data.data)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }, [])

    const DeletePost=(delete_productById)=>{
        axios.delete(`http://localhost:5000/Products/Delete`,{
            data:{
                'id':delete_productById
            },
            headers: {
                'Authorization': `Basic ${UserData.token}` 
              }
        })
        .then(function (response) {
            //handle success
            console.log(response.data.message);
            setproducts(prevproducts =>
                prevproducts.filter(post => post._id !== delete_productById)    
            )
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    const EditProfileImage=()=>{
        seteditprofile_image(true)
        setopen(true)
    }

    const EditImage =()=>{
        return(
            <>
                <FileUpload
                formatfile={".jpg , .png , .jepg, .jfif"}
                multiple={false}
                showfilename={showfilename}
                showimg={file}
                from='general'
                Upload_Func={Upload}/>
                 <Button
                        size="large"
                        variant="contained"
                        className='bluebtn'
                        onClick={() => submithandler()}
                    >
                        {loading ? <CircularProgress color='action' size={26} /> : <MessageLang id="form.sabmit" />}
                    </Button>
            </>
        )
    }

    const submithandler=()=>{
        setopen(false)
        alert(UserData.userId)
        const FormData=require('form-data');
        const form =new FormData();
        form.append('id',UserData.userId)
        form.append('image',file)

        axios.post(`http://localhost:5000/User/profileimage`, form)
        .then(function (response) {
            //handle success
            console.log(response.data);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    const Upload = (e, v) => {
        setfile(e.target.files[0])
        if (e.target.files[0].name) {
            let file_type = e.target.files[0].type
            if (file_type && file_type.split("/")[1] === 'png' || 
                file_type && file_type.split("/")[1] === 'jpg' ||  
                file_type && file_type.split("/")[1] === 'jfif' ||  
                file_type && file_type.split("/")[1] === 'jpeg' ){
                setshowfilename(e.target.files[0].name)
            }
            else {
                setshowfilename("type")
            }
        }
    }

    return (
        <div className="BodyPages">
            <Container>
                <Grid container className='Profile'>
                    <Grid item className='imagebox' onClick={()=>EditProfileImage()}>
                   { user &&<img className='Profile_image' src={`http://localhost:5000/${user.profile[0]}`} alt='' />}
                        <div className='Profile_editIcon'>
                            <Edit />
                        </div>
                    </Grid>
                    <Grid item>
                        <Box className='Profile_desc'>
                            <Typography variant="h1" component="h3">شناسه شما :</Typography>
                            {user && <Typography variant="h1" component="h4">{user._id}</Typography>}
                        </Box>
                        <Box className='Profile_desc'>
                            <Typography variant="h1" component="h3">نام شما :</Typography>
                            {user && <Typography variant="h1" component="h4">{ user.name}</Typography>}
                        </Box>
                    </Grid>
                </Grid>
                {products && products.length>1 && 
                    <Grid className='Profile_products product_card_content'>
                        {products && products.map((item, index) => {
                            return(
                                <Card key={index} UserData={UserData} item={item} DeletePost={DeletePost}/>
                            )    
                        })}
                    </Grid>
                }
            </Container>
            {editprofile_image && 
                <Modal
                    onClose={() => seteditprofile_image(false)}
                        isOpen={open}
                        title='ویرایش تصویر پروفایل'
                    >
                    <EditImage />
                </Modal>
        }
        </div>
    )
}

export default Profile
