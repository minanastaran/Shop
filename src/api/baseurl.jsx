// import axios fom 'axios';

const BaseUrl = axios.create({
    BaseUrl:'',
})

export default BaseUrl;

//to use
//import BaseUrl from '../api/baseurl.jsx
//axios.post('/user);