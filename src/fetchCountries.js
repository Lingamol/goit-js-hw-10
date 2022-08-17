import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
export function fetchCountries(name) {
  Notiflix.Notify.info(`fetch:${name} `);
  return fetch(`https://restcountries.com/v2/name/${name}`);
  //   return fetch(` https://restcountries.com/v2/all`);
}
