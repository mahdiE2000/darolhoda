import React, { useEffect, useState } from 'react';
import SmartTable from '../../../Tools/SmartTable/SmartTable';
import useAPI from '../../../Tools/API/useAPI';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CButton } from '@coreui/react-pro';
import { cibAddthis } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import useForm from '../../../Tools/useForm/useForm';
import Filter from '../../../Tools/Filter/Filter';

const Teachers = () => {
    //Variables
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
        label: 'نام ',
        _style: { width: '20%' },
      },
      {
        key: 'lname',
        label: 'نام خانوادگی',
        _style: { width: '20%' }
      },
      {
        key: 'teacher_code',
        label: 'شماره پرونده',
        _style: { width: '20%' },
      },
      {
        key: 'phone',
        label: 'موبایل',
        _style: { width: '20%' },
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
        fetchUsers(filterData?.filter);
    }, [currentPage, itemsPerPage, filterData]);
    // useEffect(() => {
    //     console.log('totalPages :: ',totalPages);
    // }, [totalPages, totalPages]);
    // useEffect(() => {
    //     console.log('filterData :: ',filterData)
    // }, [filterData]);
    // const htmlSnippet = '<div class="d-flex justify-content-center p-4"><a class="col-lg-2" href="/Create"><button class="text-white w-100" style="background-color: green; border-radius: 50px;">ایجاد</button></a></div>';

    // useEffect(() => {
    //     const createButoon = (
    //         <Filter key='filter' filterData={filterData} setFilterData={setFilterData} handleFilterChange={handleFilterChange}/>
    //     )
    //     dispatch({
    //         type: 'set',
    //         toolBars: [createButoon]
    //     });
    // }, []);


    // Functions

    const fetchUsers =  (search=null) => {
        let url = search ? `teachers/search/${search}` : "teachers"
        console.log('url :: ',url , filterData);
        const params = { itemsPerPage, page: currentPage, search  }
        fetchPaginate("teachers" , setUsersData, setTotalPages, params);
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

export default Teachers;
