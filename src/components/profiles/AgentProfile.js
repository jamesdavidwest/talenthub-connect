import "./AgentProfile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, getAllUsers } from "../../services/userService";
import { getGenderById } from "../../services/genderService";

export const AgentProfile = ({ user }) => {
	const { userId } = useParams();
	// const [market, setMarket] = useState(null);
	const [agent, setAgent] = useState({});
	const [actor, setActor] = useState([]);
	const [gender, setGender] = useState({});

	// useEffect(() => {
	// 	if (user) {
	// 		const foundMarket = markets.find((market) => market.id === user.market_id);

	// 		setMarket(foundMarket);
	// 	}
	// }, [user]);

	useEffect(() => {
		getUserById(userId).then((user) => setAgent(user));
	}, [userId]);

	useEffect(() => {
		// if (Object.keys(agent).length > 0) {
		// 	getGenderById(agent.gender_id)
		// 		.then((genderData) => setGender(genderData))
		// 		.catch((error) => {
		// 			console.error("Error fetching gender data:", error);
		// 		});

		// 	getAllUsers()
		// 		.then((users) => {
		// 			const actors = users.actors.filter((actor) => agent.current_actor_user_id.includes(actor.id));

		// 			setActors(actors);
		// 		})
		getUserById(userId)
		.then((user) => {
			setAgent(user)

			getAllUsers().then((users) => {
				const actor = users.actors.find((actor) => actor.id === user.current_actor_user_id)
				setActor(actor)
			})

			getGenderById(user.gender_id)
			.then((genderData) => setGender(genderData))
			.catch((error) => {
				console.error("Error fetching gender data:", error)
			})
		
				.catch((error) => {
					console.error("Error fetching actors data:", error);
				});
		})
	}, [userId]);

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
					<strong>Gender:</strong> {gender.name}
				</div>

				<div>
					<strong>Current Roster:</strong> {actor.fullName}
				</div>

				{/* <div>
					<strong>Market:</strong> {market ? market.name : ""}
				</div> */}
			</div>
		</div>
	);
};
