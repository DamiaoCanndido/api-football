import { Team } from '../src/entities';
import { App } from '../src/main/app';
import request from 'supertest';

const app = new App().app;

describe('Team test', () => {
  it('/POST team', async () => {
    const team: Team = {
      name: 'Manchester City',
      code: 'MCY',
      logo: 'manchester-city.png',
    };
    const response = await request(app).post('/team').send(team);

    expect(response.status).toBe(201);
    expect(response.body.code).toEqual('MCY');
  });

  it('should return error 400 when the request body is empty', async () => {
    const response = await request(app).post('/team').send();

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: 'The field name is missing.',
    });
  });

  it('/GET team', async () => {
    const response = await request(app).get('/team');
    expect(response.status).toBe(200);
  });
});
