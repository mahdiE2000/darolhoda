import React from "react";
import TeachersForm from "./TeachersForm"
import useField from "./TeachersFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";

const TeachersCreate = () =>{
    //Variables
    const { create } = useAPI();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);

    //Useeffect
    // useEffect(()=>{
    //     console.log(formData);
    // },[formData])

    //Functions
    const CreateTeacher =  () => {
        create(`teachers`, formData, '/Admin/Teachers');
    }

    return(
        <>
            <TeachersForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={CreateTeacher}
            />
        </>
    )
}


export default TeachersCreate;

