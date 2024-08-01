import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import router from "./router";

const axiosClient = axios.create({
    baseURL: `/api/v1`
})

axiosClient.interceptors.request.use((config) => {
    // const token = '123'; //TODO
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
});

// let navigate = useNavigate();
axiosClient.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response && error.response.status === 401){
        // Swal.fire({
        //     icon: 'error',
        //     title: 'خطا',
        //     text: "زمان شما به اتمام رسیده، لطفا مجددا وارد شوید!",
        // });
        // router.navigate('/login');
        // return error
        // console.log('errror');
        localStorage.removeItem('token');
        localStorage.removeItem('UT');
        window.location.href = 'http://localhost:8000/';
    }
    throw error;
})

export default axiosClient;
