import { useEffect, useState } from "react";
import { navigate, useLocation } from "react-router-dom";

export const Authorized = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	let location = useLocation();

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("talenthub_user") !== null;
		if (!isLoggedIn) {
			navigate("/signin", { state: { from: location }, replace: true });
		}
	setIsLoading(false);
	
}, [location]);

return isLoading ? null : children
}
//The only two pages that an Unauthorized User can see is the LandingPage and the initial Search Screen.  Meaning, when "Seeking" users are showcased in the "Trending" User Cards, Unauthorized Users can see them.
