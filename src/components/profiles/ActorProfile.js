import "./ActorProfile.css";

export const ActorProfile = ({ user }) => {
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
					<strong>Gender:</strong> {user.gender}
				</div>
			</div>
		</div>
	);
};
