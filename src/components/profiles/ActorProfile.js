import "./ActorProfile.css";

export const ActorProfile = ({ user }) => {
	return (
		<div className="actor-profile">
			<h2>Actor Profile</h2>
			<div>
				<strong>Name:</strong> {user.fullName}
			</div>
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
				<strong>Headshot:</strong> {user.headshot_url}
			</div>
			<div>
				<strong>Gender:</strong> {user.gender}
			</div>
		</div>
	);
};
