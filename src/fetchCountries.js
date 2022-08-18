import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
export function fetchCountries(name) {
  const searchParams = new URLSearchParams({
    fields: ['name', 'capital', 'population', 'flags', 'languages'],
  });
  Notiflix.Notify.info(`fetch:${name} `);
  return fetch(
    `https://restcountries.com/v2/name/${name}?${searchParams}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
