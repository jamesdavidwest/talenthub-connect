export const getAllUsersWithMarkets = () => {
	return fetch(`http://localhost:8088/users`)
		.then((res) => res.json())
		.then((users) => {
			return fetch(`http://localhost:8088/markets`)
				.then((res) => res.json())
				.then((markets) => {
					users.forEach((user) => {
						const market = markets.find(
							(market) => market.id === user.market_id
						);
						user.market = market;
					});
					return users;
				});
		});
};

export const createUser = (user) => {
	return fetch("http://localhost:8088/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	}).then((res) => res.json());
};

export const getUserByEmail = (email) => {
	return fetch(`http://localhost:8088/users?email=${email}`)
		.then((res) => res.json())
		.then((users) => {
			return users;
		});
};

export const getUserById = (userId) => {
	return fetch(`http://localhost:8088/users/${userId}`)
		.then((res) => res.json())
		.then((user) => {
			return user;
		})
		.catch((error) => {
			console.error("Error fetching user data:", error);
		});
};
