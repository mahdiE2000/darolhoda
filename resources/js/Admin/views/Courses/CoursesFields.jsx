import { useState } from 'react';
import { format as formatGregorian, parse } from 'date-fns';
const useField = () => {
    const [formData, setFormData] = useState({
        teacher_id: '',
        lesson_id: '',
        class_id: '',
        class_time: formatGregorian(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        exam_time: formatGregorian(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    });

    return [formData, setFormData];
};

export default useField;
