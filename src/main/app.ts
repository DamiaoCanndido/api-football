import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import { errorMiddleware } from '../middlewares';
import { TeamRoutes, LeagueRoutes } from '../routes';

dotenv.config();

export class App {
  private teamRoutes = new TeamRoutes();
  private leagueRoutes = new LeagueRoutes();

  public app: Application;

  constructor() {
    this.app = express();
    this.middlewaresInitialize();
    this.routesInitialize();
    this.errorInterception();
  }

  routesInitialize() {
    this.app.use('/team', this.teamRoutes.router);
    this.app.use('/league', this.leagueRoutes.router);
  }

  errorInterception() {
    this.app.use(errorMiddleware);
  }

  middlewaresInitialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  listen() {
    this.app.listen(3333, () => console.log('Server is running...'));
  }
}
