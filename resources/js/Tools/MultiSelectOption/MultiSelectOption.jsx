import React, { useEffect, useState } from 'react';
import { CFormLabel, CMultiSelect } from "@coreui/react-pro";

const MultiSelectOption = ({ label, name, options, onChange, value=null }) => {
    const handleMultiSelectChange = (selectedOptions) => {
        onChange({ name, value: selectedOptions });
    };
    return (
        <>
            <CFormLabel>{label}</CFormLabel>
            <CMultiSelect
                className="col-md-12 d-flex flex-column"
                name={name}
                options={options}
                onChange={handleMultiSelectChange}
                placeholder="جستجو کنید"
                selectAllLabel="انتخاب همه"
                virtualScroller
                label=""
            />
        </>
    );
};

export default MultiSelectOption;
