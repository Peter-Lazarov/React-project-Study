import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../hooks/useForm";
import { registerRequest } from "./authenticationService";


export default function Register() {
    const [errors, setErrors] = useState({ email: '', password: '', rePassword: '', name: '' });

    const navigate = useNavigate();
    const initialValues = { email: '', password: '', rePassword: '', name: '' };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const registerHandler = async ({ email, password, rePassword, name }) => {

        try {
            const emailError = validateEmail(email) ? '' : `Invalid email format ${email}`;
            const passwordError = password.length >= 4 ? '' : 'Password must be at least 4 characters long';
            const rePasswordError = (password == rePassword && rePassword != '') ? '' : 'Passwords do not match'
            const nameError = name.length >= 3 ? '' : 'Name must be at least 3 characters long';

            if (emailError || passwordError || rePasswordError || nameError) {
                setErrors({ email: emailError, password: passwordError, rePassword: rePasswordError, name: nameError });
                return;
            }

            await registerRequest(email, password, name);
            navigate('/login');
        } catch (error) {
            setErrors({...errors, additional: error.error});
            console.log(error);
        }
    };

    const { formValues,
        changeHandler,
        submitHandler } = useForm(
            initialValues,
            registerHandler
        );

    //console.log('formvalues');
    //console.log(formValues);

    return (
        <>
            <form className="register" onSubmit={submitHandler}>

                <fieldset>
                    <h2>Registration Form</h2>

                    {errors.additional && <span className="serverError">{errors.additional}</span>}

                    <div className="field">
                        <label htmlFor="email"><span>e-mail</span></label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="ivan@mail.bg (8)"
                            value={formValues.email}
                            onChange={changeHandler}
                        />
                        {errors.email && <p className="fronEndError">{errors.email}</p>}
                    </div>
                    <div className="field">
                        <label htmlFor="password"><span>password</span></label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formValues.password}
                            onChange={changeHandler}
                            placeholder="all characters (4)"
                        />
                        {errors.password && <p className="fronEndError">{errors.password}</p>}
                    </div>
                    <div className="field">
                        <label htmlFor="rePassword"><span>re-password</span></label>
                        <input
                            type="password"
                            name="rePassword"
                            id="rePassword"
                            value={formValues.rePassword}
                            onChange={changeHandler}
                            placeholder="all characters (4)"
                        />
                        {errors.rePassword && <p className="fronEndError">{errors.rePassword}</p>}
                    </div>
                    <div className="field">
                        <label htmlFor="name"><span>name</span></label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formValues.name}
                            onChange={changeHandler}
                            placeholder="Ivan Todorov (3)"
                        />
                        {errors.name && <p className="fronEndError">{errors.name}</p>}
                    </div>
                    <button type="submit">Register</button>
                </fieldset>
            </form>
        </>
    )
}
