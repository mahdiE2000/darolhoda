import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentsForm from "./StudentsForm";
import useField from "./StudentsFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";
const StudentsUpdate = () =>{
    //Variables
    const { fetch, update } = useAPI();
    const { id } = useParams();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);



    //Useeffect
    useEffect(()=>{
        fetchUser();
    },[])
    // useEffect(()=>{
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         ['birth_date']: moment(birthDate).format('YYYY/MM/DD'),
    //       }));
    // },[birthDate])



    //Functions
    const fetchUser =  () => {
        fetch(`students`, setFormData, {}, id);
    };

    const updateUser =  () => {
        update(`students`, id, formData, '/Admin/Students');
    };

    return(
        <>
            <StudentsForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={updateUser}
            />
        </>
    )
}


export default StudentsUpdate;

