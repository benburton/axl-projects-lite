import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Range } from './range';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const projects = [
      {
        id: 1,
        header: 'Funding Strategic Growth in the Restaurant Sector',
        checkSize: {minimum: 0, maximum: 20},
        revenue: {minimum: 200000, maximum: 3000000},
        ebitda: {minimum: 100, maximum: 2000}
      },
      {
        id: 2,
        header: 'Geritrex Corp',
        checkSize: {minimum: 0, maximum: 3000}
      },
      {
        id: 3,
        header: 'DME Express'
      }
    ];
    return {
      projects
    };
  }

}
