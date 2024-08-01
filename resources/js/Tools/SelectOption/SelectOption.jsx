import React from 'react';
import { CFormLabel } from "@coreui/react-pro";
import Select from 'react-select';

const SelectOption = ({ label, name, options, onChange, value=null , disabled=false}) => {
    const findOptionByValue = (value) => options?.length ? options?.find(option => option?.value === value) : '';
    const selectChangeHandler = (name) => (selectedOption) => {
        console.log('bbbbb::', name, selectedOption)
        onChange({ name, value: selectedOption.value });
    };

    return (
        <>
            <CFormLabel>{label}</CFormLabel>
            <Select
                onChange={selectChangeHandler(name)}
                name={name}
                options={options}
                value={value ? findOptionByValue(value) : null}
                placeholder="جستجو کنید"
                label=""
                disabled={disabled}
            />
        </>
    );
};

export default SelectOption;
