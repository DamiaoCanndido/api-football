import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import { errorMiddleware } from '../middlewares';
import { CountryRoutes, TeamRoutes } from '../routes';

dotenv.config();

export class App {
  private countryRoutes = new CountryRoutes();
  private teamRoutes = new TeamRoutes();
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewaresInitialize();
    this.routesInitialize();
    this.errorInterception();
  }

  routesInitialize() {
    this.app.use('/country', this.countryRoutes.router);
    this.app.use('/team', this.teamRoutes.router);
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
