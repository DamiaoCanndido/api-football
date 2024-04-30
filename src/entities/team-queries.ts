import { TeamType } from './team';

export class TeamQueries {
  constructor(
    public name?: string,
    public type?: TeamType,
    public country?: string,
    public p?: number
  ) {}
}
