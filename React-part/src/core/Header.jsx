import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthenticationContext } from "../user/AuthenticationContext";

export default function Header() {
    const { isAuthenticated } = useContext(AuthenticationContext);
    //console.log('in Header 4 ');

    return (
        <>
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/courses">Courses</Link>
                    <Link to="/courses/search">Search</Link>
                    {isAuthenticated
                        ?
                        (<div className='userButtons'>
                            <Link to="/lecturers">Lecturers</Link>
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
