import React, { useEffect, useState } from 'react';
import SmartTable from '../../../Tools/SmartTable/SmartTable';
import useAPI from '../../../Tools/API/useAPI';


const Classes = () => {
    //Variables
    const { fetchPaginate } = useAPI();
    const [ClassesData, setClassesData] = useState([])
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
        key: 'name',
        label: 'کلاس',
        _style: { width: '80%' },
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
      fetchClasses();
    }, [currentPage, itemsPerPage]);


    //Functions
    const fetchClasses =  () => {
        const params = { itemsPerPage, page: currentPage }
        fetchPaginate("classes", setClassesData, setTotalPages, params);
    };

    return (
        <div className='d-flex flex-column'>
            <SmartTable
                columns={columns}
                Data={ClassesData}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
                currentPage={currentPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
            />
      </div>
    )
};

export default Classes;
