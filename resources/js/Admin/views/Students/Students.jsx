import React, { useEffect, useState } from 'react';
import SmartTable from '../../../Tools/SmartTable/SmartTable';
import useAPI from '../../../Tools/API/useAPI';
import { useDispatch } from 'react-redux';
import useForm from '../../../Tools/useForm/useForm';
import Filter from '../../../Tools/Filter/Filter';

const Students = () => {
    const { fetchPaginate } = useAPI();
    const [usersData, setUsersData] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filterData, setFilterData, handleFilterChange] = useForm()
    const dispatch = useDispatch();
    const columns = [
        {
          key: 'id',
          label: 'id',
          _style: { width: '8%' },
        },
        {
          key: 'name',
          label: 'نام',
          _style: { width: '20%' },
        },
        {
            key: 'lname',
            label: 'نام خانوادگی',
            _style: { width: '20%' }
        },
        {
          key: 'student_code',
          label: 'شماره طلبگی',
          _style: { width: '20%' },
        },
        {
          key: 'phone',
          label: 'موبایل',
          _style: { width: '20%' }
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '100%' },
          filter: false,
          sorter: false,
        },
    ]

    // useEffect
    useEffect(() => {
        fetchUsers(filterData?.filter);
    }, [currentPage, itemsPerPage, filterData]);

    // useEffect(() => {
    //     dispatch({
    //         type: 'set',
    //         toolBars: [createButoon]
    //     });
    // }, []);

    // Functions
    const createButoon =(
        <Filter key='filter' filterData={filterData} setFilterData={setFilterData} handleFilterChange={handleFilterChange}/>
    )
    const fetchUsers =  (search=null) => {
        let url = search ? `students/search/${search}` : "students"
        console.log('url :: ',url);
        const params = {  }
        fetchPaginate(url , setUsersData, setTotalPages, params);
    };

    return (
        <div className='d-flex flex-column'>
            <SmartTable
                columns={columns}
                Data={usersData}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
                currentPage={currentPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
            />
      </div>
    )
};


export default Students;
