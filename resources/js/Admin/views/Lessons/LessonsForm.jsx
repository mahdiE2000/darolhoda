import { CButton, CDatePicker, CForm, CFormFloating, CFormInput, CFormLabel } from "@coreui/react-pro";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const LessonsForm = ({formData, handleFromChange, onSubmit}) =>{
    //Variables
    // const [birthDate, setBirthDate] = useState();

    return(
        <CForm>
        <div className="d-flex flex-column">
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-5">
                <CFormFloating className="col-lg-3 mb-3">
                    <CFormInput name='title' placeholder="" value={formData?.title} onChange={handleFromChange}/>
                    <CFormLabel className="ps-lg-3">عنوان</CFormLabel>
                </CFormFloating>
                <CFormFloating className="col-lg-3 mb-3">
                    <CFormInput name='time' placeholder="" value={formData?.time} onChange={handleFromChange}/>
                    <CFormLabel className="ps-3" >ساعت</CFormLabel>
                </CFormFloating>
            </div>
            <div className="d-flex flex-column-reverse gap-5 flex-lg-row justify-content-center align-items-stretch mb-4">
                    <NavLink className='col-lg-2' to='/admin/Lessons'>
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


export default LessonsForm;

