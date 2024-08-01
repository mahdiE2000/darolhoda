import { useState } from 'react';

const useField = () => {
    const [formData, setFormData] = useState({
        id: '',
        // uname: '',
        password: '',
        teacher_code: '',
        name: '',
        lname: '',
        code_meli: '',
        phone: '',
    });

    return [formData, setFormData];
};

export default useField;
