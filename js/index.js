document.addEventListener("DOMContentLoaded", function () {
	const searchForm = document.querySelector("#github-form");
	const cardContainer = document.querySelector("#card-container");
	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();
		cardContainer.innerHTML = "";
		fetch(
			`https://api.github.com/search/users?q=${event.target.search.value}`
		)
			.then((response) => response.json())
			.then((userData) => {
				userData.items.forEach((user) => {
					createCard(user);
				});
			});
		searchForm.reset();
	});

	function createCard(user) {
		const card = document.createElement("div");
		card.setAttribute("class", "card");
		const cardBorder = document.createElement("div");
		cardBorder.setAttribute("class", "card-border");
		const cardImg = document.createElement("img");
		cardImg.setAttribute("src", user.avatar_url);
		cardImg.setAttribute("class", "card-img");
		const h3 = document.createElement("h3");
		h3.setAttribute("class", "card-name");
		h3.textContent = user.login;
		const span = document.createElement("span");
		span.setAttribute("class", "view-repositories");
		span.textContent = "View Repositories";
		span.addEventListener("click", () => {
			console.log("CLICKED");
			createList(user, card);
		});
		card.appendChild(cardBorder);
		cardBorder.appendChild(cardImg);
		cardBorder.appendChild(h3);
		cardBorder.appendChild(span);
		cardContainer.appendChild(card);
	}

	function createList(user, card) {
		fetch(`https://api.github.com/users/${user.login}/repos`)
			.then((response) => response.json())
			.then((repositories) => {
				const ul = document.createElement("ul");
				repositories.forEach((repo) => {
					const a = document.createElement("a");
					a.setAttribute("href", repo.html_url);
					a.setAttribute("target", "_blank");
					const li = document.createElement("li");
					li.textContent = repo.name;
					a.appendChild(li);
					ul.appendChild(a);
					card.insertAfter(ul);
				});
			});
	}
});
