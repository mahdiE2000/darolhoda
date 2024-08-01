import { useState } from 'react';

const useField = () => {
    const [formData, setFormData] = useState({
        course_id: '',
        members: [],
        date: '',
    });

    return [formData, setFormData];
};

export default useField;
