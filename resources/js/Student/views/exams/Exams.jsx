import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';
import useAPI from "../../../Tools/API/useAPI";
import SmartTable from "../../../Tools/SmartTable/SmartTable";
import { CButton, CSmartTable } from "@coreui/react-pro";
import { NavLink } from "react-router-dom";

function Exams() {

    const dispatch = useDispatch();
    const { fetchPaginate } = useAPI();
    const [coursesData, setCoursesData] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetchCourses();
      }, [currentPage, itemsPerPage]);

      useEffect(() => {
        console.log(coursesData)
      },[coursesData]);

    const columns = [
        {
            key: 'title',
            label: 'عنوان امتحان',
            _style: { width: '20%' },
          },
        {
          key: 'date',
          label: 'تاریخ امتحان',
          _style: { width: '20%' },
        },
        {
            key: 'lesson',
            label: 'نام درس',
            _style: { width: '20%' }
        },
        {
            key: 'class',
            label: 'نام کلاس',
            _style: { width: '20%' }
        },
        {
          key: 'teacher',
          label: 'نام معلم',
          _style: { width: '10%' }
        },
        {
            key: 'show_details',
            label: '',
            _style: { width: '10%' },
            filter: false,
            sorter: false,
          },

    ]

    const fetchCourses =  () => {
        const params = { itemsPerPage, page: currentPage }
        fetchPaginate("exams", setCoursesData, setTotalPages, params);
    };

    const ScopedColumns = {
        show_details: (item) => {
            return (
                <td>
                    <div className="d-flex justify-content-around">
                        <CButton>
                            <NavLink to={`${item.id}`}>
                                <i class="bi bi-eye-fill" style={{ fontSize: "1.5rem"}}></i>
                            </NavLink>
                        </CButton>
                    </div>
                </td>
            );
        },
    };



    return (
        <>
            <div className='d-flex flex-column'>
                <CSmartTable
                    columns={columns}
                    items={coursesData.map(item => ({id: item.id,title: item.title ,date: item.date , class: item.course.class , lesson: item.course.lesson , teacher: item.course.teacher}))}
                    // itemsPerPage={itemsPerPage}
                    // totalPages={totalPages}
                    // currentPage={currentPage}
                    // setItemsPerPage={setItemsPerPage}
                    // setCurrentPage={setCurrentPage}
                    scopedColumns={ScopedColumns}
                    tableProps={{
                        responsive: true,
                        striped: true,
                        // hover: true,
                    }}
                />
            </div>
        </>
    );
}

export default Exams;
