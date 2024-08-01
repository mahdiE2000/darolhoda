import { CButton, CDatePicker, CForm, CFormFloating, CFormInput, CFormLabel } from "@coreui/react-pro";
import React from "react";
import { NavLink } from "react-router-dom";
const TeachersForm = ({formData, handleFromChange, onSubmit}) =>{
    //Variables
    // const [birthDate, setBirthDate] = useState();
    return(
        <CForm>
        <div className="d-flex flex-column">
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <CFormFloating className="col-lg-3 mb-3">
                    <CFormInput name='teacher_code' placeholder="" value={formData?.teacher_code} onChange={handleFromChange}/>
                    <CFormLabel className="ps-3" >شماره پرونده</CFormLabel>
                </CFormFloating>
                <CFormFloating className="col-lg-3 mb-3">
                    <CFormInput name='password' placeholder="" value={formData?.password} onChange={handleFromChange}/>
                    <CFormLabel className="ps-3" >رمز عبور</CFormLabel>
                </CFormFloating>

                <CFormFloating className="col-lg-3 mb-3">
                    {/* <CFormInput name='uname' placeholder="" value={formData?.uname} onChange={handleFromChange}/>
                    <CFormLabel className="ps-lg-3">نام کاربری</CFormLabel> */}
                </CFormFloating>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <CFormFloating className="col-lg-3 mb-3">
                    <CFormInput name='name' placeholder="" value={formData?.name} onChange={handleFromChange}/>
                    <CFormLabel className="ps-3" >نام</CFormLabel>
                </CFormFloating>
                <CFormFloating className="col-lg-3 mb-3">
                    <CFormInput name='lname' placeholder="" value={formData?.lname} onChange={handleFromChange}/>
                    <CFormLabel className="ps-3" >نام خانوادگی</CFormLabel>
                </CFormFloating>
                <CFormFloating className=" col-lg-3 mb-3">
                    <CFormInput name='code_meli' placeholder="" value={formData?.code_meli} onChange={handleFromChange}/>
                    <CFormLabel className="ps-3" >کدملی</CFormLabel>
                </CFormFloating>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <CFormFloating className=" col-lg-3 mb-3">
                    <CFormInput name='phone' placeholder="" value={formData?.phone} onChange={handleFromChange}/>
                    <CFormLabel className="ps-3" >تلفن همراه</CFormLabel>
                </CFormFloating>
                <div className="col-lg-3">
                    {/* <CDatePicker firstDayOfWeek={6} placeholder="تاریخ شروع" locale="fa-IR" onDateChange={setBirthDate}/> */}
                </div>
                <div className="col-lg-3"></div>

            </div>
            {/* <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <div className="col-lg-3">
                    <CFormInput type="file" id="profile_picture" label="عکس پروفایل" onChange={handleFromChange}/>
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-3"></div>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <div>
                {formData?.profile_picture != '' && (
                  <a  target="_blank" rel="noopener noreferrer">
                    <img className='m-3 border border-dark' src='resources\js\assets\images\avatars/2.jpg' height="100px" alt="Preview" />
                  </a>
                )}
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-3"></div>
            </div> */}
            <div className="d-flex flex-column-reverse gap-5 flex-lg-row justify-content-center align-items-stretch mb-4">
                <NavLink className='col-lg-2' to='/admin/Teachers'>
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


export default TeachersForm;

