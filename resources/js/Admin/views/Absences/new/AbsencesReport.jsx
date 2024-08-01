import React, { useEffect, useState } from 'react';
import SmartTable from '../../../../Tools/SmartTable/SmartTable';
import useAPI from '../../../../Tools/API/useAPI';
import { cibAddthis, cilCommentSquareEdit, cilTrash, cisEye } from '@coreui/icons-pro';
import { CButton, CSmartTable, CTable, CTooltip } from '@coreui/react-pro';
import { NavLink, useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import AbsencesUpdate from './AbsencesUpdate';


const AbsencesReport = () => {
    //Variables
    const { fetch } = useAPI();
    const [data, setData] = useState([]);
    const [modal, setModal] = useState();
    const [modalVisible, setModalVisible] = useState();
    const [sessionId, setSessionId] = useState();
    const { id } = useParams();

    const columns = [
    //   {
    //     key: 'id',
    //     label: 'id',
    //     _style: { width: '8%' },
    //   },
      {
        key: 'date',
        label: 'تاریخ جلسه',
        _style: { width: '90%' },
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
        fetchData();
    }, []);
    useEffect(() => {
        //console.log('data :: ',data);
    }, [data]);


    //Functions
    const fetchData =  () => {
        //console.log(id)
        const params = { }
        fetch("courses", setData, params, id);
    };


    const handleModal = (id, event) => {
        const { name } = event.currentTarget ;
        //console.log(name, id)
        setModal(name);
        setSessionId(id);
        setModalVisible(true)
    }

    const closeModal = () => {
        setSessionId()
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
                                <CButton name='AbsencesUpdate' style={{border: 'none'}} onClick={(event) => handleModal(item.id, event)}>
                                    <CIcon icon={cilCommentSquareEdit} className="text-primary" size="xl" />
                                </CButton>
                        </CTooltip>

                    </div>
                </td>
            );
        },
    };
    return (
        <div className='d-flex flex-column'>
            <CSmartTable columns={columns} items={data?.sessions ? data.sessions : []} scopedColumns={scopedColumns} itemsPerPage={data?.sessions ? data.sessions.length : 1}  tableProps={{
                        responsive: true,
                        striped: true,
                        hover: true,
                    }}
                    noItemsLabel="داده ای پیدا نشد"
                    />

            {modal === 'AbsencesUpdate' &&(
                <AbsencesUpdate sessionId={sessionId} visible={modalVisible} closeModal ={closeModal}/>
            )}

      </div>
    )
};

export default AbsencesReport;
