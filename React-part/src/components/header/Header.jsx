import { Link } from "react-router-dom";
import { useAuthenticationContext } from "../user/AuthenticationContext";

export default function Header() {
    const { isAuthenticated } = useAuthenticationContext();

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
