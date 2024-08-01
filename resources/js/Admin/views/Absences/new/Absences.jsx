import React, { useEffect, useState } from 'react';
import SmartTable from '../../../../Tools/SmartTable/SmartTable';
import useAPI from '../../../../Tools/API/useAPI';
import { cibAddthis, cilCommentSquareEdit, cilTrash, cisEye } from '@coreui/icons-pro';
import { CButton, CTooltip } from '@coreui/react-pro';
import { NavLink } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import AbsencesCreate from './AbsencesCreate';
import AbsencesCount from './AbsencesCount';


const Absences = () => {
    //Variables
    const { fetchPaginate } = useAPI();
    const [absenceData, setAbsenceData] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modal, setModal] = useState();
    const [modalVisible, setModalVisible] = useState();
    const [id, setId] = useState();
    const columns = [
    //   {
    //     key: 'id',
    //     label: 'id',
    //     _style: { width: '8%' },
    //   },
      {
        key: 'teacher',
        label: 'استاد',
        _style: { width: '17%' },
      },
      {
        key: 'lesson',
        label: 'درس',
        _style: { width: '17%' },
      },
      {
        key: 'class',
        label: 'کلاس',
        _style: { width: '17%' },
      },
      {
        key: 'class_time',
        label: 'زمان کلاس',
        _style: { width: '17%' },
      },
      {
        key: 'exam_time',
        label: 'تاریخ امتحان',
        _style: { width: '17%' },
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
      fetchAbsences();
    }, [currentPage, itemsPerPage]);
    useEffect(() => {
        //console.log(absenceData);
      }, [absenceData]);
    // useEffect(() => {
    //     OpenModal()
    // }, [modal]);


    //Functions
    const fetchAbsences =  () => {
        const params = { itemsPerPage, page: currentPage }
        fetchPaginate("courses", setAbsenceData, setTotalPages, params);
    };

    const handleModal = (id, event) => {
        const { name } = event.currentTarget ;
        setId(id)
        setModal(name);
        setModalVisible(true)
    }

    const closeModal = () => {
        setId()
        setModal();
        setModalVisible(false)
    }

    const scopedColumns = {
        show_details: (item) => {
            return (
                <td>
                    <div className="d-flex justify-content-around">
                        <CTooltip
                        animation={false}
                        content="ویرایش"
                        placement="top"
                        >
                            <CButton name='AbsencesView' style={{border: 'none'}}>
                                <NavLink to={`Report/${item.id}`}>
                                    <CIcon icon={cilCommentSquareEdit} className="text-primary" size="xl" />
                                </NavLink>
                            </CButton>
                        </CTooltip>

                        <CTooltip
                        animation={false}
                        content="گزارش"
                        placement="top"
                        >
                            <CButton name='AbsencesCount' style={{border: 'none'}} onClick={(event) => handleModal(item.id, event)}>
                                <CIcon icon={cisEye} className="text-dark" size="xl" />
                            </CButton>
                        </CTooltip>

                        <CTooltip
                        animation={false}
                        content="حضور و غیاب جدید"
                        placement="top"
                        >
                            <CButton name='AbsencesCreate' style={{border: 'none'}} onClick={(event) => handleModal(item.id, event)}>
                                <CIcon icon={cibAddthis} className="text-success" size="xl" />
                            </CButton>
                        </CTooltip>
                    </div>
                </td>
            );
        },
    };
    return (
        <div className='d-flex flex-column'>
            <SmartTable
                columns={columns}
                Data={absenceData}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
                currentPage={currentPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
                scopedColumns={scopedColumns}
                createButton={false}
            />
            {modal === 'AbsencesCreate' &&(
                <AbsencesCreate id={id} visible={modalVisible} closeModal ={closeModal}/>
            )}
            {modal === 'AbsencesCount' &&(
                <AbsencesCount id={id} visible={modalVisible} closeModal ={closeModal}/>
            )}


      </div>
    )
};

export default Absences;
