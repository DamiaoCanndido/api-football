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
      countryId: '65155228fd3638b854126796',
    };
    const response = await request(app).post('/team').send(team);

    expect(response.status).toBe(201);
    expect(response.body.code).toEqual('MCY');
  });
});
