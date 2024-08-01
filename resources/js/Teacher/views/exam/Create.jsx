import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ExamForm from "./ExamForm";
import useFormState from "./ExamsFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";

function Create() {
    const dispatch = useDispatch();
    const { create } = useAPI();
    const [ formData, setFormData, handleFromChange ] = useForm(useFormState);

    const CreateExam = () => {
        create('exams',formData,'/teacher/exams');
    }

    return (
        <ExamForm formData={formData} handleFromChange={handleFromChange} onSubmit={CreateExam} />
    );
}

export default Create;
