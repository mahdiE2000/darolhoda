import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ExamForm from "./ExamForm";
import useFormState from "./ExamsFields";
import useAPI from "../../../Tools/API/useAPI";
import useForm from "../../../Tools/useForm/useForm";
import { useParams } from "react-router-dom";

function Create() {
    const dispatch = useDispatch();
    const { create } = useAPI();
    const [ formData, setFormData, handleFromChange ] = useForm(useFormState);

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        if (id) {
            setFormData((prevData) => ({
                ...prevData,
                course_id: id,
            }));
        }
    }, [id, setFormData]);

    const CreateExam = () => {
        // باید مطمئن شوید که course_id به درستی در formData موجود است.
        console.log("A::" , formData)
        create('exams', formData, `/admin/course/exam/${formData.course_id}`);
    };

    return (
        <ExamForm formData={formData} handleFromChange={handleFromChange} onSubmit={CreateExam} />
    );
}

export default Create;
