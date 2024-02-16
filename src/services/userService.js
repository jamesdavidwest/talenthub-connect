export const createUser = (user) => {
	return fetch("http://localhost:8088/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
	.then((res) => res.json())
	.catch((error) => {
		console.error("Error creating user", error)
		throw error;
	})
};

export const getAllUsers = () => {
	return fetch("http://localhost:8088/users")
		.then ((res) => res.json())
		.catch((error) => {
			console.error("Error fetching all users:", error)
			throw error
		})
}

export const getAllUsersSeeking = (seekingType) => {
	return fetch(`http://localhost:8088/users?seeking=${seekingType}`)
		.then((res) => res.json())
		.catch((error) => {
			console.error("Error fetching users seeking:", error)
			throw error
		})
}

export const getUserByEmail = (email) => {
	return fetch(`http://localhost:8088/users?email=${email}`)
		.then((res) => res.json())
		.catch((error) => {
			console.error("Error fetching user by email:", error)
			throw error
		});
};

export const getUserById = (userId) => {
	return fetch(`http://localhost:8088/users/${userId}`)
		.then((res) => res.json())
		.catch((error) => {
			console.error("Error fetching user data:", error);
		});
};

export const getAllUsersByGender = (gender_id) => {
	return fetch(`http://localhost:8088/users?gender=${gender_id}`)
		.then((res) => res.json())
		.catch((error) => {
			console.error("Error fetching user gender:", error)
			throw error
		})
}