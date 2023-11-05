import { test, expect, describe, beforeEach } from 'vitest';
import { Team, TeamProps } from '../../src/entities';

describe('Team entity', () => {
  let data: TeamProps;
  beforeEach(() => {
    data = {
      name: 'Brasil',
      code: 'BRA',
      type: 'selection',
      logo: 'brazil.png',
    };
  });

  test('should create only with team data', () => {
    const sut = new Team(data);
    expect(sut).toBeInstanceOf(Team);
  });

  test('should return an empty name exception', () => {
    data.name = '';
    function name() {
      new Team(data);
    }
    expect(() => name()).toThrowError('Name is incorrect.');
  });

  test('should return an empty code exception', () => {
    data.code = '';
    function code() {
      new Team(data);
    }
    expect(() => code()).toThrowError('Code is incorrect.');
  });

  test('should return an empty type exception', () => {
    data.type = 'clube' as any;
    function country() {
      new Team(data);
    }
    expect(() => country()).toThrowError('type is incorrect.');
  });

  test('should return an empty logo exception', () => {
    data.logo = '';
    function logo() {
      new Team(data);
    }
    expect(() => logo()).toThrowError('Logo is incorrect.');
  });
});
