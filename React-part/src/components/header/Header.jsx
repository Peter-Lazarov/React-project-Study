import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/courses">Courses</Link>
                    <div className='userButtons'>
                        <Link to="/logout">Logout</Link>
                    </div>
                    <div className='guestButtons'>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </nav>
            </header>
        </>
    )
}
