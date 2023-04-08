const endpoint = 'https://www.mapquestapi.com/search/v3/prediction?key=ceiWumpWrG5aqAOi4bsRb8BIkjPl3vtP&limit=5&collection=address,city&q=';


const cities = [];

// fetch grabs endpoint - at this point a promise and generates readablestream
fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));

function findMatches(keyword, cities) {
    return cities.filter(place => { // does city or state match? use paramater regex
        const regex = new RegExp(keyword, 'g');
        return place.city.match(regex) || place.state.match(regex)
    });
}

// add results to HTML li
function displayMatches() {
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(place => {

        const regex = new RegExp(this.value, 'g');
        const cityName = place.city.replace(regex, `<span class="highlight">${
            this.value
        }</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${
            this.value
        }</span>`);

        return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${
            place.population
        }</span>
      </li>
    `;
    }).join('');

    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('#search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

//
//
// OTHER METHOD - Combine the two
//
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = [
    'Apple',
    'Apricot',
    'Avocado 🥑',
    'Banana',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Blueberry',
    'Boysenberry',
    'Currant',
    'Cherry',
    'Coconut',
    'Cranberry',
    'Cucumber',
    'Custard apple',
    'Damson',
    'Date',
    'Dragonfruit',
    'Durian',
    'Elderberry',
    'Feijoa',
    'Fig',
    'Gooseberry',
    'Grape',
    'Raisin',
    'Grapefruit',
    'Guava',
    'Honeyberry',
    'Huckleberry',
    'Jabuticaba',
    'Jackfruit',
    'Jambul',
    'Juniper berry',
    'Kiwifruit',
    'Kumquat',
    'Lemon',
    'Lime',
    'Loquat',
    'Longan',
    'Lychee',
    'Mango',
    'Mangosteen',
    'Marionberry',
    'Melon',
    'Cantaloupe',
    'Honeydew',
    'Watermelon',
    'Miracle fruit',
    'Mulberry',
    'Nectarine',
    'Nance',
    'Olive',
    'Orange',
    'Clementine',
    'Mandarine',
    'Tangerine',
    'Papaya',
    'Passionfruit',
    'Peach',
    'Pear',
    'Persimmon',
    'Plantain',
    'Plum',
    'Pineapple',
    'Pomegranate',
    'Pomelo',
    'Quince',
    'Raspberry',
    'Salmonberry',
    'Rambutan',
    'Redcurrant',
    'Salak',
    'Satsuma',
    'Soursop',
    'Star fruit',
    'Strawberry',
    'Tamarillo',
    'Tamarind',
    'Yuzu'
];

function search(str) {
    let results = [];
    const val = str.toLowerCase();

    for (i = 0; i < fruit.length; i ++) {
        if (fruit[i].toLowerCase().indexOf(val) > -1) {
            results.push(fruit[i]);
        }
    }

    return results;
}

function searchHandler(e) {
    const inputVal = e.currentTarget.value;
    let results = [];
    if (inputVal.length > 0) {
        results = search(inputVal);
    }
    showSuggestions(results, inputVal);
}

function showSuggestions(results, inputVal) {

    suggestions.innerHTML = '';

    if (results.length > 0) {
        for (i = 0; i < results.length; i ++) {
            let item = results[i];
            // Highlights only the first match
            // TODO: highlight all matches
            const match = item.match(new RegExp(inputVal, 'i'));
            item = item.replace(match[0], `<strong>${
                match[0]
            }</strong>`);
            suggestions.innerHTML += `<li>${item}</li>`;
        }
        suggestions.classList.add('has-suggestions');
    } else {
        results = [];
        suggestions.innerHTML = '';
        suggestions.classList.remove('has-suggestions');
    }
}

function useSuggestion(e) {
    input.value = e.target.innerText;
    input.focus();
    suggestions.innerHTML = '';
    suggestions.classList.remove('has-suggestions');
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
