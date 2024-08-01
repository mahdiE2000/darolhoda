import { CButton, CMultiSelect, CForm, CFormFloating, CFormInput, CFormLabel, CFormTextarea, CInputGroup } from "@coreui/react-pro";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import DatePicker from "../../../Tools/DatePicker/DatePicker";
import SelectOption from "../../../Tools/SelectOption/SelectOption";
import useAPI from "../../../Tools/API/useAPI";
import MultiSelectOption from "../../../Tools/MultiSelectOption/MultiSelectOption";

const CoursesRegisterForm = ({formData, handleFromChange, onSubmit}) =>{
    //Variables
    const { fetchSelect } = useAPI();
    const [students, setStudents] = useState();
    const { id } = useParams();


    useEffect(() => {
        fetchStudents();
    },[]);

    useEffect(() => {
        //put already exist students to formData so if no change happends and button pressed it pass success, also control formData students select format set after getting data from course
        if (students && formData.members && formData.members.some(member => member.name)){

            const defaultStudents = students.filter(item => item.selected);
            //console.log('aaaaa  :: ',defaultStudents);
            handleFromChange({ name: 'members', value: defaultStudents });
        }
    },[students, formData]);

    const fetchStudents =  () => {
        //console.log(formData);
        const params = {course_id:id};
        const struct = (node) => ({
            ...node,
            selected: !!node.selected
        });
        fetchSelect(`students`, setStudents, struct, params);
    };


    return(
        <CForm>
        <div className="d-flex flex-column">
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <div className="col-lg-3 mb-3">
                    <CFormLabel className="ps-3" >استاد</CFormLabel>
                    <CFormInput name='password' placeholder="" value={`${formData?.teacher?.name} ${formData?.teacher?.last_name}`} onChange={handleFromChange} disabled/>
                </div>

                <div className="col-lg-3 mb-3">
                    <CFormLabel className="ps-3" >درس</CFormLabel>
                    <CFormInput name='password' placeholder="" value={`${formData?.lesson?.lesson_title}`} onChange={handleFromChange} disabled/>
                </div>

                <div className="col-lg-3 mb-3">
                    <CFormLabel className="ps-3" >کلاس</CFormLabel>
                    <CFormInput name='password' placeholder="" value={`${formData?.class?.class_name}`} onChange={handleFromChange} disabled/>
                </div>

            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <div className="col-lg-3 mb-3">
                    <CFormLabel className="ps-3" >تاریخ شروع کلاس</CFormLabel>
                    <CFormInput name='password' placeholder="" value={`${formData?.class_time}`} onChange={handleFromChange} disabled/>
                </div>
                <div className="col-lg-3 mb-3">
                    <CFormLabel className="ps-3" >تاریخ امتحان</CFormLabel>
                    <CFormInput name='password' placeholder="" value={`${formData?.exam_time}`} onChange={handleFromChange} disabled/>
                </div>
                <div className="col-lg-3 mb-3">
                </div>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-5">
                <div className="flex-grow-1 pe-lg-5 ps-lg-5">
                    <CFormTextarea
                        name="description"
                        label="توضیحات"
                        value={formData?.description ? formData?.description : ''}
                        rows={3}
                        onChange={handleFromChange}
                        disabled
                    ></CFormTextarea>
                </div>
            </div>


            <div className="d-flex flex-column flex-lg-row justify-content-around mb-5">
                <div className="flex-grow-1 pe-lg-5 ps-lg-5">
                    <CInputGroup className="d-flex flex-column mb-4 flex-nowrap ">
                        <MultiSelectOption
                            name='members'
                            options={students ? students : []}
                            onChange={handleFromChange}
                            value={null}
                            label="دانش آموزان این درس "
                        />
                    </CInputGroup>
                </div>
            </div>



            <div className="d-flex flex-column-reverse gap-5 flex-lg-row justify-content-center align-items-stretch mb-4">
                    <NavLink className='col-lg-2' to='/admin/Courses'>
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


export default CoursesRegisterForm;

