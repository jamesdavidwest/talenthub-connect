export const getMarketById = (marketId) => {
	return fetch(`http://localhost:8088/users/${marketId}`)
		.then((res) => res.json())
		.then((market) => {
			return market;
		})
		.catch((error) => {
			console.error("Error fetching market data:", error);
		});
};

export const getAllMarkets = () => {
	return fetch(`http://localhost:8088/markets`)
		.then((res) => res.json())
		.then((allMarkets) => {
			return allMarkets;
		})
		.catch((error) => {
			console.error("Error fetching all market data:", error);
		});
};
