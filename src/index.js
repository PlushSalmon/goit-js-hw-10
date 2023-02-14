// -----IMPORT-----
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// -----CONSTS&LINKS-----
const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

// -----FUNCTIONS-----
function cleanMarkup(ref) {
    ref.innerHTML = ''
}

function inputHandler(e) {
    const textInput = e.target.value.trim();
    if (!textInput) {
        cleanMarkup(listEl);
        cleanMarkup(infoEl);
        return;
    }
    fetchCountries(textInput).then(data => {
        console.log(data);
        if (data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name', { fontSize: '15px', },);
            return;
        }
        renderMarkup(data);
    })
        .catch(error => {
            cleanMarkup(listEl);
            cleanMarkup(infoEl);
            Notiflix.Notify.failure('Oops, there is no country with that name', { fontSize: '15px', },);
        });
}

function renderMarkup(data) {
    if (data.length === 1) {
        cleanMarkup(listEl);
        const markupInfo = createInfoMarkup(data);
        infoEl.innerHTML = markupInfo;
    } else {
        cleanMarkup(infoEl);
        const markupList = createListMarkup(data);
        listEl.innerHTML = markupList;
    }
};

function createListMarkup(data) {
    return data
        .map(
            ({ name, flags }) =>
                `<li><img src="${flags.png}" alt="${name.official}" width="60" height="40">${name.official}</li>`,
        )
        .join('');
}

function createInfoMarkup(data) {
    return data.map(
        ({ name, capital, population, flags, languages }) =>
            `<h1><img src="${flags.png}" alt="${name.official}" width="60" height="40">${name.official
            }</h1>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages)}</p>`,
    );
};
// -----EVENTS-----

inputEl.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));