import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ isLoggedIn, onLogout, userType }) => {
	const renderAuthLinks = () => {
		return (
			<>
				<li className="navbar-links">
					<Link to="/userprofile">Profile</Link>
				</li>
				<li className="navbar-links">
					<Link to="/dashboard">Dashboard</Link>
				</li>
				<li className="navbar-links">
					<Link to="/search">Search</Link>
				</li>
				<li className="navbar-links">
					<Link to="/messages">Messages</Link>
				</li>
				<li className="navbar-links">
					<Link to="/" onClick={onLogout}>
						Sign Out
					</Link>
				</li>
			</>
		);
	};

	const renderUnauthLinks = () => {
		return (
			<>
				<li className="navbar-links">
					<Link to="/">Home</Link>
				</li>
				<li className="navbar-links">
					<Link to="/search">Search</Link>
				</li>
				<li className="navbar-links">
					<Link to="/createaccount">Create Account</Link>
				</li>
				<li className="navbar-links">
					<Link to="/signin">Sign In</Link>
				</li>
			</>
		);
	};

	return (
		<nav>
			<div className="navbar-container">
				<div className="navbar-brand">TalentHub Connect</div>
				<ul className="navbar-links">
					{isLoggedIn ? renderAuthLinks() : renderUnauthLinks()}
				</ul>
			</div>
		</nav>
	);
};
