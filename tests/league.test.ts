import { League } from '../src/entities';
import { App } from '../src/main/app';
import request from 'supertest';

const app = new App().app;

describe('League test', () => {
  it('/POST league', async () => {
    const league: League = {
      name: 'any_name',
      type: 'CUP',
      logo: 'any_logo.png',
      season: '2023',
      numberOfRounds: 3,
      rounds: [],
      numberOfGroups: 3,
      numberOfRoundsByGroup: 3,
      playoffStages: 3,
      countryId: '6514036e66f44d3920615a93',
    };
    const response = await request(app).post('/league').send(league);

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual('any_name');
  });

  it('should return error 400 when the request body is empty', async () => {
    const response = await request(app).post('/league').send();

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: 'The field name is missing.',
    });
  });
});
