import React from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../hooks/useForm";
import { loginRequest } from "./authenticationService";

export default function Login() {
    const initialValues = { email: '', password: '' };
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const loginHandler = async ({ email, password }) => {
        try {
            const emailError = validateEmail(email) ? '' : 'Invalid email format';
            const passwordError = password.length >= 4 ? '' : 'Password must be at least 4 characters long';

            if (emailError || passwordError) {
                setErrors({ email: emailError, password: passwordError });
                return;
            }

            await loginRequest(email, password)
            navigate('/');
        } catch (error) {
            setErrors({...errors, additional: error.error});
            console.log(error.error);
        }
    }

    const { formValues, changeHandler, submitHandler } = useForm(
        initialValues,
        loginHandler
    );

    const memoizedChangeHandler = useCallback((event) => {
        const { name, value } = event.target;
        changeHandler({ name, value });
    }, [changeHandler]);
    
    
    return (
        <>
            <div className="container">
                <form className="login" onSubmit={submitHandler}>
                    <fieldset>
                        <h2>Login Form</h2>
                        {errors.additional && <span className="serverError">{errors.additional}</span>}
                        <div className="field">
                            <label htmlFor="email">e-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formValues.email}
                                onChange={memoizedChangeHandler}
                                placeholder="john.doe@gmail.com"
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="field">
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formValues.password}
                                onChange={memoizedChangeHandler}
                                placeholder="******"
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <button type="submit">Login</button>
                    </fieldset>
                </form>
            </div>
        </>
    );
}
