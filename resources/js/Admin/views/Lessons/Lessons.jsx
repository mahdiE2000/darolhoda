import React, { useEffect, useState } from 'react';
import SmartTable from '../../../Tools/SmartTable/SmartTable';
import useAPI from '../../../Tools/API/useAPI';

const Lessons = () => {
    //Variables
    const { fetchPaginate } = useAPI();
    const [lessonsData, setLessonsData] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const columns = [
      {
        key: 'id',
        label: 'id',
        _style: { width: '8%' },
      },
      {
        key: 'title',
        label: 'عنوان',
        _style: { width: '40%' },
      },
      {
        key: 'time',
        label: 'ساعت',
        _style: { width: '40%' },
      },
      {
        key: 'show_details',
        label: '',
        _style: { width: '100%' },
        filter: false,
        sorter: false,
      },
    ]

    //Useeffect
    useEffect(() => {
      fetchLessons();
    }, [currentPage, itemsPerPage]);


    //Functions
    const fetchLessons =  () => {
        const params = { itemsPerPage, page: currentPage }
        fetchPaginate("lessons", setLessonsData, setTotalPages, params);
    };


    return (
        <div className='d-flex flex-column'>
            <SmartTable
                columns={columns}
                Data={lessonsData}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
                currentPage={currentPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
            />
      </div>
    )
};

export default Lessons;
