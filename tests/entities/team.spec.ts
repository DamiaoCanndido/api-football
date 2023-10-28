import { test, expect, describe, beforeEach } from 'vitest';
import { Team } from '../../src/entities';

describe('Team entity', () => {
  let data: Team;
  beforeEach(() => {
    data = {
      name: 'Brasil',
      code: 'BRA',
      type: 'selection',
      logo: 'brazil.png',
    };
  });

  test('should create only with team data', () => {
    const sut = new Team(data.name, data.code, data.type, data.logo);
    expect(sut).toEqual(data);
  });

  test('should return an empty name exception', () => {
    data.name = '';
    function name() {
      new Team(data.name, data.code, data.type, data.logo);
    }
    expect(() => name()).toThrowError('Name is incorrect.');
  });

  test('should return an empty code exception', () => {
    function code() {
      new Team(data.name, '', data.type, data.logo);
    }
    expect(() => code()).toThrowError('Code is incorrect.');
  });

  test('should return an empty type exception', () => {
    data.type = 'clube' as any;
    function country() {
      new Team(data.name, data.code, data.type, data.logo);
    }
    expect(() => country()).toThrowError('type is incorrect.');
  });

  test('should return an empty logo exception', () => {
    function logo() {
      new Team(data.name, data.code, data.type, '');
    }
    expect(() => logo()).toThrowError('Logo is incorrect.');
  });
});
