import { useEffect, useState } from "react";
import "./ActorProfile.css";
import {getGenderById} from "../../services/genderService";

export const ActorProfile = ({ user }) => {
	const [gender, setGender] = useState(null)

	useEffect(() => {
		if (user && user.gender_id) {
			getGenderById(user.gender_id)
				.then((genderData) => {
					setGender(genderData.name)
				})
				.catch((error) => {
					console.error("Error fetching gender data:", error)
				})
		}
	}, [user])

	return (
		<div className="actor-profile">
			{user.headshot_url && (
				<img
					className="headshot-image"
					src={user.headshot_url}
					alt="Main Headshot"
				/>
			)}

			<div className="actor-profile-details">
				<h2 className="">{user.fullName}</h2>
				<div>
					<strong>Bio:</strong> {user.bio}
				</div>
				<div>
					<strong>Seeking:</strong> {user.seeking}
				</div>
				<div>
					<strong>Primary Focus:</strong> {user.primary_focus}
				</div>
				<div>
					<strong>Union Status:</strong> {user.union_status}
				</div>
				<div>
					<strong>Gender:</strong> {gender || "Unkonwn"}
				</div>
			</div>
		</div>
	);
};
