let nameH1;
let episodeIdH2;
let openingCrawlP;
let releaseDateSpan;
let directorSpan;
let producerSpan;
let charactersUl;
let planetsUl;
const baseUrl = "https://swapi2.azurewebsites.net/api/films";


addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  episodeIdH2 = document.querySelector('h2#episode_id');
  openingCrawlP = document.querySelector('p#opening_crawl');
  releaseDateSpan = document.querySelector('span#release_date');
  directorSpan = document.querySelector('span#director');
  producerSpan = document.querySelector('span#producer');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');

  getFilm(id);
});

async function getFilm(id) {
  let films;

  if (localStorage.getItem("films")) {
    films = JSON.parse(localStorage.getItem("films"));

    console.log("Fetched films from local storage");
  } else {
    try {
      films = await fetchFilms()

      localStorage.setItem("films", JSON.stringify(films));
    }
    catch (ex) {
      console.error(`Error fetching films from API`, ex.message);
    }

    console.log("Fetched films from API");
  }

  let film = films.filter(film => film.id == id)[0];

  try {
    film.characters = await fetchCharacters(film);
    film.planets = await fetchPlanets(film);
  } catch(ex) {
    console.error(ex);
  }
  
  renderFilm(film);
}

function renderFilm(film) {
  document.title = film.title;
  nameH1.innerHTML = film.title;
  episodeIdH2.innerHTML = `Episode ${film.episode_id}`;
  openingCrawlP.innerHTML = film.opening_crawl;
  releaseDateSpan.innerHTML = film.release_date
  directorSpan.innerHTML = film.director;
  producerSpan.innerHTML = film.producer;

  let planets = film.planets;
  planets = planets.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`);
  planetsUl.innerHTML = planets.join('');

  let characters = film.characters;
  characters = characters.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`);
  charactersUl.innerHTML = characters.join('');
}

async function fetchFilms() {
    let filmUrl = `${baseUrl}/`;
    return await fetch(filmUrl)
      .then(res => res.json());
}

async function fetchCharacters(film) {
    let charactersUrl = `${baseUrl}/${film?.id}/characters`;
    
    const characters = await fetch(charactersUrl)
    .then(res => res.json());
    return characters;
}

async function fetchPlanets(film) {
    let planetsUrl = `${baseUrl}/${film?.id}/planets`;
    return await fetch(planetsUrl)
      .then(res => res.json());
}