import { useNavigate } from "react-router-dom";

import useForm from "../hooks/useForm";
import { useLogin } from "./useAuthentication";
import { useState } from "react";

export default function Login() {
    const loginHook = useLogin();
    const navigate = useNavigate();

    const initialValues = { email: '', password: '' };
    const [errors, setErrors] = useState({ email: '', password: '' });

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

            await loginHook(email, password);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }

    const { formValues,
        changeHandler,
        submitHandler } = useForm(
            initialValues,
            loginHandler
        );

    return (
        <>
            <div className="container">
                <form className="login" onSubmit={submitHandler}>
                    <fieldset>
                        <h2>Login Form</h2>
                        <div className="field">
                            <label htmlFor="email"><span></span></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formValues.email}
                                onChange={changeHandler}
                                placeholder="john.doe@gmail.com"
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="field">
                            <label htmlFor="password"><span></span></label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formValues.password}
                                onChange={changeHandler}
                                placeholder="******"
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <input type="submit" className="btn submit" value="Login" />
                    </fieldset>
                </form>
            </div>
        </>
    )
}
