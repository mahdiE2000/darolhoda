import { useState } from 'react';

const useField = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
    });

    return [formData, setFormData];
};

export default useField;
