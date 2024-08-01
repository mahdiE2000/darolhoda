import React, { useState } from 'react'
import { format as formatGregorian, parse } from 'date-fns';
const useFormState = () => {
    const [formData, setFormData] = useState({
        ask: '',
        answer: '',
    });

    return [formData , setFormData]
}

export default useFormState
