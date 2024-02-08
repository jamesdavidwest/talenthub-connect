import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Search } from "./components/search/Search.js";
import { NavBar } from "./components/nav/NavBar.js";
import { LandingPage } from "./components/landingpage/LandingPage.js";
import { Dashboard } from "./views/Dashboard.js";
import { SignIn } from "./components/auth/SignIn.js";
import { CreateAccount } from "./components/auth/CreateAccount.js";



export const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<div>
			<NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

			<Routes>
				<Route
					path="/"
					element={<LandingPage onLogin={handleLogin} />}
				/>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/search" element={<Search />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/createaccount" element={<CreateAccount />} />
			</Routes>

		</div>
	);
};
