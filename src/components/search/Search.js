import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService.js";
import "./Search.css";

export const Search = () => {

	const [searchResult, setSearchResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		getAllUsers("").then((allUsersArray) => {
			// const filteredUsers = allUsersArray.filter(user => user.seeking !== "")
			const seekingUsers = searchResult.filter(user => user.seeking !== "")
			setSearchResult(seekingUsers);
		})
	}, [searchResult]);

	const handleSearch = () => {
		const searchInput = searchQuery.toLowerCase();
		const filteredUsers = searchResult.filter(
			(user) =>
				user.fullName.toLowerCase().includes(searchInput) ||
				user.market_id.toLowerCase().includes(searchInput) ||
				user.state_id.toLowerCase().includes(searchInput) ||
				user.type_id.toLowerCase().includes(searchInput) ||
				user.primary_focus.toLowerCase().includes(searchInput) ||
				user.union_status.toLowerCase().includes(searchInput) ||
				user.seeking_type_id === parseInt(searchInput) ||
				user.gender.toLowerCase().includes(searchInput)
		);

		setSearchResult(filteredUsers);
	};

	return (
		<div className="search-container">
			<div className="search-boxes">
				<h2>Your Search</h2>
				<input type="text" placeholder="Search by name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
				<button type="button" className="search-button" onClick={handleSearch}>
					Search
				</button>
			</div>

			<div className="user-cards">
				<h2 className="currently-seeking">Currently Seeking...</h2>

				{searchResult.map((userCard) => (
					<section key={userCard.id} className="user-card">
						<div className="user-thumbnail">
							<h3 className="user-card-name">{userCard.fullName}</h3>

							<img className="search-headshot" src={userCard.headshot_url} alt={`Headshot of ${userCard.name}`} />
						</div>
						<div>
							<div>
								<div className="user-card-info">{userCard.seeking_type_id === 1 ? "Seeking Talent" : userCard.seeking_type_id === 2 ? "Seeking Agent" : "Not Currently Seeking"}</div>
							</div>
							<ul className="user-card-details">
								<li>Primary Focus: {userCard.primary_focus}</li>
								<li>Market: {userCard.market?.name}</li>
								<li>Union Status: {userCard.union_status}</li>
								<li>Manager: {userCard.manager}</li>
								<li>Agent(s): {userCard.agents}</li>
								<li>Gender: {userCard.gender}</li>
							</ul>
						</div>
					</section>
				))}
			</div>
		</div>
	);
};
