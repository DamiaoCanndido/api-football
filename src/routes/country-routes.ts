import { Router } from 'express';
import { CountryRepositoryDB } from '../repositories';
import { CountryUseCase } from '../use-cases';
import { CountryController } from '../controllers';

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
    this.router.get(
      '/',
      this.countryController.search.bind(this.countryController)
    );
  }
}
