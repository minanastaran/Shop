import React,{useEffect,useState} from 'react'
import axios from '../../api/baseurl';
import { useParams , useHistory } from 'react-router';
import { Container,Box ,IconButton,TextField } from '@material-ui/core';
import  {Done} from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import products from '../../DataBase/DBtest'
import FileUpload from '../../Components/FileUpload/FileUpload'

const EditProduct = (props) => {

    const UserData=JSON.parse(window.localStorage.getItem("UserData"))
    const productId=useParams().productid
    const history=useHistory()

    const [loading, setloading] = useState(false)

    const [data, setdata] = useState(props.location.state.data)
    
    const [showfilename, setshowfilename] = useState([]);
    // const [file, setfile] = useState('');

    // const Upload = (e, v) => {
    //     setdata({...data , image:e.target.files[0]})
    //     if (e.target.files[0].name) {
    //         let file_type = e.target.files[0].type
    //         if (file_type && file_type.split("/")[1] === 'png' || 
    //             file_type && file_type.split("/")[1] === 'jpg' ||  
    //             file_type && file_type.split("/")[1] === 'jpeg' ){
    //             setshowfilename(e.target.files[0].name)
    //         }
    //         else {
    //             setshowfilename("type")
    //         }
    //     }
    // }
    let imagelist=[]
    let imagelist_name=[]
    const Upload = (e, v) => {
        const length_imgList=e.target.files.length
        if(e.target.files.length){
            for(let i=0 ; i<length_imgList ; i++){
                imagelist.push(e.target.files[i])
                if (e.target.files[i].name) {
                    let file_type = e.target.files[i].type
                    if (file_type && file_type.split("/")[1] === 'png' || 
                        file_type && file_type.split("/")[1] === 'jpg' ||
                        file_type && file_type.split("/")[1] === 'jfif' ||  
                        file_type && file_type.split("/")[1] === 'jpeg' ){
                        imagelist_name.push(e.target.files[i].name)
                    }
                    else {
                        imagelist_name.push('type')
                    }
                }
            }
            setdata({...data , image:imagelist})
            setshowfilename(imagelist_name)
        }
    }

    const UpdateProduct=()=>{
        // setloading(true)
        // // alert(id +"-"+ name+"-"+ desc+"-"+price +"-"+ image)
        // axios.post(`http://localhost:5000/Products/Edit`,{
        //     'id':data._id,
        //     'name':data.name,
        //     'desc':data.desc,
        //     'price':data.price,
        //     'image':data.image
        // })
        // .then(function (response) {
        //     //handle success
        //     console.log(response.data.data);
        //     history.push(`/Product/${data._id}`)
        // })
        // .catch(function (response) {
        //     //handle error
        //     console.log(response);
        // }); setloading(true)
        // const FormData=require('form-data');
        const form =new FormData();
        form.append('id',data._id)
        form.append('name',data.name)
        form.append('desc',data.desc)
        form.append('price',data.price)
        for (let i = 0; i < data.image.length; i++) {
            form.append('image',data.image[i])
        }
        axios.post('http://localhost:5000/Products/Edit',form) 
        .then(function (response) {
            //handle success
            console.log(response.data.data);
            history.push(`/Product/${data._id}`)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    return (
         <Container>
            <div className="BodyPages">
                {products  && 
                <Card className="productDetails">
                <div>
                    <FileUpload
                        from='edit'
                        formatfile={".jpg , .png , .jepg, .jfif"}
                        multiple={true}
                        showfilename={showfilename}
                        showimg={data.image}
                        Upload_Func={Upload}/>
                    <CardContent>
                        <TextField
                            label="نام خودرو"
                            variant="outlined"
                            value={data.name}
                            margin="normal"
                            className='marginright'
                            onChange={e => setdata({ ...data, name: e.target.value })} />
                        <TextField
                            label="توضیحات"
                            variant="outlined"
                            margin="normal"
                            value={data.desc}
                            multiline
                            rows={4}
                            fullWidth
                            onChange={e => setdata({ ...data, desc: e.target.value })} />
                    </CardContent>
                    
                    <Box className='footer'>
                        <div variant="contained" className="priceBox">
                            <TextField
                                label="قیمت"
                                variant="outlined"
                                margin="normal"
                                value={data.price}
                                onChange={e => setdata({ ...data, price: e.target.value })} />
                        </div>
                        
                        {UserData && UserData.userId === data.creator &&
                            <IconButton  aria-label="add an alarm" onClick={()=>UpdateProduct()}>  
                                <Done />
                                ذخیره
                            </IconButton>
                        }
                    </Box>
                </div>
            </Card>
        }
            </div> 
        </Container>
    )
}

export default EditProduct
