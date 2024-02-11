import { useState } from "react";
import "./EditUserProfile.css";
import { useLocation } from "react-router-dom";

 export const EditUserProfile = ({ onSave, onCancel }) => {
    const location = useLocation()
    const userData = location.state ? location.state.user : null
 

	const [formData, setFormData] = useState({
		fullName: userData.fullName || "",
		bio: userData.bio || "",
		primaryFocus: userData.primary_focus || "",
		market: userData.market_id || "",
		state: userData.state_id || "",
		unionStatus: userData.union_status || "",
		gender: userData.gender || "",
	});

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({ ...formData, [name]: type === "checkbox" ? checked: value });
	};

	const handleSave = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	const handleCancel = (e) => {
		e.preventDefault();
		if (window.confirm("Are you sure you want to cancel?")) {
			onCancel();
		}
	};

	return (
		<div className="edit-user-profile">
			<h2>Edit User Profile</h2>
			<form onSubmit={handleSave}>
				<div className="form-group">
					<label htmlFor="FullName">Full Name:</label>
					<input
						type="text"
						id="fullName"
						name="fullName"
						value={formData.fullName}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="bio">Bio:</label>
					<textarea
						id="bio"
						name="bio"
						value={formData.bio}
						onChange={handleInputChange}
					></textarea>
				</div>
				<div className="form-group">
					<label htmlFor="primaryFocus">Primary Focus:</label>
					<div>
						<label>
							<input
								type="checkbox"
								name="primaryFocus"
								value={
									formData.primaryFocus === "Performance Arts"
								}
								onChange={handleInputChange}
							/>
							Performance Arts
						</label>
						<label>
							<input
								type="checkbox"
								name="primaryFocus"
								value={
									formData.primaryFocus ===
									"Media & Advertising"
								}
								onChange={handleInputChange}
							/>
							Media & Advertising
						</label>
					</div>
				</div>
                <div className="form-group">
                    <label htmlFor="market">Market:</label>
                    <select
                        id="market"
                        name="market"
                        value={formData.market}
                        onChange={handleInputChange}
                    >
                        <option value="1">Southeast</option>
                        {/* Add other market options here */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input 
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="unionStatus">Union Status:</label>
                    <input 
                        type="text"
                        id="unionStatus"
                        name="unionStatus"
                        value={formData.unionStatus}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <div className="gender-options">
                        <label>
                            <input 
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleInputChange}
                            /> Male
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleInputChange}
                            /> Female
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="gender"
                                value="Non-Binary"
                                checked={formData.gender === "Non-Binary"}
                                onChange={handleInputChange}
                            /> Non-Binary
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
			</form>
		</div>
	);
};
