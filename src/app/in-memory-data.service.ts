import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Villain } from './villain';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice', power: 'Too Nice' },
      { id: 13, name: 'Bombasto', power: 'Throws bombs' },
      { id: 14, name: 'Celeritas', power: 'Just helps' },
      { id: 15, name: 'Magneta' , power: 'Metal control'},
      { id: 16, name: 'RubberMan', power: 'Elastic' },
      { id: 17, name: 'Dynama', power: 'Like Electro' },
      { id: 18, name: 'Dr. IQ', power: 'Very smart' },
      { id: 19, name: 'Magma', power: 'Fire power' },
      { id: 20, name: 'Tornado', power: 'Control wind' }
    ];
    const villains = [
      { id: 12, name: 'Magneto'},
      { id: 13, name: 'Loki'}
    ];
    return {heroes, villains} 
  }

  

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
