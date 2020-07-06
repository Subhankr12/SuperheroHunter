const heroPage = (() => {
  let param = new URLSearchParams(window.location.search);
  const id = param.get("id");
  let favorites = JSON.parse(localStorage.getItem("favorites"));

  // create var for all information containers
  var superheroName = document.getElementById("superhero-name");
  var superheroImage = document.getElementById("superhero-image");
  var powers = document.getElementById("powerstats");
  var biography = document.getElementById("biography");
  var appearance = document.getElementById("appearance");
  var work = document.getElementById("work");
  var connections = document.getElementById("connections");

  var renderInfo = (data) => {
    //render image and name of the superhero
    superheroImage.innerHTML = `<img src=${data.image.url} alt="not found" class="img-fluid"/>`;
    superheroName.innerHTML = `<span class="h1">${data.name}</span>`;

    // create fav button
    var favButton = document.createElement("i");
    favButton.style.cursor = "pointer";
    favButton.classList.add("ml-2", "fa-heart");

    if (favorites.includes(data.id)) {
      favButton.classList.add("fas");
    } else {
      favButton.classList.add("far");
    }

    superheroName.appendChild(favButton);
    renderAllDetails(data);
  };

  //render all details of superhero
  var renderAllDetails = (data) => {
    // render power stats
    for (const [key, value] of Object.entries(data.powerstats)) {
      let p = document.createElement("p");
      p.innerHTML = `<span>${key}</span> <span>${value}</span>`;
      powers.appendChild(p);
    }

    // render biography
    for (const [key, value] of Object.entries(data.biography)) {
      let p = document.createElement("p");
      p.innerHTML = `<span>${key}</span> <span>${value}</span>`;
      biography.appendChild(p);
    }

    // render appearance
    for (const [key, value] of Object.entries(data.appearance)) {
      let p = document.createElement("p");
      p.innerHTML = `<span>${key}</span> <span>${value}</span>`;
      appearance.appendChild(p);
    }

    // render work
    for (const [key, value] of Object.entries(data.work)) {
      let p = document.createElement("p");
      p.innerHTML = `<span>${key}</span> <span>${value}</span>`;
      work.appendChild(p);
    }

    // render connections
    for (const [key, value] of Object.entries(data.connections)) {
      let p = document.createElement("p");
      p.innerHTML = `<span>${key}</span> <span>${value}</span>`;
      connections.appendChild(p);
    }
  };

  //fetch the details of superhero to render on screen
  var fetchInfo = () => {
    fetch(`https://superheroapi.com/api.php/1639618796205537/${id}`)
      .then((response) => response.json())
      .then((data) => renderInfo(data))
      .catch((err) => console.log(err));
  };

  //handle all click events
  var handleClickEvents = (e) => {
    // check if it is already liked or not
    if (e.target.classList.contains("fas")) {
      var i = favorites.indexOf(id);
      favorites.splice(i, 1);
      e.target.classList.remove("fas");
      e.target.classList.add("far");
    } else if (e.target.classList.contains("far")) {
      favorites.push(id);
      e.target.classList.remove("far");
      e.target.classList.add("fas");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  var init = () => {
    fetchInfo();
    document.addEventListener("click", handleClickEvents);
  };

  return {
    init,
  };
})();
