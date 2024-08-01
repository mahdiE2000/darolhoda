import React, { useEffect } from "react";
import CoursesForm from "./CoursesForm";
import useField from "./CoursesFields";
import useForm from "../../../Tools/useForm/useForm";
import useAPI from "../../../Tools/API/useAPI";

const CoursesCreate = () =>{
    //Variables
    const { create } = useAPI();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);
    // const [birthDate, setBirthDate] = useState();



    //Useeffect
    useEffect(()=>{
        //console.log('formData :: ',formData);
    },[formData])

    //Functions
    const CreateCourse =  () => {
        create(`courses`, formData, '/Admin/Courses');
    }

    return(
        <>
            <CoursesForm
                formData={formData}
                handleFromChange={handleFromChange}
                onSubmit={CreateCourse}
            />
        </>
    )
}


export default CoursesCreate;

