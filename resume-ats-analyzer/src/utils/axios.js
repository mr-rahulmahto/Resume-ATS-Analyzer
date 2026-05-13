import axios from 'axios';


const instance = axios.create({
    baseURL:"https://resume-ats-analyzer-2-g3nc.onrender.com",

})

export default instance;
