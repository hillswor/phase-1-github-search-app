document.addEventListener("DOMContentLoaded", function () {
	const searchForm = document.querySelector("#github-form");
	const userList = document.querySelector("#user-list");

	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();
		userList.innerHTML = "";
		fetch(
			`https://api.github.com/search/users?q=${event.target.search.value}`
		)
			.then((response) => response.json())
			.then((userData) => {
				userData.items.forEach((user) => {
					const li = document.createElement("li");
					li.textContent = user.login;
					userList.append(li);
				});
			});
		searchForm.reset();
	});
});
