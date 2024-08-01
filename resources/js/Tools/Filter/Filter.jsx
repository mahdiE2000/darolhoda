import { cisSearch } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import { CButton, CCloseButton, CFormInput, CInputGroup, CInputGroupText, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
import useForm from '../useForm/useForm';



const Filter = ({filterData, setFilterData, handleFilterChange}) => {
    const [formData, setFormData, handleFromChange] = useForm()
    const [visible, setVisible] = useState(false)
    useEffect(()=>{
        console.log('filterData :: ',formData);
    },[formData])
    return (
    <>
        <div className='d-none d-md-inline w-50'>
            <CInputGroup  className='border border-primary rounded-pill p-2'>
                <CFormInput className='border-0 p-2'  name="filter" onChange={handleFromChange} style={{backgroundColor: "#fff0", boxShadow: 'none'}}/>
                <CButton color="primary" className='rounded-pill' style={{ boxShadow: 'none'}} onClick={()=> setFilterData(formData)} ><CIcon icon={cisSearch} className="text-white border-0"/></CButton>
            </CInputGroup>
        </div>
        <div className='d-inline d-md-none'>
            <CButton color="info" className='rounded-pill' style={{ boxShadow: 'none'}} onClick={() => setVisible(true)}><CIcon size='xl' icon={cisSearch} /></CButton>
            <COffcanvas placement="top" visible={visible} onHide={() => setVisible(false)}>
            <COffcanvasHeader className='d-flex justify-content-between'>
                <COffcanvasTitle>جستجو</COffcanvasTitle>
                <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
            </COffcanvasHeader>
            <COffcanvasBody>
                <CInputGroup  className='border border-primary rounded-pill p-2'>
                    <CFormInput className='border-0 p-2'  name="filter" onChange={handleFromChange} style={{backgroundColor: "#fff0", boxShadow: 'none'}}/>
                    <CButton color="primary" className='rounded-pill' style={{ boxShadow: 'none'}} onClick={()=> setFilterData(formData)}><CIcon icon={cisSearch} className="text-white border-0"/></CButton>
                </CInputGroup>
            </COffcanvasBody>
            </COffcanvas>
        </div>
    </>
)

}


export default Filter;
