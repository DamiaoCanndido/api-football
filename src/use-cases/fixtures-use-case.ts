import { FixturesAddInterface } from '../interfaces/fixtures';
import { FixturesInput } from '../entities';

export class FixturesUseCase implements FixturesAddInterface {
  constructor(private addFxRepo: FixturesAddInterface) {}
  async add(fixture: FixturesInput) {
    const result = await this.addFxRepo.add(fixture);
    return result;
  }
}
