import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import useFormState from "./ExamsFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";
import ExamForm from "./ExamForm";
const ExamUpdate = () =>{
    //Variables
    const { fetch, update } = useAPI();
    const {course_id , exam_id} = useParams();

    console.log("AA::", course_id, exam_id);

    const [ formData, setFormData, handleFromChange ] = useForm(useFormState);

    useEffect(() => {
        fetchExam();
    },[])

    useEffect(() => {
        console.log("aaaa::", formData)
    },[formData])

    //Functions
    const fetchExam =  () => {
        fetch(`exams`, setFormData, {}, exam_id);
    };

    const updateExam =  () => {
        const formDataToSend = new FormData();
        formDataToSend.append('course_id', formData.course_id ? formData.course_id : formData.course?.course_id);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('date', formData.date);
        formDataToSend.append('report_start_time', formData.report_start_time);
        formDataToSend.append('report_end_time', formData.report_end_time);

        update(`exams`, exam_id, formDataToSend, `/admin/course/exam/${course_id}`);
    };

    return(
        <>
            <ExamForm
                formData={{title: formData?.title, course_id:  formData.course_id ? formData.course_id : formData.course?.course_id, date: formData.date, report_start_time: formData.report_start_time, report_end_time: formData.report_end_time}}
                handleFromChange={handleFromChange}
                onSubmit={updateExam}
            />
        </>
    )
}


export default ExamUpdate;

