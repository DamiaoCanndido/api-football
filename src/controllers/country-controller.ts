import { Request, Response, NextFunction } from 'express';
import { CountryUseCase } from '../use-cases';
import { Country, CountryQueries } from '../entities';
import { Validator } from '../errors';

export class CountryController {
  constructor(private countryUseCase: CountryUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const { name, code, flag }: Country = req.body;
    try {
      new Validator<Country>({ name, code, flag }).blank().missing();
      const country = await this.countryUseCase.add({ name, code, flag });
      return res.status(201).json(country);
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    const { name, code }: CountryQueries = req.query;
    try {
      const countries = await this.countryUseCase.search({ name, code });
      return res.status(200).json(countries);
    } catch (error) {
      next(error);
    }
  }
}
