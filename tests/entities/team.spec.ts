import { test, expect, describe } from 'vitest';
import { Team } from '../../src/entities';

describe('Team entity', () => {
  test('should create only with team data', () => {
    const data = {
      name: 'Brasil',
      code: 'BRA',
      isCountry: true,
      logo: 'brazil.png',
    };
    const sut = new Team(data.name, data.code, data.isCountry, data.logo);
    expect(sut).toEqual(data);
  });

  test('should return an empty name exception', () => {
    const dataEmpty = {
      name: '',
      code: 'BRA',
      isCountry: true,
      logo: 'brazil.png',
    };
    function name(team: Team) {
      new Team(team.name, team.code, team.isCountry, team.logo);
    }
    expect(() => name(dataEmpty)).toThrowError('Name is incorrect.');
  });

  test('should return an empty code exception', () => {
    const dataEmpty = {
      name: 'Brasil',
      code: '',
      isCountry: true,
      logo: 'brazil.png',
    };
    function code(team: Team) {
      new Team(team.name, team.code, team.isCountry, team.logo);
    }
    expect(() => code(dataEmpty)).toThrowError('Code is incorrect.');
  });

  test('should return an empty country exception', () => {
    const dataEmpty = {
      name: 'Brasil',
      code: 'BRA',
      isCountry: null,
      logo: 'brazil.png',
    };
    function country(team: any) {
      new Team(team.name, team.code, team.isCountry, team.logo);
    }
    expect(() => country(dataEmpty)).toThrowError('isCountry is incorrect.');
  });

  test('should return an empty logo exception', () => {
    const dataEmpty = {
      name: 'Brasil',
      code: 'BRA',
      isCountry: true,
      logo: '',
    };
    function logo(team: Team) {
      new Team(team.name, team.code, team.isCountry, team.logo);
    }
    expect(() => logo(dataEmpty)).toThrowError('Logo is incorrect.');
  });
});
