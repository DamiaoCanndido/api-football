import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../docs/swagger.json';
import { app, server, initializeSocket } from '../ws';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { errorMiddleware } from '../middlewares';
import { TeamRoutes, LeagueRoutes, MatchRoutes } from '../routes';

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css';
const CUSTOM_JS =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.min.js';

dotenv.config();

export class App {
  private teamRoutes = new TeamRoutes();
  private leagueRoutes = new LeagueRoutes();
  private matchRoutes = new MatchRoutes();

  constructor() {
    this.middlewaresInitialize();
    this.routesInitialize();
    initializeSocket();
    this.errorInterception();
  }

  routesInitialize() {
    app.use('/team', this.teamRoutes.router);
    app.use('/league', this.leagueRoutes.router);
    app.use('/match', this.matchRoutes.router);
    app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocs, {
        customCssUrl: CSS_URL,
        customJs: CUSTOM_JS,
      })
    );
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
