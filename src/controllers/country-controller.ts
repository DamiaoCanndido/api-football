import { Request, Response, NextFunction } from 'express';
import { CountryUseCase } from '../use-cases/country-use-case';
import { Country } from '../entities/country';

export class CountryController {
  constructor(private countryUseCase: CountryUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const { name, code, flag }: Country = req.body;
    try {
      const country = await this.countryUseCase.add({ name, code, flag });
      return res.status(201).json(country);
    } catch (error) {
      next(error);
    }
  }
}
