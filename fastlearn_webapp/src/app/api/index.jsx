import axios from 'axios';

const apicall = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default apicall;