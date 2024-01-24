let nameH1;
let episodeIdH2;
let openingCrawlP;
let releaseDateSpan;
let directorSpan;
let producerSpan;
let filmsUl;
let planetsUl;
const baseUrl = "https://swapi2.azurewebsites.net/api/films";


addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  episodeIdH2 = document.querySelector('h2#episode_id');
  openingCrawlP = document.querySelector('p#opening_crawl');
  releaseDateSpan = document.querySelector('span#release_date');
  directorSpan = document.querySelector('span#director');
  producerSpan = document.querySelector('span#producer');
  filmsUl = document.querySelector('#films>ul');
  planetsUl = document.querySelector('#planets>ul');

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');

  getFilm(id);
});

async function getFilm(id) {
  let film;

  try {
    film = await fetchFilm(id);
    film.characters = await fetchCharacters(id);
    film.planets = await fetchPlanets(id);
  } catch (ex) {
    console.error(ex);
  }

  console.log(film);
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
}

async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/${id}`;
    return await fetch(filmUrl)
      .then(res => res.json());
}

async function fetchCharacters(id) {
    let charactersUrl = `${baseUrl}/${id}/characters`;
    return await fetch(charactersUrl)
      .then(res => res.json());
}

async function fetchPlanets(id) {
    let planetsUrl = `${baseUrl}/${id}/planets`;
    return await fetch(planetsUrl)
      .then(res => res.json());
}