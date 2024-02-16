import { useEffect, useState } from "react";
import "./EditUserProfile.css";
// import { useLocation } from "react-router-dom";
import { getAllMarkets } from "../../services/marketService";
import { getAllStates } from "../../services/stateService";
import { getAllGenders } from "../../services/genderService";
import { useLocation } from "react-router-dom";

export const EditUserProfile = ({ onSave, onCancel, type_id, userData }) => {
	const [genders, setGenders] = useState([]);
	const [markets, setMarkets] = useState([]);
	const [states, setStates] = useState([]);
	const [formData, setFormData] = useState({
		fullName: "",
		bio: "",
		primaryFocus: [],
		marketId: "",
		stateId: "",
		unionStatus: "",
		genderId: "",
	});

	const location = useLocation();

	useEffect(() => {
		setFormData({
			fullName: userData?.fullName || "",
			bio: userData?.bio || "",
			// TODO: Make sure this value is an array so that
			// we don't have to wrap it when setting it.
			primaryFocus: [userData?.primary_focus] || [],
			marketId: userData?.market_id || "",
			stateId: userData?.state_id || "",
			unionStatus: userData?.union_status || "",
			genderId: userData?.gender_id || "",
		});
	}, [userData]);

	useEffect(() => {
		getAllData();
	}, [location]);

	const getAllData = async () => {
		try {
			const [featchedMarkets, fetchedStates, fetchedGenders] = await Promise.all([getAllMarkets(), getAllStates(), getAllGenders()]);

			setMarkets(featchedMarkets);
			setStates(fetchedStates);
			setGenders(fetchedGenders);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleCheckboxChange = (e) => {
		const { name, value } = e.target;
		let checkboxValue = formData[name];

		if (checkboxValue.includes(value)) {
			checkboxValue = checkboxValue.filter((existingValue) => value !== existingValue);
		} else {
			checkboxValue.push(value);
		}

		setFormData({
			...formData,
			[name]: checkboxValue,
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

	return (
		<div className="edit-user-profile">
			{userData ? (
				<form onSubmit={handleSave}>
					<h2>Edit User Profile</h2>
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
									checked={formData.primaryFocus.includes("Performance Arts")}
									onChange={handleCheckboxChange}
								/>
								Performance Arts
							</label>
							<label htmlFor="mediaAndAdvertising">
								<input
									type="checkbox"
									id="mediaAndAdvertising"
									name="primaryFocus"
									value="Media & Advertising"
									checked={formData.primaryFocus.includes("Media & Advertising")}
									onChange={handleCheckboxChange}
								/>
								Media & Advertising
							</label>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="market">Market</label>
						<select id="market" name="marketId" value={formData.marketId} onChange={handleInputChange}>
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
						<select id="state" name="stateId" value={formData.stateId} onChange={handleInputChange}>
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
							{genders.map((gender) => (
								<label key={gender.id} htmlFor={gender.name.toLowerCase()}>
									<input
										type="radio"
										id={gender.name.toLowerCase()}
										name="genderId"
										value={gender.id}
										checked={parseInt(formData.genderId) === gender.id}
										onChange={handleInputChange}
									/>
									{gender.name}
								</label>
							))}
						</div>
					</div>
					<div className="form-group">
						<button type="submit">Save</button>
						<button type="button" onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<p>No user data found.</p>
			)}
		</div>
	);
};