import { formatNumber } from '../core/utils.js';

export function renderCountries(countries) {
  const container = document.getElementById('countries');

  if (!countries.length) {
    container.innerHTML = '<h2>Страны не найдены</h2>';
    return;
  }

  container.innerHTML = countries.map(country => `
    <div class="country-card glass">
      <img src="${country.flag}" alt="${country.name}" class="country-flag">
      <h3>${country.name}</h3>
      <p><strong>Столица:</strong> ${country.capital}</p>
      <p><strong>Население:</strong> ${formatNumber(country.population)}</p>
      <p><strong>Площадь:</strong> ${formatNumber(country.area)} км²</p>
      <p><strong>Регион:</strong> ${country.region}</p>
      <p><strong>Языки:</strong> ${country.languages.join(', ') || 'Нет данных'}</p>
    </div>
  `).join('');
}