import { Link, useParams } from "react-router-dom";
import { ActorProfile } from "./ActorProfile";
import { AgentProfile } from "./AgentProfile";
import { getUserById } from "../../services/userService.js";
import { useEffect, useState } from "react";

// Make sure to pass the database prop to UserProfile component
// <UserProfile user={user} database={database}

export const UserProfile = ({ database }) => {
	const { userId } = useParams();
	const [user, setUser] = useState(null);

	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState(null);

	useEffect(() => {
	
		getUserById(userId)
			.then((userData) => {
				console.log("User Data:", userData);
				setUser(userData);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
				setError("Error fetching user data. Please try again later.");
			});
	}, [userId]);



	return (
		<div className="user-profile">
			{user ? (
				<div>
					{user.type === "actor" ? (
						<ActorProfile user={user} database={database} />
					) : user.type === "agent" ? (
						<AgentProfile user={user} database={database} />
					) : (
						<p>No profile type found for user.</p>
					)}
					<Link to={`/editprofile/${userId}`}>Edit Profile</Link>
				</div>
			) : null}
		</div>
	);
};
