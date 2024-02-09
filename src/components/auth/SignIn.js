import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { getUserByEmail } from "../../services/userService";

export const SignIn = ({onLogin}) => {
	const [email, setEmail] = useState("jamesdavidwest@actor.com"); 
	// eslint-disable-next-line no-unused-vars
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		if (!email) {
			setErrorMessage("Please Enter Your Email Address");
			return;
		}

		getUserByEmail(email)
			.then((foundUsers) => {
				if (foundUsers.length === 1) {
					const user = foundUsers[0];
					localStorage.setItem(
						"talenthub_user",
						JSON.stringify({
							id: user.id,
							type: user.type,
						})
					);

					const previousLocation =
						localStorage.getItem("previousLocation");
					navigate(previousLocation || "/dashboard");
					onLogin(user);
				} else {
					setErrorMessage("Invalid Login Credentials");
				}
			})
			.catch((error) => {
				console.error("Login failed:", error);
				setErrorMessage(
					"An error occured during login. Please try again later."
				);
			});
	};

	return (
		<main className="container-login">
			<section>
				<form className="form-login" onSubmit={handleLogin}>
					<h1>TalentHub Connect</h1>
					<h2>Please sign in</h2>
					<fieldset>
						<div className="form-group">
							<input
								type="email"
								value={email}
								onChange={(evt) => setEmail(evt.target.value)}
								className="form-control"
								placeholder="Email address"
								required
								autoFocus
							/>
						</div>
					</fieldset>
					<fieldset>
						<div className="form-group">
							<button
								className="login-btn btn-info"
								type="submit"
							>
								Sign in
							</button>
						</div>
					</fieldset>
				</form>
			</section>
			<section>
				<Link to="/createaccount">Not a member yet?</Link>
			</section>
		</main>
	);
};
