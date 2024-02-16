import { Link, useParams } from "react-router-dom";
import { ActorProfile } from "./ActorProfile";
import { AgentProfile } from "./AgentProfile";
import { getUserById } from "../../services/userService.js";
import { useEffect, useState } from "react";
// import { getAllGenders } from "../../services/genderService";

// Make sure to pass the database prop to UserProfile component
// <UserProfile user={user} database={database}

export const UserProfile = (database) => {
	const { userId } = useParams();
	const [user, setUser] = useState(null);
	// const [gender, setGender] = useState(null)

	useEffect(() => {
		fetchUserData(userId);
	}, [userId]);

	const fetchUserData = (userId) => {
		getUserById(userId)
			.then((userData) => {
				console.log("User Data:", userData);
				setUser(userData);
				
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	};

	return (
		<div className="user-profile">
			{user ? (
				<div>
					{user.type_id === 1 ? (
						<ActorProfile user={user} database={database} />
					) : user.type_id === 2 ? (
						<AgentProfile user={user} database={database} />
					) : (
						<p>No profile type found for user.</p>
					)}
					<Link to={`/editprofile/${userId}`} state={{ user }}>Edit Profile</Link>
				</div>
			) : null}
		</div>
	);
};
