import { formatNumber } from '../core/utils.js';

export function renderStats(countries) {
  const stats = document.getElementById('stats');

  const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
  const avgArea = countries.length
    ? Math.round(countries.reduce((sum, c) => sum + c.area, 0) / countries.length)
    : 0;

  stats.innerHTML = `
    <div class="stats glass">
      <p><strong>Количество стран:</strong> ${countries.length}</p>
      <p><strong>Общее население:</strong> ${formatNumber(totalPopulation)}</p>
      <p><strong>Средняя площадь:</strong> ${formatNumber(avgArea)} км²</p>
    </div>
  `;
}