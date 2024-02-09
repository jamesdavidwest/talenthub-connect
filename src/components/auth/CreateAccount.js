import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { createUser, getUserByEmail } from "../../services/userService";

export const CreateAccount = ({ setIsLoggedIn }) => {
	const [user, setUser] = useState({
		id: "",
		market_id: "",
		state_id: "",
		userType: "",
		fullName: "",
		gender: "",
		email: "",
		headshot_url: "",
		bio: "",
		primary_focus: "",
		seeking: "",
		union_status: "",
	});

	const navigate = useNavigate();

	const registerNewUser = () => {
		createUser(user).then((createdUser) => {
			if (createdUser.hasOwnProperty("id")) {
				localStorage.setItem(
					"talenthub_user",
					JSON.stringify({
						id: createdUser.id,
						type: createdUser.type,
					})
				);

				setIsLoggedIn(true);
				navigate("/dashboard");
			}
		});
	};

	const handleRegister = (e) => {
		e.preventDefault();
		getUserByEmail(user.email).then((response) => {
			if (response.length > 0) {
				// Duplicate email. No good.
				window.alert("Account with that email address already exists");
			} else {
				// Good email, create user.
				registerNewUser();
			}
		});
	};

	const updateUser = (evt) => {
		const copy = { ...user };
		if (evt.target.name === "userType") {
			copy.userType = evt.target.value;
		} else {
			copy[evt.target.id] = evt.target.value;
		}
		setUser(copy);
	};

	return (
		<main style={{ textAlign: "center" }}>
			<form className="form-login" onSubmit={handleRegister}>
				<h1>TalentHub Connect</h1>
				<h2>Create Account</h2>
				<fieldset>
					<div className="form-group">
						<input
							onChange={updateUser}
							type="text"
							id="fullName"
							className="form-control"
							placeholder="Enter your name"
							required
							autoFocus
						/>
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<input
							onChange={updateUser}
							type="email"
							id="email"
							className="form-control"
							placeholder="Email address"
							required
						/>
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<label>
							<input
								onChange={updateUser}
								type="radio"
								name="userType"
								value="Actor"
							/>
							Actor{" "}
						</label>
						<label>
							<input
								onChange={updateUser}
								type="radio"
								name="userType"
								value="Agent"
							/>
							Agent{" "}
						</label>
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<button className="login-btn btn-info" type="submit">
							Create Account
						</button>
					</div>
				</fieldset>
			</form>
		</main>
	);
};
