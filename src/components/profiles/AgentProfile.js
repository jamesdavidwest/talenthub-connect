import "./AgentProfile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/userService";

export const AgentProfile = ({ user }) => {
	const { userId } = useParams();
	// const [market, setMarket] = useState(null);
	const [agent, setAgent] = useState({});

	// useEffect(() => {
	// 	if (user) {
	// 		const foundMarket = markets.find((market) => market.id === user.market_id);

	// 		setMarket(foundMarket);
	// 	}
	// }, [user]);

	useEffect(() => {
		getUserById(userId).then((user) => setAgent(user));
	}, [agent, userId]);

	return (
		<div className="agent-profile">
			{agent.headshot_url && <img className="headshot-image" src={agent.headshot_url} alt="Main Headshot" />}
			<div>
				<h2 className="user-profile-name">{agent.fullName}</h2>
				<div>
					<strong>Bio:</strong> {agent.bio}
				</div>
				<div>
					<strong>Seeking:</strong> {agent.seeking}
				</div>
				<div>
					<strong>Primary Focus:</strong> {agent.primary_focus}
				</div>
				<div>
					<strong>Union Status:</strong> {agent.union_status}
				</div>

				<div>
					<strong>Gender:</strong> {agent.gender}
				</div>
				{/* <div>
					<strong>Market:</strong> {market ? market.name : ""}
				</div> */}
			</div>
		</div>
	);
};
