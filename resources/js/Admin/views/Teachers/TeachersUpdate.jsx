import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import TeachersForm from "./TeachersForm"
import useField from "./TeachersFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";
const TeachersUpdate = () =>{
    //Variables
    const { fetch, update } = useAPI();
    const { id } = useParams();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);

    //Useeffect
    useEffect(()=>{
        fetchUser();
    },[])
    // useEffect(()=>{
    //     console.log(formData);
    // },[formData])

    //Functions
    const fetchUser =  () => {
        fetch(`teachers`, setFormData, {}, id);
    };

    const updateUser =  () => {
        update(`teachers`, id, formData, '/Admin/Teachers');
    };

    return(
        <>
            <TeachersForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={updateUser}
            />
        </>
    )
}


export default TeachersUpdate;

