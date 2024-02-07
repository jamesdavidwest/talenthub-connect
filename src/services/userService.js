export const getAllUsersWithMarkets = () => {
  return fetch(`http://localhost:8088/users`).then((res) =>
    res.json()
  )
  .then((users) => {
    const userPromises = users.map((user) => {
      return fetch(`http://localhost:8088/markets/${user.market_id}`)
      .then((res) => res.json())
      .then ((market) => {
        user.market = market;
        return user;
      })
    })
    return Promise.all(userPromises);
  })
}

export const createUser = (customer) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json())
}
