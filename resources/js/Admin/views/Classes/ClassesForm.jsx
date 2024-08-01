import { CButton, CDatePicker, CForm, CFormFloating, CFormInput, CFormLabel, CFormTextarea } from "@coreui/react-pro";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Select from 'react-select';

const ClassesForm = ({formData, handleFromChange, onSubmit}) =>{
    //Variables
    const dispatch = useDispatch();
    const [teachers, setTeachers] = useState();
    // const [birthDate, setBirthDate] = useState();
    useEffect(() => {
        fetchTeachers();
      },[]);
    useEffect(() => {
        //console.log(formData);
        //console.log(formData?.teacher_id);
    },[formData]);


    const fetchTeachers =  () => {
        dispatch({ type: 'set', loading: true });
        axios.get("api/v1/teachers")
            .then((response) => {
                //console.log(response.data);
                const users = response.data.map(user => ({
                    label: user.name  + ' ' + user.last_name,
                    value: user.id,
                }));
                setTeachers(users);
            })
            .catch((error) => {
                //console.log(error);
            })
            .finally(() => {
              dispatch({ type: 'set', loading: false });
          });
    };


    return(
        <CForm>
        <div className="d-flex flex-column">
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <CFormFloating className="col-lg-3 mb-3">
                    <CFormInput name='name' placeholder="" value={formData?.name} onChange={handleFromChange}/>
                    <CFormLabel className="ps-lg-3">نام کلاس</CFormLabel>
                </CFormFloating>

                <div className="col-lg-3 mb-3"></div>

                <div className="col-lg-3 mb-3"></div>
            </div>
            <div className="d-flex flex-column-reverse gap-5 flex-lg-row justify-content-center align-items-stretch mb-4">
                    <NavLink className='col-lg-2' to='/admin/Classes'>
                        <CButton className="text-white w-100" color="secondary" shape="rounded-pill">انصراف</CButton>
                    </NavLink>
                    <div className="col-lg-2">
                        <CButton className="text-white w-100" color="success" shape="rounded-pill" onClick={onSubmit}>تایید</CButton>
                    </div>
            </div>

        </div>
        </CForm>
    )
}


export default ClassesForm;

