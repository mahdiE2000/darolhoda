import React, { useEffect, useRef, useState } from 'react';
import { format as formatGregorian, parse } from 'date-fns';
import useAPI from '../../../../Tools/API/useAPI';
import { CBadge, CButton, CFormSwitch, CModal, CModalBody, CModalHeader, CModalTitle, CSmartTable, CFormInput, CTooltip } from '@coreui/react-pro';
import useField from "./AbsencesFields";
import DatePicker from '../../../../Tools/DatePicker/DatePicker';
import Swal from 'sweetalert2';
import useForm from '../../../../Tools/useForm/useForm';
import { useParams } from 'react-router-dom';



const AbsencesUpdate = ({sessionId, visible, closeModal}) => {
    //Variables
    const { fetch, update } = useAPI();
    const { formData, setFormData, handleFromChange } = useForm(useField);
    const [courseData, setCourseData] = useState();
    const [sessionData, setSessionData] = useState();
    const { id } = useParams();
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
        console.log('sessionData ::',sessionData);
    },[sessionData]);

    useEffect(() => {
        fetchCourse();
        fetchSessions();
    },[sessionId]);

    useEffect(() => {
        if(courseData && courseData.members && sessionData){
            const sessionCourseIds = new Set(sessionData.map(session => session.course_selected_id));
            //console.log('sessionCourseIds :: ',sessionCourseIds)
            // Update the status of common persons in array1
            setFormData({
                members : courseData.members.map(member => ({
                    full_name: `${member.name} ${member.last_name}`,
                    course_selected: member.course_selected,
                    status : sessionCourseIds.has(member.course_selected) ? 0 :  1,
                })),
                course_id: id,
                // date: formatGregorian(new Date(), 'yyyy-MM-dd hh:mm:ss')
            });
            setSessionData();
        }

    },[courseData, sessionData]);

    //Functions
    const fetchCourse =  () => {
        //console.log('course id :: ',id,)
        fetch(`courses`, setCourseData, {}, id);
    };
    const fetchSessions =  () => {
        //console.log('sessins id :: ',sessionId,)
        fetch(`sessions`, setSessionData, {}, sessionId);
    };

    const updateAbsences =  () => {
        const formDataToSend = new FormData();
        const selectedMembers = formData.members.filter(member => member.status === 0);

        formDataToSend.append('course_id', id);
        console.log('selectedMembers.length :: ',selectedMembers);
        if (selectedMembers.length === 0) {
            formDataToSend.append('course_selected', JSON.stringify([]));
        } else {
            selectedMembers.forEach((member, index) => {
                formDataToSend.append('course_selected[]', member.course_selected);
            });
        }
        //console.log('FormData after adding members:', [...formDataToSend.entries()]);
        for (let pair of formDataToSend.entries()) {
            //console.log(pair[0] + ': ' + pair[1]);
        }
        const data = {
            course_id: id,
            date: formData.date,
            course_selected: selectedMembers.length=== 0 ? [] : selectedMembers.map(member => member.course_selected)
        };
        update(`sessions`, sessionId ,data);
        closeModal();
    };

    const handleAbsences = (e, item) => {
        let {value} = e.target
        console.log('item :: ',item, e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            members: prevData.members.map(member =>
                member.course_selected === item.course_selected
                  ? { ...member, status: Number(value) }
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
                    updateAbsences();
                    // setFormDataReady(true);
                }
        });
    };

    const scopedColumns = {
        show_details: (item) => {
            return (
                <td>
                    <div className="d-flex justify-content-center align-item-center gap-3 ">
                        {/* <CButton style={{border: 'none'}} onClick={()=>handleAbsences(item)}>
                            {
                            item.status == 0 ? (
                                <CBadge color='danger'>غایب</CBadge>
                            ) : item.status == 1 ? (
                                <CBadge color='success'>حاضر</CBadge>

                            ) : item.status == 2 && (
                                <CBadge color='warning'>تاخیر</CBadge>
                            )
                            }
                        </CButton> */}

                        <CButton className="text-wite" shape="rounded-pill" color={item.status === 1 ? 'success' : 'secondary'} value="1" onClick={(e)=>handleAbsences(e, item)} >حاضر</CButton>
                        <CButton className="text-wite" shape="rounded-pill" color={item.status === 0 ? 'danger' : 'secondary'}  value="0"  onClick={(e)=>handleAbsences(e ,item)} >غایب</CButton>
                        <CButton className="text-wite" shape="rounded-pill" color={item.status === 2 ? 'warning' : 'secondary'} value="2" onClick={(e)=>handleAbsences(e ,item)} >تاخیر</CButton>
                        <CFormInput type="number" className="mt-auto" size='sm' disabled={item.status != 2} style={{width: '4rem'}}></CFormInput>
                        {/* <CFormSwitch
                            className={'d-flex align-item-center justify-content-center pt-1'}
                            style={{backgroundColor : item.status ? '#3dad5b' : 'red', borderColor : item.status ? '#3dad5b' : 'red'}}
                            // variant={'3d'}
                            color={'success'}
                            checked={item.status}
                            onChange={()=>handleAbsences(item)}
                        /> */}

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
                {/* <DatePicker
                        label="تاریخ"
                        name="class_time"
                        onChange={handleFromChange}
                        timepicker={true}
                    /> */}
                </div>
                <CSmartTable columns={columns} items={formData?.members} scopedColumns={scopedColumns} itemsPerPage={formData?.members.length || 1}  tableProps={{
                        responsive: true,
                        striped: true,
                        hover: true,
                    }}
                    noItemsLabel="داده ای پیدا نشد"
                    />
                <div className='d-flex justify-content-center pt-2'>
                    <CButton color='success' className='text-white pe-5 ps-5' onClick={handleConfirm}>تایید</CButton>
                </div>
            </CModalBody>
        </CModal>
    )
};

export default AbsencesUpdate;
