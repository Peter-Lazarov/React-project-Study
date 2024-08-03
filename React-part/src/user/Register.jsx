import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../hooks/useForm";
import { useRegister } from "./useAuthentication";


export default function Register() {
    const [error, setError] = useState('');
    const registerHook = useRegister();
    const navigate = useNavigate();
    const initialValues = { email: '', password: '', rePassword: '', name: ''};

    const registerHandler = async ({ email, password, rePassword, name}) => {
        if (password != rePassword) {
            setError('Password missmatch!');
            return;
        }

        try {
            await registerHook(email, password, name);
            navigate('/');
        } catch (error) {
            setError(error);
            console.log(error);
        }
    };

    const { formValues,
        changeHandler,
        submitHandler } = useForm(
            initialValues,
            registerHandler
        );
    
    // console.log('formvalues');
    // console.log(formValues);

    return (
        <>
            <form className="register" onSubmit={submitHandler}>

                <fieldset>
                    <h2>Registration Form</h2>

                    <p className="field">
                        <label htmlFor="email"><span>e-mail</span></label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="ivan@mail.bg (8)"
                            value={formValues.email}
                            onChange={changeHandler}
                        />
                    </p>
                    <p className="field">
                        <label htmlFor="password"><span>password</span></label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formValues.password}
                            onChange={changeHandler}
                            placeholder="all characters (4)"
                        />
                    </p>
                    <p className="field">
                        <label htmlFor="rePassword"><span>re-password</span></label>
                        <input
                            type="password"
                            name="rePassword"
                            id="rePassword"
                            value={formValues.rePassword}
                            onChange={changeHandler}
                            placeholder="all characters (4)"
                        />
                    </p>
                    <p className="field">
                        <label htmlFor="name"><span>name</span></label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formValues.name}
                            onChange={changeHandler}
                            placeholder="Ivan Todorov (3)"
                        />
                    </p>

                    {error && (
                        <p className="errorField">
                            {error}
                        </p>
                    )}

                    <input type="submit" value="Register" />
                </fieldset>
            </form>
        </>
    )
}
