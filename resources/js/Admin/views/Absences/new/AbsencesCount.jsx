import React, { useEffect, useRef, useState } from 'react';
import useAPI from '../../../../Tools/API/useAPI';
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CSmartTable, CTable, CTooltip } from '@coreui/react-pro';




const AbsencesCount = ({id, visible, closeModal}) => {
    //Variables
    const { fetch } = useAPI();
    const [courseData, setCourseData] = useState();
    const columns = [
        {
          key: 'full_name',
          label: 'نام و نام خانوادگی',
          _props: { scope: 'col' },
          _style: { width: '10%' },
        },
        {
            key: 'absences',
            label: 'تعداد غیبت',
            _props: { scope: 'col' },
            _style: { width: '10%' },
          },
      ]

    //UseEffects


    useEffect(() => {
        fetchCourse();
    },[id]);
    //Functions
    const fetchCourse =  () => {
        fetch(`courses`, setCourseData, {}, id);
    };

    // const scopedColumns = {
    //     show_details: (item) => {
    //         return (
    //         );
    //     },
    // };
    return (
        <CModal
            size="xl"
            visible={visible}
            onClose={closeModal}
            >
            <CModalHeader className='d-flex'>
                <CModalTitle id="OptionalSizesExample1">حضور و غیاب</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CSmartTable
                    columns={columns}
                    items={courseData?.members.map(item => ({
                        full_name: `${item.name} ${item.last_name}`,
                        absences: item.absences
                    }))}
                    scopedColumns={{
                        absences: (item) => (
                            (item.absences > 3) ? (
                                <td className='text-danger'>
                                    {item.absences}
                                </td>
                            ) : (
                                <td>
                                    {item.absences}
                                </td>
                            )
                        )
                    }}
                    itemsPerPage={courseData?.members.length || 1}
                    tableProps={{
                        responsive: true,
                        striped: true,
                        hover: true,
                    }}
                    noItemsLabel="داده ای پیدا نشد"

                />
            </CModalBody>
        </CModal>
    )
};

export default AbsencesCount;
