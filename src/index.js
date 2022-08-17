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
  console.log(e.target.value.trim());
  if (e.target.value.trim() !== '') {
    fetchCountries(e.target.value.trim())
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          console.log(data);
        }
      })
      .catch(error => console.log(error));
  }
}
