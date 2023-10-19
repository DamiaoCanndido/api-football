import { TeamType } from './team';

export class TeamQueries {
  constructor(
    public name?: string,
    public code?: string,
    public type?: TeamType
  ) {}
}
