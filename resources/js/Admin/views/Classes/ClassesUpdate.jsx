import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ClassesForm from "./ClassesForm";
import useField from "./ClassesFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";
const ClassesUpdate = () =>{
    //Variables
    const { fetch, update } = useAPI();
    const { id } = useParams();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);
    // const [birthDate, setBirthDate] = useState();

    //Useeffect
    useEffect(()=>{
        fetchClasses();
    },[])

    // useEffect(()=>{
    //     //console.log(formData);
    // },[formData])

    //Functions
    const fetchClasses =  () => {
        fetch(`classes`, setFormData, {}, id);
    };

    const updateClasses =  () => {
        update(`classes`, id, formData, '/Admin/Classes');
    };

    return(
        <>
            <ClassesForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={updateClasses}
            />
        </>
    )
}


export default ClassesUpdate;

