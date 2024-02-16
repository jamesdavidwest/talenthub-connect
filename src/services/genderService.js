
export const getAllGenders = () => {
	return fetch(`http://localhost:8088/genders`)
		.then((res) => res.json())
		.then((allGenders) => {
			return allGenders;
		})
		.catch((error) => {
			console.error("Error fetching all gender data:", error);
		});
};

export const getGenderById = (genderId) => {
	return fetch(`http://localhost:8088/genders/${genderId}`)
	.then((res) => {
		if (!res.ok) {
			throw new Error("Failed to fetch gender data")
		}
		return res.json()
	})
	.catch((error) => {
		console.error("Error fetching gender data:", error)
		throw error
	})
}