import { useNavigate } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { useLogin } from "./useAuthentication";

export default function Login() {
    const loginHook = useLogin();
    const navigate = useNavigate();

    const initialValues = { email: '', password: '' };
    const loginHandler = async ({ email, password }) => {
        try {
            await loginHook(email, password);
            //navigate('/');
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
                        <p className="field field-icon">
                            <label htmlFor="email"><span></span></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formValues.email}
                                onChange={changeHandler}
                                placeholder="john.doe@gmail.com"
                            />
                        </p>
                        <p className="field field-icon">
                            <label htmlFor="password"><span></span></label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formValues.password}
                                onChange={changeHandler}
                                placeholder="******"
                            />
                        </p>
                        <input type="submit" className="btn submit" value="Login" />
                    </fieldset>
                </form>
            </div>
        </>
    )
}
