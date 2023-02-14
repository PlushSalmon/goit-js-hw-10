const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`).then(
        response => {
            if (response.status === 404) {
                return Promise.reject(new Error());
            }
            return response.json();
        },
    );
}

export { fetchCountries };

// Напиши функцию fetchCountries(name) которая делает HTTP - запрос на ресурс name и возвращает промис
//  с массивом стран - результатом запроса.Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.

// Фильтрация полей
// В ответе от бэкенда возвращаются объекты, большая часть свойств которых тебе не пригодится.Чтобы сократить объем передаваемых данных 
// добавь строку параметров запроса - так этот бэкенд реализует фильтрацию полей.Ознакомься с документацией синтаксиса фильтров.

// Тебе нужны только следующие свойства:

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков