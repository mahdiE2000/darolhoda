import React, { useState } from 'react'

const useFormState = () => {
    const [formData, setFormData] = useState({
        score: '',
    });

    return [formData , setFormData]
}

export default useFormState
