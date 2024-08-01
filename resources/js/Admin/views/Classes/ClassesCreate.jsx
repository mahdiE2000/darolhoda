import React from "react";
import ClassesForm from "./ClassesForm";
import useField from "./ClassesFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";

const ClassesCreate = () =>{
    //Variables
    const { create } = useAPI();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);
    // const [birthDate, setBirthDate] = useState();



    //Useeffect


    //Functions
    const CreateClass =  () => {
        create(`classes`, formData, '/Admin/Classes');
    }

    return(
        <>
            <ClassesForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={CreateClass}
            />
        </>
    )
}


export default ClassesCreate;

