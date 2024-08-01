import React, { useEffect, useRef, useState } from 'react';
import { format as formatGregorian, parse } from 'date-fns';
import useAPI from '../../../../Tools/API/useAPI';
import { CBadge, CButton, CFormSwitch, CModal, CModalBody, CModalHeader, CModalTitle, CSmartTable, CTable, CTooltip } from '@coreui/react-pro';
import useField from "./AbsencesFields";
import DatePicker from '../../../../Tools/DatePicker/DatePicker';
import Swal from 'sweetalert2';
import useForm from '../../../../Tools/useForm/useForm';



const AbsencesCreate = ({id, visible, closeModal}) => {
    //Variables
    const { fetch, create } = useAPI();
    const [ formData, setFormData, handleFromChange ] = useForm(useField);
    const [courseData, setCourseData] = useState();
    const columns = [
        {
          key: 'full_name',
          label: 'نام و نام خانوادگی',
          _props: { scope: 'col' },
          _style: { width: '10%' },
        },
        {
            key: 'show_details',
            label: 'وضعیت',
            _props: { scope: 'col' },
            _style: { width: '10%' },
          },
      ]

    //UseEffects

    useEffect(() => {
        console.log(formData);
    },[formData]);

    useEffect(() => {
        fetchCourse();
    },[id]);

    useEffect(() => {
        if(courseData?.members)
            {
            setFormData({
                members : courseData.members.map(member => ({
                    full_name: `${member.name} ${member.last_name}`,
                    course_selected: member.course_selected,
                    status: 1
                })),
                course_id: id,
                date: formatGregorian(new Date(), 'yyyy-MM-dd hh:mm:ss')
            });
        }
    },[courseData]);
    //Functions
    const fetchCourse =  () => {
        fetch(`courses`, setCourseData, {}, id);
    };

    const createAbsences =  () => {
        const formDataToSend = new FormData();
        const selectedMembers = formData.members.filter(member => member.status === 0);
        console.log(' course_selected :: ', selectedMembers)
        formDataToSend.append('course_id', id);
        formDataToSend.append('date', formData.date);
        console.log('selectedMembers.length :: ', selectedMembers.length);
        if (selectedMembers.length === 0) {
            formDataToSend.append('course_selected', JSON.stringify([]));
        } else {
            selectedMembers.forEach((member, index) => {
                console.log(' course_selected :: ', member.course_selected)
                formDataToSend.append('course_selected[]', member.course_selected);
            });
        }
        const data = {
            course_id: id,
            date: formData.date,
            course_selected_id: selectedMembers.length=== 0 ? [] : selectedMembers.map(member => member.course_selected)
        };
        console.log('data :: ', data);

        const params = {};
        create(`absences`, data, params);
        closeModal();
    };


    const handleAbsences = (item) => {
        //console.log('item :: ',item);
        setFormData((prevData) => ({
            ...prevData,
            members: prevData.members.map(member =>
                member.course_selected === item.course_selected
                  ? { ...member, status: member.status ? 0 : 1 }
                  : member
              )
        }));
    };

    const handleConfirm = () => {
        Swal.fire({
            title: 'ثبت حضور و غیاب',
            text: 'آیا از ثبت اطلاعات مطمئن هستید؟',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله',
            confirmButtonColor: 'green',
            cancelButtonText: 'خیر',
            cancelButtonColor: 'red',
            }).then((result) => {
                if (result.isConfirmed) {
                    createAbsences();
                    // setFormDataReady(true);
                }
        });
    };

    const scopedColumns = {
        show_details: (item) => {
            return (
                <td>
                    <div className="d-flex justify-content-center align-item-center">
                        <CButton style={{border: 'none'}} onClick={()=>handleAbsences(item)}>
                            {item.status ? (
                                <CBadge color='success'>حاضر</CBadge>
                            ) : (
                                <CBadge color='danger'>غایب</CBadge>

                            )}
                        </CButton>

                        <CFormSwitch
                            className={'d-flex align-item-center justify-content-center pt-1'}
                            style={{backgroundColor : item.status ? '#3dad5b' : 'red', borderColor : item.status ? '#3dad5b' : 'red'}}
                            // variant={'3d'}
                            color={'success'}
                            checked={item.status}
                            onChange={()=>handleAbsences(item)}
                        />

                    </div>
                </td>
            );
        },
    };
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
                <div className='mb-5'>
                <DatePicker
                        label="تاریخ"
                        name="class_time"
                        onChange={handleFromChange}
                        timepicker={true}
                    />
                </div>
                <CSmartTable columns={columns} items={formData?.members} scopedColumns={scopedColumns} itemsPerPage={formData?.members.length || 1}  tableProps={{
                        responsive: true,
                        striped: true,
                        hover: true,
                    }}
                    noItemsLabel="داده ای پیدا نشد"
                    />
                <div className='d-flex justify-content-center '>
                    <CButton color='success' className='text-white' onClick={handleConfirm}>تایید</CButton>
                </div>
            </CModalBody>
        </CModal>
    )
};

export default AbsencesCreate;
