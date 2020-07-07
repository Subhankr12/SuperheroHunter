const homePage = (() => {
  var searchList = document.getElementById("search-list");
  var searchItem = document.getElementById("search-box");
  const toastContainer = document.getElementById("toast");

  let favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites == null) favorites = [];

  //populate search results with matching content
  var renderSearchResults = (result) => {
    var listItem = document.createElement("li");
    listItem.classList.add(
      "d-lg-flex",
      "justify-content-between",
      "align-items-center",
      "hero-details",
      "text-center"
    );
    listItem.setAttribute("id", result.id);
    listItem.innerHTML = `<img src=${result.image.url} alt="not found" class="hero-image"/> <span class="h3 ml-lg-5">${result.name}</span>`;

    // create like button in suggestion list
    var favButton = document.createElement("button");
    favButton.classList.add("mt-2", "btn");

    if (favorites.includes(result.id)) {
      favButton.innerHTML = "Remove from Favorites";
      favButton.classList.add("btn-danger");
    } else {
      favButton.innerHTML = "Add to Favorites";
      favButton.classList.add("btn-success");
    }

    listItem.appendChild(favButton);
    searchList.appendChild(listItem);
  };

  //fetch data from api
  var handleSearchResults = (heroName) => {
    // fetch data of heroes with the name
    fetch(
      `https://superheroapi.com/api.php/1639618796205537/search/${heroName}`
    )
      .then((response) => response.json())
      .then((data) => {
        searchList.innerHTML = "";
        const results = data.results.filter((heroes) => {
          return heroes.name.toLowerCase().startsWith(heroName.toLowerCase());
        });
        results.forEach((result) => {
          //for each item render suggestion
          renderSearchResults(result);
        });
      })
      .catch((err) => console.log(err));
  };

  var showNotification = (type, message) => {
    if (type === "error") {
      toastContainer.classList.remove("toast-success");
      toastContainer.classList.add("toast-error");
    } else if (type === "success") {
      toastContainer.classList.remove("toast-error");
      toastContainer.classList.add("toast-success");
    }
    toastContainer.style.display = "block";
    toastContainer.innerText = message;

    setTimeout(() => {
      toastContainer.style.display = "none";
    }, 1000);
  };

  //handle click events on buttons
  var handleClickEvents = (e) => {
    // check if clicked item is a button
    if (e.target.tagName === "BUTTON") {
      if (e.target.classList.contains("btn-success")) {
        // push to favorites array
        favorites.push(e.target.parentNode.id);

        e.target.innerHTML = "Remove from Favorites";
        e.target.classList.remove("btn-success");
        e.target.classList.add("btn-danger");
        showNotification("success", "Successfully Added To Favorites");
      } else if (e.target.classList.contains("btn-danger")) {
        // remove from favorites array
        var index = favorites.indexOf(e.target.parentNode.id);
        favorites.splice(index, 1);

        e.target.innerHTML = "Add to Favorites";
        e.target.classList.remove("btn-danger");
        e.target.classList.add("btn-success");
        showNotification("error", "Removed From Favorites");
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    // check if clicked item is a li
    else if (e.target.tagName === "LI") {
      if (e.target.classList.contains("hero-details")) {
        console.log(e.target.id);
        window.open("superhero.html?id=" + e.target.id, "_self");
      }
    }
  };

  //initialize with handlers
  var init = () => {
    searchItem.addEventListener("keyup", () =>
      handleSearchResults(searchItem.value)
    );
    document.addEventListener("click", handleClickEvents);
  };

  return {
    init,
  };
})();
