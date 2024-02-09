import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Search } from "./components/search/Search.js";
import { NavBar } from "./components/nav/NavBar.js";
import { LandingPage } from "./components/landingpage/LandingPage.js";
import { Dashboard } from "./views/Dashboard.js";
import { SignIn } from "./components/auth/SignIn.js";
import { SignOut } from "./components/auth/SignOut.js";
import { CreateAccount } from "./components/auth/CreateAccount.js";

export const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userType, setUserType] = useState("");
	const navigate = useNavigate();

	// useEffect(() => {
	// 	const loggedInStatus = localStorage.getItem("isLoggedIn");
	// 	if (loggedInStatus !== null) {
	// 		setIsLoggedIn(JSON.parse(loggedInStatus))
	// 	}
	// }, [])

	const handleLogin = (userType) => {
		setIsLoggedIn(true);
		setUserType(userType.type);
		navigate("/dashboard");
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setUserType("");
		localStorage.setItem("isLoggedIn", JSON.stringify(false))
	};

	return (
		<div>
			<NavBar
				isLoggedIn={isLoggedIn}
				onLogout={handleLogout}
				userType={userType}
			/>

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/search" element={<Search />} />
				<Route
					path="/signin"
					element={<SignIn onLogin={handleLogin} />}
				/>
				<Route path="/createaccount" element={<CreateAccount setIsLoggedIn={setIsLoggedIn} />} />
				<Route path="/" element={<SignOut />} />
			</Routes>
		</div>
	);
};
