import React,{useState} from 'react'
import axios from '../../api/baseurl'
import { Container, Box, TextField, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MessageLang } from '../../Languages/Provider';
import FileUpload from '../../Components/FileUpload/FileUpload'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


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

    const [data, setdata] = useState({
        name: '',
        desc: '',
        price: '',
    });
    const [showfilename, setshowfilename] = useState([]);
    const [file, setfile] = useState([]);
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
            setfile(imagelist)
            setshowfilename(imagelist_name)
        }
    }

    const submithandler = () => {
        setloading(true)
        console.log(file)
        const FormData=require('form-data');
        const form =new FormData();
        form.append('name',data.name)
        form.append('price',data.price)
        form.append('desc',data.desc)
        for (let i = 0; i < file.length; i++) {
            form.append('image',file[i])
        }
        form.append('creator',UserData.userId)
        axios.post('http://localhost:5000/Products/Add',form) 
        .then(function (response) {
            //handle success
            console.log(response.data.data);
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
                    <TextField
                        label="نام خودرو"
                        variant="outlined"
                        value={data.name}
                        margin="normal"
                        className='marginright'
                        onChange={e => setdata({ ...data, name: e.target.value })} />
                    <TextField
                        label="قیمت"
                        variant="outlined"
                        margin="normal"
                        value={data.price}
                        onChange={e => setdata({ ...data, price: e.target.value })} />
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
                        formatfile={".jpg , .png , .jepg , .jfif"}
                        multiple={true}
                        showfilename={showfilename}
                        showimg={file}
                        Upload_Func={Upload}/>
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
