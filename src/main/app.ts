import express, { Application } from 'express';
import { createServer, Server } from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { errorMiddleware } from '../middlewares';
import { TeamRoutes, LeagueRoutes, FixturesRoutes } from '../routes';

dotenv.config();

export class App {
  private teamRoutes = new TeamRoutes();
  private leagueRoutes = new LeagueRoutes();
  private fixturesRoutes = new FixturesRoutes();

  public app: Application;
  public server: Server;
  public io: SocketIO;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIO(this.server);
    this.middlewaresInitialize();
    this.routesInitialize();
    this.initializeSocket();
    this.errorInterception();
  }

  initializeSocket() {
    this.io.on('connection', (socket) => {
      console.log('Im Online!');
      socket.on('disconnect', () => {
        console.log('Im Offline!');
      });
      socket.on('update-score', (id: string) => {
        console.log(socket.id, id);
      });
    });
  }

  routesInitialize() {
    this.app.use('/team', this.teamRoutes.router);
    this.app.use('/league', this.leagueRoutes.router);
    this.app.use('/fixtures', this.fixturesRoutes.router);
  }

  errorInterception() {
    this.app.use(errorMiddleware);
  }

  middlewaresInitialize() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  listen() {
    this.server.listen(3333, () => console.log('Server is running...'));
  }
}
