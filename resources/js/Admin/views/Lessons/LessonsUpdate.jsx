import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import LessonsForm from "./LessonsForm";
import useField from "./LessonsFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";
const LessonsUpdate = () =>{
    //Variables
    const { fetch, update } = useAPI();
    const { id } = useParams();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);
    // const [birthDate, setBirthDate] = useState();

    //Useeffect
    useEffect(()=>{
        fetchLessons();
    },[])
    // useEffect(()=>{
    //     console.log(formData);
    // },[formData])

    //Functions
    const fetchLessons =  () => {
        fetch(`lessons`, setFormData, {}, id);
    };

    const updateLessons =  () => {
        update(`lessons`, id, formData, '/Admin/Lessons');
    };

    return(
        <>
            <LessonsForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={updateLessons}
            />
        </>
    )
}


export default LessonsUpdate;

