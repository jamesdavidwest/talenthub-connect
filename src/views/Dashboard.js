import { Link } from "react-router-dom";

export const Dashboard = ({ userId }) => {
	return (
		<div>
			<h2>Welcome to Your Dashboard!</h2>
			<div className="dashboard-links">
				<ul>
					<li>
						<Link to={`/userprofile/${userId}`}>View Profile</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to={`/editprofile/${userId}`}>Edit Profile</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to={`/messages/${userId}`}>Messages</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to="/search">Search</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};
