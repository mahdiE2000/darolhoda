import React, { useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import CoursesForm from "./CoursesForm";
import useField from "./CoursesFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";
const CoursesUpdate = () =>{
    //Variables
    const { fetch, update } = useAPI();
    const { id } = useParams();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);
    // const [birthDate, setBirthDate] = useState();

    //Useeffect
    useEffect(()=>{
        fetchCourse();
    },[])

    useEffect(() => {
        // console.log('formData', formData);
    }, [formData]);

    //Functions
    const fetchCourse =  () => {
        fetch(`courses`, setFormData, {}, id);
    };

    const updateCourse =  () => {
        const formDataToSend = new FormData();
        formDataToSend.append('course_id', formData.course_id);
        formDataToSend.append('teacher_id', formData.teacher_id ? formData.teacher_id : formData.teacher.id);
        formDataToSend.append('lesson_id', formData.lesson_id ? formData.lesson_id : formData.lesson.id);
        formDataToSend.append('class_id', formData.class_id ? formData.class_id : formData.class.id);
        formDataToSend.append('class_time', formData.class_time);
        formDataToSend.append('exam_time', formData.exam_time);
        formDataToSend.append('description', formData.description);
        update(`courses`, id, formDataToSend, '/Admin/Courses');
    };


    return(
        <>
            <CoursesForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={updateCourse}
            />
        </>
    )
}


export default CoursesUpdate;

