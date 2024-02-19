import { Link, useParams } from "react-router-dom";
import { ActorProfile } from "./ActorProfile";
import { AgentProfile } from "./AgentProfile";
import { getUserById } from "../../services/userService.js";
import { useEffect, useState } from "react";
import { Authorized } from "../../views/Authorized.js";

// import { getAllGenders } from "../../services/genderService";

// Make sure to pass the database prop to UserProfile component
// <UserProfile user={user} database={database}

export const UserProfile = () => {
	const { userId } = useParams();

	const [user, setUser] = useState(null);
	// const [gender, setGender] = useState(null)

	useEffect(() => {
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

		fetchUserData(userId);
	}, [userId]);

	const isCurrentUserProfile = () => {
		return user?.id === parseInt(userId);
	};

	return (
		<div className="user-profile">
			{user ? (
				<Authorized>
					<div>
						{user.type_id === 1 ? (
							<ActorProfile user={user} />
						) : user.type_id === 2 ? (
							<AgentProfile user={user} />
						) : (
							<p>No profile type found for user.</p>
						)}
						{isCurrentUserProfile() && <Link to={`/editprofile/${userId}`}>Edit Profile</Link>}
					</div>
				</Authorized>
			) : null}
		</div>
	);
};
