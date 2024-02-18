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
			console.error("Error creating user", error);
			throw error;
		});
};

export const getAllUsers = async () => {
	try {
		const res = await fetch("http://localhost:8088/users")
		if (!res.ok) {
			throw new Error("getAllUsers failed to fetch all users:")
		}
		const users = await res.json()

		const agents = users.filter(user => user.type_id === 2)
		const actors = users.filter(user => user.type_id === 1)
		
		const seekingType = users.filter(user => user.seeking_type_id)
		
		return { agents, seekingType, actors }
	} catch (error) {
		console.error("userService error fetching users", error)
		throw error
	}
};

export const getAllUsersSeeking = (seekingType) => {
	return fetch(`http://localhost:8088/users?seeking=${seekingType}`)
		.then((res) => res.json())
		.catch((error) => {
			console.error("Error fetching users seeking:", error);
			throw error;
		});
};

export const getUserByEmail = (email) => {
	return fetch(`http://localhost:8088/users?email=${email}`)
		.then((res) => res.json())
		.catch((error) => {
			console.error("Error fetching user by email:", error);
			throw error;
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
			console.error("Error fetching user gender:", error);
			throw error;
		});
};

export const updateUserById = (userId, formData) => {
	return fetch(`http://localhost:8088/users/${userId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
	
		.then((res) => res.json())
		.catch((error) => {
			console.error("From userService: Error updating profile", error);
			throw error;
		});
};
