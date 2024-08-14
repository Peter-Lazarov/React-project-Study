import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "./authenticationService";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 4;
    };

    const handleEmailBlur = () => {
        const email = emailRef.current.value;
        const emailError = validateEmail(email) ? '' : 'Invalid email format';
        setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
    };

    const handlePasswordBlur = () => {
        const password = passwordRef.current.value;
        const passwordError = validatePassword(password) ? '' : 'Password must be at least 4 characters long';
        setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
    };

    const loginHandler = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const emailError = validateEmail(email) ? '' : 'Invalid email format';
        const passwordError = validatePassword(password) ? '' : 'Password must be at least 4 characters long';

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        try {
            await loginRequest(email, password);
            navigate('/');
        } catch (error) {
            setErrors({ ...errors, additional: error.error });
            console.log(error.error);
        }
    };

    return (
        <form className="login" onSubmit={loginHandler}>
            <h2>Login Form</h2>
            {errors.additional && <p className="serverError">{errors.additional}</p>}
            <div className="field">
                <label>Email:</label>
                <input
                    type="email"
                    ref={emailRef}
                    onBlur={handleEmailBlur}
                    placeholder="john.doe@gmail.com"
                />
                {errors.email && <p className="fronEndError">{errors.email}</p>}
            </div>
            <div className="field">
                <label>Password:</label>
                <input
                    type="password"
                    ref={passwordRef}
                    onBlur={handlePasswordBlur}
                    placeholder="******"
                />
                {errors.password && <p className="fronEndError">{errors.password}</p>}
            </div>
            <button type="submit">Login</button>
        </form>
    );
}
