import { Team } from '../../src/entities';

describe('Team entity', () => {
  const teamData: Team = {
    name: 'any_team',
    code: 'ANY',
    logo: 'uruguai.png',
  };

  it('should create with team data only', () => {
    const result = new Team(teamData.name, teamData.code, teamData.logo);
    expect(result).toEqual(teamData);
  });
});
