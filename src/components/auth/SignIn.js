import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { getUserByEmail } from "../../services/userService";

export const SignIn = ({ onLogin }) => {
	const [email, setEmail] = useState("jamesdavidwest@actor.com");
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
				console.log("Found users:", foundUsers)
				if (foundUsers.length === 1) {
					const user = foundUsers[0];
					localStorage.setItem("loggedInUserEmail", email)
					localStorage.setItem(
						"talenthub_user",
						JSON.stringify({
							id: user.id,
							type_id: typeof user.type_id === 'number' ? user.type_id : parseInt(user.type_id),
						})
					);

					const previousLocation = localStorage.getItem("previousLocation");
					navigate(previousLocation || "/dashboard");
					onLogin(user);
				} else {
					setErrorMessage("Invalid Login Credentials");
				}
			})
			.catch((error) => {
				console.error("Login failed:", error);
				setErrorMessage("An error occured during login. Please try again later.");
			});
	};

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("talenthub_user");
		const isSignInPage = window.location.pathname === "/signin";

		if (isLoggedIn && !isSignInPage) {
			const previousLocation = localStorage.getItem("previousLocation");
			navigate(previousLocation || "/dashboard");
		}
	}, [navigate]);

	return (
		<main className="container-login">
			<section>
				<form className="form-login" onSubmit={handleLogin}>
					<h1>TalentHub Connect</h1>
					<h2>Please sign in</h2>
					<div className="error-message">{errorMessage}</div>
					<fieldset>
						<div className="form-group">
							<input
								type="email"
								id="email"
								value={email}
								onChange={(evt) => setEmail(evt.target.value)}
								className="form-control"
								placeholder="Email address"
								required
								autoFocus
								autoComplete="email"
							/>
						</div>
					</fieldset>
					<fieldset>
						<div className="form-group">
							<button className="login-btn btn-info" type="submit">
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
