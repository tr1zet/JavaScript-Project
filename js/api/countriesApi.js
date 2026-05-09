import Country from '../models/Country.js';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,area,region,languages';

export async function fetchCountries() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }

    const data = await response.json();

    return data.map(country => new Country(country));
  } catch (error) {
    console.error(error);
    throw error;
  }
}