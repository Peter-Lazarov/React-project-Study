import { useState } from "react";

export default function useForm(initialValues, submitCallback){
    const [formValues, setFormValues] = useState(initialValues);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues(state => ({
            ...state,
            [name]: value
        }))
    };

    const submitHandler = (event) => {
        event.preventDefault();
        
        submitCallback(formValues);

        setFormValues(initialValues);
    };

    return {
        formValues,
        changeHandler,
        submitHandler,
        setFormValues
    };
}
