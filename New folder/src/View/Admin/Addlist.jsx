import React, { useState ,useEffect} from 'react'
import axios from '../../api/baseurl'
import { Container, Box, TextField, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MessageLang } from '../../Languages/Provider';
import Autocomplete from '@material-ui/lab/Autocomplete';

const options = ['Option 1', 'Option 2'];

const Addlist = ({match}) => {

    const [loading,setloading]=useState(false)
    const [addcat, setaddcat] = useState('')
    const [showallcat, setshowallcat] = useState([])
    const [cat, setcat] = useState('')
    const [catitem, setcatitem] = useState('')
    const [showallcatitem, setshowallcatitem] = useState([])

    useEffect(() => {
        updateCatList()
        updateCatItemList()
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
    const updateCatItemList=()=>{
        axios.get('http://localhost:5000/Manage/showcatitems') 
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

    const addnewcat=()=>{
        axios.post('http://localhost:5000/Manage/addcat',{
            'title':addcat
        }) 
        .then(function (response) {
            //handle success
            updateCatList()
            setloading(false)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    const addnewcatitem=()=>{
        console.log(cat+' - '+catitem + " <<<");
        axios.post('http://localhost:5000/Manage/addcatitem',{
            'title':catitem,
            'catid':cat
        }) 
        .then(function (response) {
            //handle success
            updateCatItemList()
            setloading(false)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    // let test= showallcatitem.sort((a,b)=> a.cat[0].title === b.cat[0].title ? 1 : -1)
    // console.log(test);
    return (
        <div className="BodyPages">
            <Container>
                <Box className="Profile_products" display='block'>
                    <Box className='manageinput'>
                        <TextField
                            label="دسته بندی"
                            variant="outlined"
                            margin="normal"
                            className='marginright'
                            // type='number'
                            value={addcat}
                            onChange={e => setaddcat(e.target.value)} />
                        <Button
                            size="large"
                            variant="contained"
                            className='bluebtn'
                            onClick={() => addnewcat()}
                        >
                            {loading ? <CircularProgress color='action' size={26} /> : <MessageLang id="form.sabmit" />}
                        </Button>
                    </Box>
                    <Box className='manageinput'>
                        <Autocomplete
                            id="combo-box-demo"
                            options={showallcat}
                            className='marginright'
                            getOptionLabel={(option) => option._id}
                            style={{ width: 300 }}
                            onChange={(e,newvalue)=>setcat(newvalue._id)}
                            renderInput={(params) => <TextField {...params} label="دسته بندی" variant="outlined" />}
                        />
                        <TextField
                            label="زیر دسته"
                            variant="outlined"
                            margin="normal"
                            className='marginright'
                            // type='number'
                            value={catitem}
                            onChange={e => setcatitem(e.target.value)} />
                        <Button
                            size="large"
                            variant="contained"
                            className='bluebtn'
                            onClick={() => addnewcatitem()}
                        >
                            {loading ? <CircularProgress color='action' size={26} /> : <MessageLang id="form.sabmit" />}
                        </Button>
                    </Box>

                </Box>
                <br/>
                <Box className="Profile_products">
                    <ul className='datalist'>
                        {showallcat && showallcat.map((item,index)=>{
                            return(
                                <li key={index}>{item._id}</li>
                            )
                        })}
                    </ul>
                    <ul className='datalist'>
                        {showallcatitem && showallcatitem.map((item,index)=>{
                            return(
                                <li key={index}>{item.cat._id + " > " + item._id}</li>
                            )
                        })}
                    </ul>
                </Box>

            </Container>

        </div>
    )
}

export default Addlist
