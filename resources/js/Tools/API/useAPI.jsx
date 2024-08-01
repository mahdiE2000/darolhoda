import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosClient from "../../../axios.js"
import { useRef } from "react";
const useAPI = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loadingCounter = useRef(0);
    const setLoading = (loading) => {
        if (loading) {
            loadingCounter.current += 1;
        } else {
            loadingCounter.current -= 1;
        }
        dispatch({ type: 'set', loading: loadingCounter.current > 0 });
    };

    const fetch =  (url, setFormData,  params={}, id=0, search) => {
        setLoading(true);
        const URL = id==0 ? url : `${url}/${id}`;
        console.log('api', URL);

        axiosClient.get(URL, {params})
            .then((response) => {
                console.log('api', URL, response.data);
                if(response.data.data)
                    setFormData(response.data.data);
                else
                    setFormData(response.data);
            })
            .catch((error) => {
                //console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchPaginate =  (url, setFormData, setTotalPages,  params={}, struct=null) => {
        setLoading(true);
        axiosClient.get(`${url}`, {params})
            .then((response) => {
                console.log('fetchPaginate :: ',url,response.data);
                if(struct){
                    if(response.data.data)
                        setFormData(response.data.data.map(struct));
                    else
                        setFormData(response.data.map(struct));
                }
                else{
                    if(response.data.data)
                        setFormData(response.data.data);
                    else
                        setFormData(response.data);
                }
                setTotalPages(response.data.meta.last_page);

            }).catch((error) => {
                //console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const create =  (url, formData, nav) => {
        console.log('api', url, formData);
        axiosClient.post(url, formData)
            .then((response) => {
                console.log('api', url,response);
                Swal.fire({
                    icon: 'success',
                    title: 'عملیات موفق',
                    text: response.data.message,
                    confirmButtonText: 'تایید'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(nav);
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: error.response.data.message,
                    confirmButtonText: 'تایید'
                });
            })
    };


    const update =  (url, id, formData, nav=null) => {
        // console.log(`${url}/${id}`, id, formData);
        axiosClient.post(`${url}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 'X-HTTP-Method-Override': 'PUT',
            }
        })
            .then((response) => {
                console.log('updated response :: ', response);
                Swal.fire({
                    icon: 'success',
                    title: 'عملیات موفق',
                    text: response.data.message,
                    confirmButtonText: 'تایید'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if(nav)
                            navigate(nav);
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: error.response.data.message,
                    confirmButtonText: 'تایید'
                });
            })
    };

    const fetchSelect =  (url, setFormData, struct, params={}) => {
        setLoading(true);
        const URL = url ;
        axiosClient.get(URL, {params})
            .then((response) => {
                // console.log('api',url ,response.data);
                if(response.data.data)
                    setFormData(response.data.data.map(struct));
                else
                    setFormData(response.data.map(struct));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { fetch, fetchPaginate, create, update, fetchSelect };

};

export default useAPI;
