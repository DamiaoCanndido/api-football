import { Router } from 'express';
import { CountryRepositoryDB } from '../repositories/country-repository-db';
import { CountryUseCase } from 'use-cases/country-use-case';
import { CountryController } from '../controllers/country-controller';

export class CountryRoutes {
  public router: Router;
  private countryController: CountryController;

  constructor() {
    this.router = Router();
    const countryRepositoryDB = new CountryRepositoryDB();
    const countryUseCase = new CountryUseCase(countryRepositoryDB);
    this.countryController = new CountryController(countryUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/',
      this.countryController.add.bind(this.countryController)
    );
  }
}
