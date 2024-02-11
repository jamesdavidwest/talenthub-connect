import { useEffect, useState } from "react";
import { getAllUsersWithMarkets } from "../../services/userService.js";
import "./Search.css";

export const Search = () => {
	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
		getAllUsersWithMarkets().then((usersArray) => {
			setAllUsers(usersArray);
		});
	}, []);

	return (
		<div className="search-container">
			<div className="search-boxes">
				<h2>Your Search</h2>
				<input type="text" placeholder="Search by name" />
				<select>
					<option value="">Choose Market Region</option>
				</select>
				<select>
					<option value="">Choose State</option>
				</select>
				<select>
					<option value="">Choose Type</option>
				</select>
				<select>
					<option value="">Primary Focus</option>
				</select>
				<select>
					<option value="">Union Status</option>
				</select>
				<select>
					<option value="">Actively Seeking?</option>
				</select>
				<select>
					<option value="">Gender</option>
				</select>
        <button type="button" className="search-button">Search</button>
			</div>
			<div className="user-cards">
				<h2 className="currently-seeking">Currently Seeking...</h2>

				{allUsers.map((userCard) => {
					return (
						<section key={userCard.id} className="user-card">
							<div className="user-thumbnail">
								<h3 className="user-card-name">{userCard.fullName}</h3>

								<img
									className="search-headshot"
									src={userCard.headshot_url}
									alt={`Headshot of ${userCard.name}`}
								/>
							</div>
							<div>
								<div>
									<div className="user-card-info">
										{userCard.seeking === "Actor"
											? "Seeking Talent"
											: userCard.seeking === "Agent"
											? "Seeking Agent"
											: "Not Currently Seeking"}
									</div>
								</div>
								<ul className="user-card-details">
									<li>
										Primary Focus: {userCard.primary_focus}
									</li>
									<li>Market: {userCard.market?.name}</li>
									<li>
										Union Status: {userCard.union_status}
									</li>
									<li>Manager: {userCard.manager}</li>
									<li>Agent(s): {userCard.agents}</li>
									<li>Gender: {userCard.gender}</li>
								</ul>
							</div>
						</section>
					);
				})}
			</div>
		</div>
	);
};
