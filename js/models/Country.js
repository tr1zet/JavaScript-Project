import { getRussianName, getRussianRegion } from '../data/russianNames.js';

export default class Country {
  constructor(data) {
    this.englishName = data.name.common;
    this.russianName = getRussianName(this.englishName);
    this.name = `${this.russianName} (${this.englishName})`; 
    this.flag = data.flags.svg;
    this.capital = data.capital?.[0] || 'Нет данных';
    this.population = data.population || 0;
    this.area = data.area || 0;
    this.region = getRussianRegion(data.region || 'Other');
    this.languages = data.languages ? Object.values(data.languages) : [];
  }
}
