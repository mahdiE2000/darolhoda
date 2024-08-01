import React, { useState } from 'react';
import { CForm, CFormFloating, CFormInput, CFormLabel, CButton, CFormTextarea } from '@coreui/react';
import SelectOption from '../SelectOption/SelectOption';
import DatePicker from '../../Tools/DatePicker/DatePicker';
import { NavLink } from 'react-router-dom';

const DynamicForm = ({ fields, formData, handleFormChange, onSubmit, cancelPath }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      await onSubmit();
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <CForm>
      <div className="d-flex flex-column">
        {fields.map((row, rowIndex) => (
          <div key={rowIndex} className={`d-flex flex-column flex-lg-row justify-content-around mb-lg-3 ${row.some(field => field.type === 'textarea') ? 'col-lg-12' : ''}`}>
            {row.map((field, colIndex) => (
              <div key={colIndex} className={`mb-3 ${field.type !== 'textarea' ? 'col-lg-3' : 'col-lg-12'}`}>
                {field.type === 'input' && (
                  <CFormFloating>
                    <CFormInput
                      name={field.name}
                      placeholder=""
                      value={formData[field.name] || ''}
                      onChange={handleFormChange}
                    />
                    <CFormLabel className="ps-lg-3">{field.label}</CFormLabel>
                    {errors[field.name] && <div className="text-danger">{errors[field.name]}</div>}
                  </CFormFloating>
                )}
                {field.type === 'select' && (
                  <>
                    <SelectOption
                      value={formData[field.name]}
                      label={field.label}
                      name={field.name}
                      options={field.options}
                      onChange={handleFormChange}
                    />
                    {errors[field.name] && <div className="text-danger">{errors[field.name]}</div>}
                  </>
                )}
                {field.type === 'date' && (
                  <>
                    <DatePicker
                      date={formData[field.name]}
                      label={field.label}
                      name={field.name}
                      onChange={handleFormChange}
                      timepicker={field.timepicker}
                    />
                    {errors[field.name] && <div className="text-danger">{errors[field.name]}</div>}
                  </>
                )}
                {field.type === 'textarea' && (
                  <>
                    <CFormTextarea
                      name={field.name}
                      label={field.label}
                      rows={field.rows || 3}
                      value={formData[field.name] || ''}
                      onChange={handleFormChange}
                    ></CFormTextarea>
                    {errors[field.name] && <div className="text-danger">{errors[field.name]}</div>}
                  </>
                )}
                {field.type === 'empty' && (
                  <div className="col-lg-3 mb-3"></div>
                )}
              </div>
            ))}
          </div>
        ))}
        <div className="d-flex flex-column-reverse gap-5 flex-lg-row justify-content-center align-items-stretch mb-4">
          <NavLink className="col-lg-2" to={cancelPath}>
            <CButton className="text-white w-100" color="secondary" shape="rounded-pill">انصراف</CButton>
          </NavLink>
          <div className="col-lg-2">
            <CButton className="text-white w-100" color="success" shape="rounded-pill" onClick={handleSubmit}>تایید</CButton>
          </div>
        </div>
      </div>
    </CForm>
  );
};

export default DynamicForm;
