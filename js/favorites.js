const favoritePage = (() => {
  let favorites = JSON.parse(localStorage.getItem("favorites"));
  var favoriteList = document.getElementById("favorite-list");
  const toastContainer = document.getElementById("toast");

  //rendering each item as a card of hero details
  var renderItem = (data) => {
    var heroCard = document.createElement("div");
    heroCard.setAttribute("id", data.id);
    heroCard.classList.add(
      "hero-card",
      "animate__animated",
      "animate__fadeInRight",
      "mx-auto"
    );
    // set hero card bg as hero's image
    heroCard.style.backgroundImage = `url(${data.image.url})`;

    heroCard.innerHTML = `<div class="black-layer text-center"><div style="cursor: pointer;" class="text-right"><i class="fas fa-heart mr-3 mt-3"></i></div> <span class="h3 hero-card-name">${data.name}</span> </div>`;
    favoriteList.appendChild(heroCard);
  };

  var renderFavoriteList = () => {
    //checking if items exist in favorites array or not
    if (favorites === null || favorites.length === 0) {
      favoriteList.innerHTML = `<span class="display-4 mt-15 animate__animated animate__fadeInRight">No items added to favorites, go back to home and add <b class="text-primary text-underline">Superheroes</b> as your favorites!</span>`;
    }
    // render each item in the favorites array
    else {
      favoriteList.innerHTML = "";
      favorites.forEach((item) => {
        fetch(`https://superheroapi.com/api.php/1639618796205537/${item}`)
          .then((response) => response.json())
          .then((data) => renderItem(data))
          .catch((err) => console.log(err));
      });
    }
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

  //handle click events on cards
  var handleClickEvents = (e) => {
    // if favorite button is clicked remove it from array
    if (e.target.classList.contains("fas")) {
      var i = favorites.indexOf(e.target.parentNode.parentNode.id);
      favorites.splice(i, 1);

      e.target.parentNode.parentNode.parentNode.remove();
      showNotification("error", "Removed From Favorites");
    }
    // if card is clicked open superhero page
    else if (e.target.classList.contains("black-layer")) {
      window.open("superhero.html?id=" + e.target.parentNode.id, "_self");
    } else if (e.target.classList.contains("hero-card-name")) {
      window.open(
        "superhero.html?id=" + e.target.parentNode.parentNode.id,
        "_self"
      );
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    if (favorites.length === 0) {
      renderFavoriteList();
    }
  };

  var init = () => {
    renderFavoriteList();
    document.addEventListener("click", handleClickEvents);
  };

  return {
    init,
  };
})();
