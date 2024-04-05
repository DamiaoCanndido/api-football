import express from 'express';
import { app, server, initializeSocket } from '../ws';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { errorMiddleware } from '../middlewares';
import { TeamRoutes, LeagueRoutes, FixturesRoutes } from '../routes';

dotenv.config();

export class App {
  private teamRoutes = new TeamRoutes();
  private leagueRoutes = new LeagueRoutes();
  private fixturesRoutes = new FixturesRoutes();

  constructor() {
    this.middlewaresInitialize();
    this.routesInitialize();
    initializeSocket();
    this.errorInterception();
  }

  routesInitialize() {
    app.use('/team', this.teamRoutes.router);
    app.use('/league', this.leagueRoutes.router);
    app.use('/fixtures', this.fixturesRoutes.router);
  }

  errorInterception() {
    app.use(errorMiddleware);
  }

  middlewaresInitialize() {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  listen() {
    server.listen(3333, () => console.log('Server is running...'));
  }
}
