import "./AgentProfile.css";
import { useEffect, useState } from "react";

export const AgentProfile = ({ user, database }) => {
	const [market, setMarket] = useState(null);

	useEffect(() => {
		const foundMarket = database.markets.find(
			(market) => market.id === user.market_id
		);
		setMarket(foundMarket);
	}, [user.market_id, database.markets]);

	return (
		<div className="agent-profile">
			<h2>Agent Profile</h2>
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
			<div>
				<strong>Market:</strong> {market ? market.name : ""}
			</div>
		</div>
	);
};
