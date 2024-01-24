let nameH1;
let climate;
let diameter;
let terrain;
let population;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  climate = document.querySelector('span#climate');
  diameter = document.querySelector('span#diameter');
  terrain = document.querySelector('span#terrain');
  population = document.querySelector('span#population');
  charactersUl = document.querySelector('#characters>ul');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;

  if (localStorage.getItem("planets")) {
    planets = JSON.parse(localStorage.getItem("planets"));

    console.log("Fetched planets from local storage");
  } else {
    try {
      planets = await fetchPlanets()

      localStorage.setItem("planets", JSON.stringify(planets));
    }
    catch (ex) {
      console.error(`Error fetching planets from API`, ex.message);
    }

    console.log("Fetched planets from API")
  }

  planet = planets.filter(planet => planet.id == id)[0];

  try {
    planet.characters = await fetchCharacters(planet)
    planet.films = await fetchFilms(planet)
  } catch(ex) {
    console.error(ex);
  }
  
  renderPlanet(planet);
}
async function fetchPlanets() {
  let planetUrl = `${baseUrl}/planets/`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  climate.textContent = planet?.climate;
  diameter.textContent = planet?.diameter;
  terrain.textContent = planet?.terrain;
  population.textContent = planet?.population;
  const characterList = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = characterList.join("");
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
}