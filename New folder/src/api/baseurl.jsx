import axios from 'axios';

const BaseUrl = axios.create({
    BaseUrl:'http://localhost:5000/',
})

export default BaseUrl;

//to use
//import BaseUrl from '../api/baseurl.jsx
//axios.post('/user);

