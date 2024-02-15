import { useEffect, useState } from "react";
import "./EditUserProfile.css";
import { useLocation } from "react-router-dom";
import { getAllMarkets } from "../../services/marketService";
import { getAllStates } from "../../services/stateService";

export const EditUserProfile = ({ onSave, onCancel, type_id }) => {
	const location = useLocation();
	const userData = location.state ? location.state.user : null;
	const [markets, setMarkets] = useState([]);
	const [states, setStates] = useState([]);

	const [formData, setFormData] = useState({
		fullName: userData ? userData.fullName || "" : "",
		bio: userData ? userData.bio || "" : "",
		primaryFocus: userData ? userData.primary_focus || "" : "",
		market: userData ? userData.market_id || "" : "",
		state: userData ? userData.state_id || "" : "",
		unionStatus: userData ? userData.union_status || "" : "",
		gender: userData ? userData.gender || "" : "",
	});

	useEffect(() => {
		getAllMarkets().then((markets) => setMarkets(markets));
		getAllStates().then((states) => setStates(states));
	}, []);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			await onSave(formData);
		} catch (error) {
			console.error("Error saving user profile:", error);
		}
	};

	const handleCancel = (e) => {
		e.preventDefault();
		if (window.confirm("Are you sure you want to cancel?")) {
			onCancel();
		}
	};
	console.log("userData", userData);

	return (
		<div className="edit-user-profile">
			<h2>Edit User Profile</h2>
			<form onSubmit={handleSave}>
				<div className="form-group">
					<label htmlFor="fullName">Full Name</label>
					<input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="bio">Bio</label>
					<textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange}></textarea>
				</div>
				<div className="form-group">
					<div>Primary Focus</div>
					<div>
						<label htmlFor="performanceArts">
							<input
								type="checkbox"
								id="performanceArts"
								name="primaryFocus"
								value="Performance Arts"
								checked={formData.primaryFocus === "Performance Arts"}
								onChange={handleInputChange}
							/>
							Performance Arts
						</label>
						<label htmlFor="mediaAndAdvertising">
							<input
								type="checkbox"
								id="mediaAndAdvertising"
								name="primaryFocus"
								value="Media & Advertising"
								checked={formData.primaryFocus === "Media & Advertising"}
								onChange={handleInputChange}
							/>
							Media & Advertising
						</label>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="market">Market</label>
					<select id="market" name="market" value={formData.market} onChange={handleInputChange}>
						{markets.length > 0 &&
							markets.map((market) => (
								<option key={market.id} value={market.id}>
									{market.name}
								</option>
							))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="state">State</label>
					<select id="state" name="state" value={formData.state} onChange={handleInputChange}>
						{states.map((state) => (
							<option key={state.id} value={state.id}>
								{state.name}
							</option>
						))}
					</select>
				</div>
				{type_id === "Actor" && (
					<div className="form-group">
						<label htmlFor="unionStatus">Union Status</label>
						<select id="unionStatus" name="unionStatus" value={formData.unionStatus} onChange={handleInputChange}>
							<option value="Union">Union</option>
							<option value="Non-Union">Non-Union</option>
						</select>
					</div>
				)}
				{type_id === "Agent" && (
					<div className="form-group">
						<label htmlFor="unionStatus">Union Status</label>
						<select id="unionStatus" name="unionStatus" value={formData.unionStatus} onChange={handleInputChange}>
							<option value="Union">SAG-Franchised</option>
							<option value="Non-Union">Non-Union</option>
						</select>
					</div>
				)}
				<div className="form-group">
					<div>Gender:</div>
					<div className="gender-options">
						<label htmlFor="male">
							<input
								type="radio"
								id="male"
								name="gender"
								value="Male"
								checked={formData.gender === "Male"}
								onChange={handleInputChange}
							/>{" "}
							Male
						</label>
						<label htmlFor="female">
							<input
								type="radio"
								id="female"
								name="gender"
								value="Female"
								checked={formData.gender === "Female"}
								onChange={handleInputChange}
							/>{" "}
							Female
						</label>
						<label htmlFor="nonBinary">
							<input
								type="radio"
								id="nonBinary"
								name="gender"
								value="Non-Binary"
								checked={formData.gender === "Non-Binary"}
								onChange={handleInputChange}
							/>{" "}
							Non-Binary
						</label>
					</div>
				</div>
				<div className="form-group">
					<button type="submit">Save</button>
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};
