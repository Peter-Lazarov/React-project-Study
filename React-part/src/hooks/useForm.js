import { useEffect } from "react";
import { useState } from "react";

export default function useForm(initialValues, submitCallback){
    const [formValues, setFormValues] = useState(initialValues);

    const changeHandler = (event) => {
        setFormValues(state => ({
            ...state,
            [event.target.name]: event.target.value
        }))
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('here 11');
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
