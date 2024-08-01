import { useEffect, useState } from 'react';

const useForm = (useField=null) => {
    const [formData, setFormData] = useField ? useField() : useState({});
    const handleFromChange = (e) => {
        // console.log(e.target.value);
        try {
            const { name, value, type } = e.target;
            if (type === 'file') {
                const file = e.target.files[0];
                if (file) {
                    // handleUploadFile(file);
                }
            } else {
                // console.log(e);
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        } catch (error) {
            //console.log('e :: ',e);
            setFormData((prevData) => ({
                ...prevData,
                [e.name]: e.value,
            }));
        }
    };

    return [ formData, setFormData, handleFromChange ];
};

export default useForm;
