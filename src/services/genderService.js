
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