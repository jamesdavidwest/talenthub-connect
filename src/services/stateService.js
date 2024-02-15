export const getAllStates = () => {
	return fetch(`http://localhost:8088/states`)
		.then((res) => res.json())
		.then((allStates) => {
			return allStates;
		})
		.catch((error) => {
			console.error("Error fetching all state data:", error);
		});
};
