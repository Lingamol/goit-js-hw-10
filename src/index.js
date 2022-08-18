import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
//
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};
const URL = 'https://restcountries.com/v2/';

const refs = {
  inputForSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('ul.country-list'),
  countryInfo: document.querySelector('div.country-info'),
};
refs.inputForSearch.addEventListener(
  'input',
  debounce(handelInput, DEBOUNCE_DELAY)
);
function handelInput(e) {
  refs.countryList.innerHTML = '';
  console.log(e.target.value.trim());
  if (e.target.value.trim() !== '') {
    fetchCountries(e.target.value.trim())
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length > 1 && data.length < 10) {
          renderCountrys(data);
          console.log;
        } else {
          renderCountry(data);
          console.log('only 1:', data);
        }
      })
      .catch(error => console.log('errorFetch', error));
  }
}
function renderCountrys(countrys) {
  const markup = countrys
    .map(({ name, capital, population, flags, languages }) => {
      return `<li>
      
               
          <h2 class="post-title"><img
                  class="flags__img"
                  srcset=""
                  src=${flags.svg}
                  alt="flags"
                  width=100
                  hight=100
                />${name}</h2>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p class="post-body">${languages.name}</p>
        </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function renderCountry(country) {
  console.log('country:', country);
  const markup = country
    .map(({ name, capital, population, flags, languages }) => {
      return `<li>
          <h2 class="-title">${name}</h2>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p class="post-body">${languages.name}</p>
        </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}
