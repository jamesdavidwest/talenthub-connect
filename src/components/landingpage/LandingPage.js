import { Link } from "react-router-dom";
import logo from "../images/pullingcurtain.png";
import "./LandingPage.css";

export const LandingPage = () => {
	 const handleSignInClick = () => {
		<Link to="/login"></Link>
	 }

	return (
		<div>
			<div className="landingpage-container">
				<div className="title-statement">
					<h1 className="welcome">
						Welcome to
						<br />
						TalentHub
						<br />
						Connect!
						<br />
					</h1>

					<div className="mission-statement">
						We aim to empower local creatives in discovering their
						perfect match of representation, simplifying the complex
						landscape of talent representation and providing a
						streamlined path to success in the entertainment
						industry.
					</div>

					<div className="sign-in-sign-up-btn">
						<div className="sign-in-btn">
							
								<button onClick={handleSignInClick}>Sign In</button>
						
						</div>
						<div className="sign-up-btn">
							<Link to="/register">
								<button>Create Account</button>
							</Link>
						</div>
					</div>
				</div>

				<img src={logo} alt="TalentHub Logo" className="logo" />
			</div>
		</div>
	);
};
