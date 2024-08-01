import { CButton, CCol, CContainer, CDatePicker, CForm, CFormFloating, CFormInput, CFormLabel, CFormSelect, CRow } from "@coreui/react-pro";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "../../../../axios";
import DynamicForm from "../../../Tools/DynamicForm/DynamicForm"

const ExamForm = ({formData, handleFromChange , onSubmit}) => {

    const dispatch = useDispatch();
    const [teacherOption , setTeacherOption] = useState({});

    useEffect(() => {
        fetchTeacher();
    },[])

    const fetchTeacher = () => {
        dispatch({ type: 'set', loading: true });;
        axiosClient.get("courses").then(res => {
            console.log(res.data);
            setTeacherOption(res.data.data.map(teacher => ({
                label: teacher.lesson + ' ' + teacher.class_time,
                value: teacher.id,
            })))
        }).catch(error => {
            console.log(error.response)
        }).finally(() => {
            dispatch({ type: 'set', loading: false });
        })
    }


    const fields = [
        [
          { type: 'input', label: 'عنوان امتحان', name: 'title' },
          { type: 'empty' },
          { type: 'empty' }
        ],
        [
        //   { type: 'select', label: 'دوره', name: 'course_id', options: teacherOption ?  teacherOption : {}},
          { type: 'date', label: 'تاریخ و ساعت امتحان', name: 'date', timepicker: true },
          { type: 'date', label: 'تاریخ شروع اعتراض', name: 'report_start_time', timepicker: true },
          { type: 'date', label: 'تاریخ پایان اعتراض', name: 'report_end_time', timepicker: true },
        ],

      ];

    return(

        <DynamicForm
        fields={fields}
        formData={formData}
        handleFormChange={handleFromChange}
        onSubmit={onSubmit}
        cancelPath="/teacher/exams" // مسیر داینامیک
      />

    )
}

export default ExamForm
