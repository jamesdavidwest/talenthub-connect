import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Search } from "./components/search/Search.js";
import { NavBar } from "./components/nav/NavBar.js";
import { LandingPage } from "./components/landingpage/LandingPage.js";
import { Dashboard } from "./views/Dashboard.js";
import { SignIn } from "./components/auth/SignIn.js";
import { SignOut } from "./components/auth/SignOut.js";
import { CreateAccount } from "./components/auth/CreateAccount.js";
import { UserProfile } from "./components/profiles/UserProfile.js";
import { getUserByEmail } from "./services/userService.js";

export const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userType, setUserType] = useState("");
	const [loggedInUser, setLoggedInUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const userEmail = localStorage.getItem("loggedInUserEmail");
		if (userEmail) {
			getUserByEmail(userEmail)
				.then((users) => {
					if (users.length > 0) {
						const userData = users[0];
						setLoggedInUser(userData);
						setIsLoggedIn(true);
						setUserType(userData.type);
					}
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
				});
		}
	}, []);

	const handleLogin = (userData) => {
		setIsLoggedIn(true);
		setUserType(userData.type);
		setLoggedInUser(userData);
		navigate("/dashboard");
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setUserType("");
		setLoggedInUser(null);
		localStorage.removeItem("loggedInUserEmail");
	};

	return (
		<div>
			<NavBar
				isLoggedIn={isLoggedIn}
				onLogout={handleLogout}
				userType={userType}
				userId={loggedInUser ? loggedInUser.id : null}
			/>

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/search" element={<Search />} />
				<Route
					path="/signin"
					element={<SignIn onLogin={handleLogin} />}
				/>
				<Route
					path="/createaccount"
					element={<CreateAccount setIsLoggedIn={setIsLoggedIn} />}
				/>
				<Route
					path="/userprofile"
					element={<UserProfile user={loggedInUser} />}
				>
					<Route
						path=":userId"
						element={<UserProfile user={loggedInUser} />}
					/>
				</Route>
				<Route path="/" element={<SignOut />} />
			</Routes>
		</div>
	);
};
