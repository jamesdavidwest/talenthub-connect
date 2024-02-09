import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"

export const SignOut = () => {
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.removeItem("talenthub_user");
		navigate("/signin");
	}, [navigate]);

	return null;
};
