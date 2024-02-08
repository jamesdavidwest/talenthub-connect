import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ isLoggedIn, onLogout }) => {
    return (
        <nav>
            <div className="navbar-container">
            <div className="navbar-brand">TalentHub Connect</div>
            <ul className="navbar-links">
                <li className="navbar-links"><a href="/">Home</a></li>
                <li className="navbar-links"><a href="/search">Search</a></li>
                {isLoggedIn ? (
                <li><button onClick={onLogout}>Logout</button></li>
                ) : (
                    <>
                    <li className="navbar-links"><Link to="/signin">Sign In</Link></li>
                    <li className="navbar-links"><Link to="/createaccount">Create Account</Link></li>
                    </>
                    )}
            </ul>
            </div>
        </nav>
    )
}