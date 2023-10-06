import { FixturesInput, FixturesOutput } from '../../entities';

export interface FixturesAddInterface {
  add: (fxInput: FixturesInput) => Promise<FixturesOutput>;
}
