import { CButton, CMultiSelect, CForm, CFormFloating, CFormInput, CFormLabel, CFormTextarea, CInputGroup } from "@coreui/react-pro";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "../../../../Tools/DatePicker/DatePicker";
import SelectOption from "../../../../Tools/SelectOption/SelectOption";
import useAPI from "../../../../Tools/API/useAPI";
import MultiSelectOption from "../../../../Tools/MultiSelectOption/MultiSelectOption";

const AbsencesForm = ({formData, handleFromChange, onSubmit}) =>{
    //Variables
    const { fetch, fetchSelect } = useAPI();
    const [teachers, setTeachers] = useState();
    const [lessons, setLessons] = useState();
    const [classes, setClasses] = useState();
    const [students, setStudents] = useState();
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        fetchTeachers();
        fetchLessons();
        fetchClasses();
        fetchStudents();
      },[]);
    // useEffect(() => {
    //     console.log('formData :: ',formData);
    //     // console.log(formData.teacher);
    // },[formData]);
    // useEffect(() => {
    //     console.log('Students DATA :: ',students);
    // },[students]);



    const fetchTeachers =  () => {
        const params = { part : 1 }
        const struct = (node) => ({
            label: `${node.name} ${node.lname}`,
            value: node.id,
        });

        fetchSelect(`teachers`, setTeachers, struct, params);
    };

    const fetchLessons =  () => {
        const params = {};
        const struct = (node) => ({
            label: node.title,
            value: node.id,
        });
        fetchSelect(`lessons`, setLessons, struct, params);
    };

    const fetchClasses =  () => {
        const params = {};
        const struct = (node) => ({
            label: node.name,
            value: node.id,
        });
        fetchSelect(`classes`, setClasses, struct, params);
    };

    const fetchStudents =  () => {
        const params = {course_id:formData?.id};
        // const struct = (node) => ({
        //     ...node,
        //     selected: !!node.selected
        // });
        // fetchSelect(`students`, setStudents, struct, params);
        fetch(`students`, setStudents, params);
    };


    return(
        <CForm>
        <div className="d-flex flex-column">
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <div className="col-lg-3 mb-3">
                    <SelectOption
                        label={"استاد"}
                        name={'teacher_id'}
                        value={formData?.teacher_id}
                        options={teachers}
                        onChange={handleFromChange}
                    />
                </div>

                <div className="col-lg-3 mb-3">
                    <SelectOption
                        label={"درس"}
                        name={'lesson_id'}
                        value={formData?.lesson_id}
                        options={lessons}
                        onChange={handleFromChange}
                    />
                </div>

                <div className="col-lg-3 mb-3">
                    <SelectOption
                        label={"کلاس"}
                        name={'class_id'}
                        value={formData?.class_id}
                        options={classes}
                        onChange={handleFromChange}
                    />
                </div>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-lg-3">
                <div className="col-lg-3 mb-3">
                    <DatePicker
                        label="تاریخ و ساعت شروع کلاس"
                        name="class_time"
                        date={formData?.class_time}
                        onChange={handleFromChange}
                        timepicker={true}
                    />
                </div>
                <div className="col-lg-3 mb-3">
                    <DatePicker
                        label="تاریخ و ساعت امتحان"
                        name="exam_time"
                        date={formData?.exam_time}
                        onChange={handleFromChange}
                        timepicker={true}
                    />
                </div>
                <div className="col-lg-3 mb-3">
                </div>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-around mb-5">
                <div className="flex-grow-1 pe-lg-5 ps-lg-5">
                    <CFormTextarea
                        name="description"
                        label="توضیحات"
                        value={formData?.description}
                        rows={3}
                        onChange={handleFromChange}
                    ></CFormTextarea>
                </div>
            </div>


            <div className="d-flex flex-column flex-lg-row justify-content-around mb-5">
                <div className="flex-grow-1 pe-lg-5 ps-lg-5">
                    <CInputGroup className="d-flex flex-column mb-4 flex-nowrap ">
                        <MultiSelectOption
                            name='members'
                            options={students ? students : []}
                            value={formData?.members}
                            onChange={handleFromChange}
                            label="دانش آموزان این درس "
                        />
                    </CInputGroup>
                </div>
            </div>



            <div className="d-flex flex-column-reverse gap-5 flex-lg-row justify-content-center align-items-stretch mb-4">
                    <NavLink className='col-lg-2' to='/admin/Absences'>
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


export default AbsencesForm;

