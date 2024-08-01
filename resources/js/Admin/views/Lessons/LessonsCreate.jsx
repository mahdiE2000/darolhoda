import React, { useEffect, useState } from "react";
import LessonsForm from "./LessonsForm";
import useField from "./LessonsFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";

const LessonsCreate = () =>{
    //Variables
    const { create } = useAPI();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);


    //Useeffect


    //Functions
    const CreateLessons =  () => {
        create(`lessons`, formData, '/Admin/Lessons');
    }

    return(
        <>
            <LessonsForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={CreateLessons}
            />
        </>
    )
}


export default LessonsCreate;

