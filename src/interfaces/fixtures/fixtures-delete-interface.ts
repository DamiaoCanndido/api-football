import { FixturesOutput } from '../../entities';

export interface FixturesDeleteInterface {
  delete: (id: string) => Promise<FixturesOutput>;
}
