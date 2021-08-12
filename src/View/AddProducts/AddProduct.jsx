import React,{useState,useEffect} from 'react'
import axios from '../../api/baseurl'
import { Container, Box, TextField, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MessageLang } from '../../Languages/Provider';
import FileUpload from '../../Components/FileUpload/FileUpload'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Check_FileUpload } from '../../Util/Check_FileUpload';
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
}));

const AddProduct = (props) => {

    const history = useHistory()
    const UserData = JSON.parse(window.localStorage.getItem('UserData'))
    const [loading, setloading] = useState(false)
    const classes = useStyles();

    const [showallcat, setshowallcat] = useState([])
    // const [cat, setcat] = useState('')
    // const [catitem, setcatitem] = useState('')
    const [showallcatitem, setshowallcatitem] = useState([])
    const [data, setdata] = useState({
        cat:'',
        catitem:'',
        title: '',
        count:'',
        price: '',
        sold_price:'',
        desc: '',
        cat:'',
        catitem:'',
    });
    const [showfilename_main, setshowfilename_main] = useState([]);
    const [showfilename_gallery, setshowfilename_gallery] = useState([]);
    const [file_main, setfile_main] = useState([]);
    const [file_gallery, setfile_gallery] = useState([]);

    useEffect(() => {
        updateCatList()
    }, [])

    const updateCatList=()=>{
        axios.get('http://localhost:5000/Manage/showcats') 
        .then(function (response) {
            //handle success
            setshowallcat(response.data.data)
            setloading(false)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }
    const addcatitem_FUC=(value)=>{
        setdata({...data , cat:value})
        updateCatItemList(value)
        console.log(value);

    }

    const updateCatItemList=(catid)=>{
        axios.get(`http://localhost:5000/Manage/${catid}`) 
        .then(function (response) {
            //handle success
            setshowallcatitem(response.data.data)
            setloading(false)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    const Upload = (e,from) => {
        if(from==='main'){
            const data = Check_FileUpload(e.target.files)
            setfile_main(data.filelist)
            setshowfilename_main(data.filenamelist)
        }
        else{
            const data = Check_FileUpload(e.target.files)
            setfile_gallery(data.filelist)
            setshowfilename_gallery(data.filenamelist)
        }
    }

    const submithandler = () => {

        let img=file_main
        let totalimg=img.concat(file_gallery)

        setloading(true)
        const FormData=require('form-data');
        const form =new FormData();
        form.append('title',data.title)
        form.append('desc',data.desc)
        form.append('price',parseInt(data.price))
        form.append('sold_price',data.sold_price==='' ? 0 : parseInt(data.sold_price))
        form.append('count',parseInt(data.count))
        form.append('cat',data.cat)
        form.append('catitem',data.catitem)
        // form.append('image',file_main)y

        for (let i = 0; i < totalimg.length; i++) {
            form.append('image',totalimg[i])
        }

        form.append('creator',UserData.userId)
        axios.post('http://localhost:5000/Products/Add',form) 
        .then(function (response) {
            //handle success
            setloading(false)
            history.push('/Products')
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    return (
        <div className="BodyPages">
            <Container>
                <Box>
                    <Box className='manageinput'>
                        {showallcat && <Autocomplete
                            id="combo-box-demo"
                            options={showallcat}
                            className='marginright'
                            getOptionLabel={(option) => option._id}
                            style={{ width: 300 }}
                            onChange={(e,newvalue)=>addcatitem_FUC(newvalue._id)}
                            onInput={()=>alert('this')}
                            renderInput={(params) => <TextField {...params} label="دسته بندی" variant="outlined" />}
                        />}
                        <Autocomplete
                            id=""
                            options={showallcatitem}
                            className='marginright'
                            getOptionLabel={(option) => option._id}
                            style={{ width: 300 }}
                            onChange={(e,newvalue)=>setdata({...data , catitem:newvalue._id})}
                            renderInput={(params) => <TextField {...params} label="زیر دسته" variant="outlined" />}
                        />
                    </Box>
                    <Box>
                        <TextField
                            label="نام محصول"
                            variant="outlined"
                            value={data.title}
                            margin="normal"
                            className='marginright'
                            onChange={e => setdata({ ...data, title: e.target.value })} />
                        <TextField
                            label="تعداد کل"
                            variant="outlined"
                            margin="normal"
                            type='number'
                            value={data.count}
                            onChange={e => setdata({ ...data, count: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField
                            label="قیمت"
                            variant="outlined"
                            margin="normal"
                            className='marginright'
                            type='number'
                            value={data.price}
                            onChange={e => setdata({ ...data, price: e.target.value })} />
                        <TextField
                            label="قیمت تخفیف"
                            variant="outlined"
                            margin="normal"
                            type='number'
                            value={data.sold_price}
                            onChange={e => setdata({ ...data, sold_price: e.target.value })} />
                    </Box>
                   
                    <TextField
                        label="توضیحات"
                        variant="outlined"
                        margin="normal"
                        value={data.desc}
                        multiline
                        rows={4}
                        fullWidth
                        onChange={e => setdata({ ...data, desc: e.target.value })} />
                    <FileUpload
                        title={"برای آپلود تصویر اصلی محصول کلیک کنید."}
                        from=''
                        formatfile={".jpg , .png , .jepg , .jfif"}
                        multiple={false}
                        showfilename={showfilename_main}
                        showimg={file_main}
                        Upload_Func={e=>Upload(e,'main')}/>
                    <FileUpload
                        title={"برای آپلود تصاویر گالری کلیک کنید."}
                        from=''
                        formatfile={".jpg , .png , .jepg , .jfif"}
                        multiple={true}
                        showfilename={showfilename_gallery}
                        showimg={file_gallery}
                        Upload_Func={e=>Upload(e,'')}/>
                    <Button
                        size="large"
                        variant="contained"
                        className='bluebtn'
                        onClick={() => submithandler()}
                    >
                        {loading ? <CircularProgress color='action' size={26} /> : <MessageLang id="form.sabmit" />}
                    </Button>
                </Box>
            </Container>
        </div>
    )
}

export default AddProduct;


/*----------------------------*/
// import React,{useState} from 'react'
// import axios from '../../api/baseurl'
// import { Container, Box, TextField, Button } from '@material-ui/core';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { MessageLang } from '../../Languages/Provider';
// import FileUpload from '../../Components/FileUpload/FileUpload'
// import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from 'react-router-dom';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     margin: {
//         marginTop: theme.spacing(1),
//         marginBottom: theme.spacing(2),
//     },
// }));

// const AddProduct = (props) => {

//     const history = useHistory()
//     const UserData = JSON.parse(window.localStorage.getItem('UserData'))
//     const [loading, setloading] = useState(false)
//     const classes = useStyles();

//     const [data, setdata] = useState({
//         name: '',
//         desc: '',
//         price: '',
//     });
//     const [showfilename, setshowfilename] = useState('');
//     const [file, setfile] = useState('');

//     const Upload = (e, v) => {
//         setfile(e.target.files[0])
//         if (e.target.files[0].name) {
//             let file_type = e.target.files[0].type
//             if (file_type && file_type.split("/")[1] === 'png' || 
//                 file_type && file_type.split("/")[1] === 'jpg' ||  
//                 file_type && file_type.split("/")[1] === 'jpeg' ){
//                 setshowfilename(e.target.files[0].name)
//             }
//             else {
//                 setshowfilename("type")
//             }
//         }
//     }

//     const submithandler = () => {
//         setloading(true)
        
//         const FormData=require('form-data');
//         const form =new FormData();
//         form.append('name',data.name)
//         form.append('price',data.price)
//         form.append('desc',data.desc)
//         form.append('image',file)
//         form.append('creator',UserData.userId)
//         axios.post('http://localhost:5000/Products/Add',form) 
//         .then(function (response) {
//             //handle success
//             console.log(response.data.data);
//             setloading(false)
//             history.push('/Products')
//         })
//         .catch(function (response) {
//             //handle error
//             console.log(response);
//         });
//     }

//     return (
//         <div className="BodyPages">
//             <Container>
//                 <Box>
//                     <TextField
//                         label="نام خودرو"
//                         variant="outlined"
//                         value={data.name}
//                         margin="normal"
//                         className='marginright'
//                         onChange={e => setdata({ ...data, name: e.target.value })} />
//                     <TextField
//                         label="قیمت"
//                         variant="outlined"
//                         margin="normal"
//                         value={data.price}
//                         onChange={e => setdata({ ...data, price: e.target.value })} />
//                     <TextField
//                         label="توضیحات"
//                         variant="outlined"
//                         margin="normal"
//                         value={data.desc}
//                         multiline
//                         rows={4}
//                         fullWidth
//                         onChange={e => setdata({ ...data, desc: e.target.value })} />
//                     <FileUpload
//                         formatfile={".jpg , .png , .jepg"}
//                         multiple={true}
//                         showfilename={showfilename}
//                         showimg={file}
//                         Upload_Func={Upload}/>
//                     <Button
//                         size="large"
//                         variant="contained"
//                         className='bluebtn'
//                         onClick={() => submithandler()}
//                     >
//                         {loading ? <CircularProgress color='action' size={26} /> : <MessageLang id="form.sabmit" />}
//                     </Button>
//                 </Box>
//             </Container>
//         </div>
//     )
// }

// export default AddProduct;
