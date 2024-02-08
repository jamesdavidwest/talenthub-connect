import { Navigate, useLocation } from "react-router-dom";

export const Authorized = ({ children }) => {
	let location = useLocation();

	if (localStorage.getItem("talenthub_user")) {
		return children;
	} else {
		return <Navigate to={`/signin`} state={{ from: location }} replace />;
	}
};

//The only two pages that an Unauthorized User can see is the LandingPage and the initial Search Screen.  Meaning, when "Seeking" users are showcased in the "Trending" User Cards, Unauthorized Users can see them
