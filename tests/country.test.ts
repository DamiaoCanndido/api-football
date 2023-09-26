import { Country, CountryQueries } from '../src/entities';
import { App } from '../src/main/app';
import request from 'supertest';
import { CountryUseCase } from '../src/use-cases';

const app = new App().app;

describe('Country test', () => {
  it('/POST country', async () => {
    const country: Country = {
      name: 'Chile',
      code: 'CHI',
      flag: 'chile.png',
    };
    const response = await request(app).post('/country').send(country);

    expect(response.status).toBe(201);
    expect(response.body.code).toEqual('CHI');
  });

  it('/GET country', async () => {
    const response = await request(app).get('/country?name=chile');
    expect(response.status).toBe(200);
  });
});

const countryRepository = {
  add: jest.fn(),
  search: jest.fn(),
};
const country: CountryQueries = {
  name: 'Chile',
  code: 'CHI',
};
const countryUseCase = new CountryUseCase(countryRepository);

describe('Unit test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return an array of countries by queries', async () => {
    countryRepository.search.mockResolvedValue([country]);
    const result = await countryUseCase.search(country);
    expect(result).toEqual([country]);
    expect(countryRepository.search).toHaveBeenCalledWith({
      name: 'Chile',
      code: 'CHI',
    });
  });
});
