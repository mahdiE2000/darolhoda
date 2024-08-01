import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import SmartTable from "../../../Tools/SmartTable/SmartTable";
import useAPI from "../../../Tools/API/useAPI";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Courses() {

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
            key: 'teacher',
            label: 'نام استاد',
            _style: { width: '20%' },
          },
        {
          key: 'lesson',
          label: 'نام درس',
          _style: { width: '20%' },
        },
        {
            key: 'class',
            label: 'کلاس',
            _style: { width: '20%' }
        },
        {
            key: 'class_time',
            label: 'ساعت کلاس',
            _style: { width: '20%' }
        },
        {
          key: 'exam_time',
          label: 'تاریخ امتحان پایانی',
          _style: { width: '20%' }
        },
    ]

    const fetchCourses =  () => {
        const params = { itemsPerPage, page: currentPage }
        fetchPaginate("courses", setCoursesData, setTotalPages, params);
    };

    return (
        <>
            <div className='d-flex flex-column'>
                <SmartTable
                    columns={columns}
                    Data={coursesData}
                    itemsPerPage={itemsPerPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                    createButton={false}
                />
            </div>
        </>
    );
}

export default Courses;
