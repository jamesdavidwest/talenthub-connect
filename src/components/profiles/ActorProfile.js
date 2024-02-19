import { useEffect, useState } from "react";
import "./ActorProfile.css";
import { getGenderById } from "../../services/genderService";
import { getUserById } from "../../services/userService";
import { getAllMarkets,  } from "../../services/marketService";

export const ActorProfile = ({ user }) => {
	const [gender, setGender] = useState(null);
	const [currentAgent, setCurrentAgent] = useState({});
	const [marketName, setMarketName] = useState("")

	useEffect(() => {
		if (user && user.gender_id) {
			getGenderById(user.gender_id)
				.then((genderData) => {
					setGender(genderData.name);
				})
				.catch((error) => {
					console.error("Error fetching gender data:", error);
				});
		}
	}, [user]);

	useEffect(() => {
		if (user && user.current_agent_user_id) {
			getUserById(user.current_agent_user_id)
				.then((agentData) => {
					setCurrentAgent(agentData)
				})
				.catch((error) => {
					console.error("ActorProfile error fetching agent data:", error)
				})
		}

		// 		// TODO: Adopt for multiple agents
		// 		if (agents.length > 0) {
		// 			setCurrentAgent(agents[0]);
		// 		}
		// 	});
		// }
	}, [user]);

	useEffect(() => {
		if (user && user.market_id) {
			getAllMarkets()
			.then((markets) => {
				const market = markets.find((market) => market.id === user.market_id)
			if (market) {
				setMarketName(market.name)
			} else {
				console.error("market not found for id:", user.market_id)
			}
		})
		.catch((error) => {
			console.error("Error fetching market data:", error)
		})
		}
	}, [user])

	const getSeekingStatus = () => {
		return user.seekingUserTypeId === "2" ? "Agent" : "Not Seeking At This Time";
	}

	return (
		<div className="actor-profile">
			{user.headshot_url && <img className="headshot-image" src={user.headshot_url} alt="Main Headshot" />}

			<div className="actor-profile-details">
				<h2 className="user-profile-name">{user.fullName}</h2>
				<div>
					<strong>Bio:</strong> {user.bio}
				</div>
				<div>
					<strong>Seeking:</strong> {getSeekingStatus()}
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
				<div>
					<strong>Current Agent:</strong> {currentAgent.id ? (
					<a href={`/agentprofile/${currentAgent.id}`}>{currentAgent.fullName}</a>
					) : (
						<span>No current agent</span>
					)}
				</div>
				<div>
					<strong>Market:</strong> {marketName}
				</div>
			</div>
		</div>
	);
};
