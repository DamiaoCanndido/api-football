import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import { connectDB } from 'infra/database';

dotenv.config();

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewaresInitialize();
    this.routesInitialize();
    this.errorInterception();
    connectDB();
  }

  routesInitialize() {}

  errorInterception() {}

  middlewaresInitialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  listen() {
    this.app.listen(3333, () => console.log('Server is running...'));
  }
}
