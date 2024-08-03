import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthenticationContext } from "../user/AuthenticationContext";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Header() {
    //const { isAuthenticated } = useContext(AuthenticationContext);

    const { isAuthenticated, addCookieAuthenticationState } = useContext(AuthenticationContext);
    //const [cookies] = useCookies(['authorisation']); // Get the 'authorisation' cookie
    const [cookies] = useCookies();

    useEffect(() => {
        // Set authentication state based on the cookie
        addCookieAuthenticationState(cookies.authorisation);
        //console.log(cookies.userId);
        //console.log(cookies.userEmail);
        //console.log(cookies.userName);
    }, [cookies.authorisation, addCookieAuthenticationState]);

    return (
        <>
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/courses">Courses</Link>
                    {isAuthenticated
                        ?
                        (<div className='userButtons'>
                            <Link to="/logout">Logout</Link>
                        </div>)
                        : (<div className='guestButtons'>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>)
                    }
                </nav>
            </header>
        </>
    )
}
