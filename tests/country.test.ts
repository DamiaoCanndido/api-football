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

  it('should return error 400 when the request body is empty', async () => {
    const response = await request(app).post('/country').send();

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: 'The field name is missing.',
    });
  });

  it('/GET country', async () => {
    const response = await request(app).get('/country?name=chile');
    expect(response.status).toBe(200);
  });
});
