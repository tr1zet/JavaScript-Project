import { getUserName } from '../core/storage.js';
import { debounce } from '../core/debounce.js';
import { fetchCountries } from '../api/countriesApi.js';
import { renderWelcome } from '../ui/renderWelcome.js';
import { renderDashboard } from '../ui/renderDashboard.js';
import { renderCountries } from '../ui/renderCountries.js';
import { renderStats } from '../ui/renderStats.js';

export async function initApp() {
  const app = document.getElementById('app');
  const userName = getUserName();

  if (!userName) {
    renderWelcome(app, initApp);
    return;
  }

  renderDashboard(app, userName);

  let allCountries = await fetchCountries();
  let filteredCountries = [...allCountries];

  const updateUI = () => {
    renderCountries(filteredCountries);
    renderStats(filteredCountries);
  };

  const applyFilters = () => {
    const searchValue = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const regionValue = document.getElementById('regionFilter')?.value || 'all';
    const languageValue = document.getElementById('languageFilter')?.value.toLowerCase() || '';
    const sortValue = document.getElementById('sortSelect')?.value || 'name';

    filteredCountries = allCountries.filter(country => {
      // Поиск 
      if (searchValue) {
        const matchRussian = country.russianName?.toLowerCase().includes(searchValue) || false;
        const matchEnglish = country.englishName?.toLowerCase().includes(searchValue) || false;
        if (!matchRussian && !matchEnglish) return false;
      }

      // Фильтр по региону 
      if (regionValue !== 'all') {
        const regionMap = {
          'Europe': 'Европа',
          'Asia': 'Азия',
          'Africa': 'Африка',
          'Americas': 'Америка',
          'Oceania': 'Океания',
          'Antarctic': 'Антарктида'
        };
        if (country.region !== regionMap[regionValue]) return false;
      }

      // Фильтр по языку
      if (languageValue) {
        const hasLanguage = country.languages.some(lang => 
          lang.toLowerCase().includes(languageValue)
        );
        if (!hasLanguage) return false;
      }

      return true;
    });

    // Сортировка
    filteredCountries.sort((a, b) => {
      if (sortValue === 'name') {
        const nameA = a.russianName || a.name;
        const nameB = b.russianName || b.name;
        return nameA.localeCompare(nameB, 'ru');
      } else if (sortValue === 'population') {
        return b.population - a.population;
      } else if (sortValue === 'area') {
        return b.area - a.area;
      }
      return 0;
    });

    updateUI();
  };

  // Обработчики событий после загрузки DOM
  setTimeout(() => {
    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');
    const languageFilter = document.getElementById('languageFilter');
    const sortSelect = document.getElementById('sortSelect');

    if (searchInput) {
      searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
    if (regionFilter) {
      regionFilter.addEventListener('change', applyFilters);
    }
    if (languageFilter) {
      languageFilter.addEventListener('input', debounce(applyFilters, 300));
    }
    if (sortSelect) {
      sortSelect.addEventListener('change', applyFilters);
    }
  }, 0);

  applyFilters();
}