import React, { useState } from 'react'
import { format as formatGregorian, parse } from 'date-fns';
const useFormState = () => {
    const [formData, setFormData] = useState({
        title: '',
        date: formatGregorian(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        report_start_time: formatGregorian(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        report_end_time: formatGregorian(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    });

    return [formData , setFormData]
}

export default useFormState
