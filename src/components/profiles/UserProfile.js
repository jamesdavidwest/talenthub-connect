
import { ActorProfile } from "./ActorProfile";
import { AgentProfile } from "./AgentProfile";


// Make sure to pass the database prop to UserProfile component
// <UserProfile user={user} database={database}

export const UserProfile = ({ user, database }) => {
	return (
		<div className="user-profile">
			{user.type === "actor" ? (
				<ActorProfile user={user} database={database} />
			) : user.type === "agent" ? (
				<AgentProfile user={user} database={database} />
			) : (
                <p>No profile type found for user.</p>
            )}
		</div>
	);
};
