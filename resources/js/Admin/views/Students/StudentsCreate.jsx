import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentsForm from "./StudentsForm";
import useField from "./StudentsFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";

const StudentsCreate = () =>{
    //Variables
    const { create } = useAPI();
    const navigate = useNavigate();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);
    // const [birthDate, setbirthDate] = useState();



    //Useeffect
    useEffect(()=>{
        //console.log(formData);
    },[formData])


    //Functions
    const CreateStudent =  () => {
        create(`students`, formData, '/Admin/Students');
    }

    return(
        <>
            <StudentsForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={CreateStudent}
            />
        </>
    )
}


export default StudentsCreate;

