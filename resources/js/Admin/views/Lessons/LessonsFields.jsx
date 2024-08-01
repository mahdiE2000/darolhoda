import { useState } from 'react';

const useField = () => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        time: '',

    });

    return [formData, setFormData];
};

export default useField;
