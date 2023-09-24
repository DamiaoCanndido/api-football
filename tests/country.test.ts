import { Country } from '../src/entities';
import { App } from '../src/main/app';
import request from 'supertest';

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
});
