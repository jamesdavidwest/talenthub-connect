import { useParams } from "react-router-dom";
import { ActorProfile } from "./ActorProfile";
import { AgentProfile } from "./AgentProfile";
import { getUserById } from "../../services/userService.js";
import { useEffect, useState } from "react";

// Make sure to pass the database prop to UserProfile component
// <UserProfile user={user} database={database}

export const UserProfile = ({ database }) => {
	const { userId } = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		getUserById(userId)
			.then((userData) => {
				setUser(userData);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	}, [userId]);

	return (
		<div className="user-profile">
			{user ? (
				user.type === "actor" ? (
					<ActorProfile user={user} database={database} />
				) : user.type === "agent" ? (
					<AgentProfile user={user} database={database} />
				) : (
					<p>No profile type found for user.</p>
				)
			) : null}
		</div>
	);
};
