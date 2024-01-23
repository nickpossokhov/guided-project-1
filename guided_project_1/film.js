const baseUrl = "https://swapi2.azurewebsites.net/api/films";

addEventListener('DOMContentLoaded', () => {
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