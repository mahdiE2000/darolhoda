import React, { useEffect, useState } from 'react';
import { CSmartTable, CBadge, CAvatar, CButton, CCollapse, CCardBody } from '@coreui/react-pro';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import axiosClient from '../../../../axios';

const UserTable = () => {
    const dispatch = useDispatch();
  const [courseData, setCourseData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const columns = [
    { key: 'lesson_title', label: 'نام درس', _style: { width: '20%' } },
    { key: 'class_time', label: 'ساعت'},
    { key: 'class_title', label: 'کلاس', _style: { width: '20%' } },
  ];

  useEffect(() => {
    fetchCourses();
  }, [currentPage, itemsPerPage]);

  const fetchCourses =  () => {
    dispatch({ type: 'set', loading: true });
    axiosClient.get("courses")
        .then((response) => {
            console.log(response.data);
            const courses = response.data.map(course => ({
              id: course.id,
              title: course.title,
              unit: course.unit,
            }));
            setCoursesData(courses);
            setTotalPages(response.data.total);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
          dispatch({ type: 'set', loading: false });
      });
  };

  return (
    <CSmartTable
      activePage={currentPage}
      clickableRows
      columns={columns}
      columnFilter
      columnSorter
      items={courseData}
      itemsPerPageSelect
      itemsPerPage={itemsPerPage}
      itemsPerPageLabel="تعداد نمایش"
      pagination
      onRowClick={(item) => handleRowClick(item)}
      sorterValue={{ column: 'status', state: 'asc' }}
      tableProps={{
        className: 'add-this-class',
        responsive: true,
        striped: true,
        hover: true,
      }}
      tableBodyProps={{ className: 'align-middle' }}
    />
  );
};

export default UserTable;
