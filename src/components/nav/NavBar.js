import { Link } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";

export const NavBar = ({ isLoggedIn, onLogout, userId }) => {
	const [fullName, setFullName] = useState("");

	useEffect(() => {
		if (isLoggedIn) {
			getUserFullName(userId);
		}
	}, [isLoggedIn, userId]);

	const getUserFullName = (userId) => {
		getUserById(userId)
			.then((user) => {
				if (user) {
					setFullName(user.fullName);
				}
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	};
	const renderAuthLinks = () => {
		return (
			<>
				<li className="navbar-links">
					<Link to={`/userprofile/${userId}`}>{fullName && <span>{fullName}'s </span>}Profile</Link>
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
