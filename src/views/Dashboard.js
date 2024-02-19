import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserByEmail } from "../services/userService";

export const Dashboard = () => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const userEmail = localStorage.getItem("loggedInUserEmail");
		console.log("fetching user data for email:", userEmail);

		if (userEmail) {
			getUserByEmail(userEmail)
				.then((users) => {
					if (users.length > 0) {
						setLoggedInUser(users[0]);
					}

					setIsLoading(false);

					console.log("dashboard userData:", users[0]);
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
					setIsLoading(false);
				});
		}
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h2>Welcome to Your Dashboard!</h2>
			<div className="dashboard-links">
				<ul>
					<li>
						<Link to={`/userprofile/${loggedInUser.id}`}>View Profile</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link
							to={{
								pathname: `/editprofile/${loggedInUser.id}`,
								state: { user: loggedInUser },
							}}
						>
							Edit Profile
						</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to={`/messages`}>Messages</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to="/search">Search</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};
