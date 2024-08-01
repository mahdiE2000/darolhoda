import React, { useState } from 'react'

const useFormState = () => {
    const [formData, setFormData] = useState({
        score: '',
        file: '',
    });

    return [formData , setFormData]
}

export default useFormState
