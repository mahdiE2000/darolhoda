import React, { useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import CoursesRegisterForm from "./CoursesRegisterForm";
import useField from "./CoursesFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";
const CoursesRegister = () =>{
    //Variables
    const { fetch, create } = useAPI();
    const { id } = useParams();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);

    //Useeffect
    useEffect(()=>{
        fetchCourse();
    },[])

    useEffect(() => {
        //console.log('formData', formData);
    }, [formData]);

    //Functions
    const fetchCourse =  () => {
        fetch(`courses`, setFormData, {}, id);
    };

    const updateCourse =  () => {
        // updating selected-course by add or remove course selected
        // API returns with course_selected : course_selected but SelectOption onChange turns to value : course_selected
        const formDataToSend = new FormData();
        formDataToSend.append('course_id', id);
        if (formData.members.length === 0)
            formDataToSend.append(`members[]`, JSON.stringify([]));
        else{
            formData.members.forEach((member, index) => {
                formDataToSend.append(`members[]`, member.value ? member.value : member.course_selected ? member.course_selected : '');
            });
        }
        create(`selected-course`, formDataToSend, '/Admin/Courses');
    };


    return(
        <>
            <CoursesRegisterForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={updateCourse}
            />
        </>
    )
}


export default CoursesRegister;

