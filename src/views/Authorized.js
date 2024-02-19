import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Authorized = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [userData, setUserData] = useState(null);
	let location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("talenthub_user") !== null;

		if (!isLoggedIn) {
			navigate("/signin", { state: { from: location }, replace: true });
		} else {
			const savedUserData = JSON.parse(localStorage.getItem("talenthub_user"));

			setUserData(savedUserData);
		}

		setIsLoading(false);
	}, [navigate, location]);

	return isLoading ? null : <div>{userData ? React.cloneElement(children) : React.cloneElement(children)}</div>;
};
//The only two pages that an Unauthorized User can see is the LandingPage and the initial Search Screen.  Meaning, when "Seeking" users are showcased in the "Trending" User Cards, Unauthorized Users can see them.
