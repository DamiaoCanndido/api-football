import { test, expect, describe, beforeEach } from 'vitest';
import { League, LeagueInput } from '../../src/entities';

describe('League entity', () => {
  let data: LeagueInput;
  let sut: League;
  beforeEach(() => {
    data = {
      name: 'Brasileiro Série A',
      logo: 'brasileirao.png',
      type: 'cup',
      season: '2023/2023',
      numberOfRounds: 3,
      rounds: ['1', '2', '3'],
      countryId: 1,
    };
    sut = new League(data);
  });

  test('should create only with league data', () => {
    expect(sut).toBeInstanceOf(League);
  });

  test('should return an empty name exception', () => {
    data.name = '';
    function name() {
      new League(data);
    }
    expect(() => name()).toThrowError('Name is incorrect.');
  });

  test('should return an incorrect type exception', () => {
    data.type = 'copa' as any;
    function type() {
      new League(data);
    }
    expect(() => type()).toThrowError('Type is incorrect.');
  });

  test('should return an empty logo exception', () => {
    data.logo = '';
    function logo() {
      new League(data);
    }
    expect(() => logo()).toThrowError('Logo is incorrect.');
  });

  test('should return an empty season exception', () => {
    data.season = '';
    function season() {
      new League(data);
    }
    expect(() => season()).toThrowError('Season is incorrect.');
  });

  test('should return an empty number of rounds exception', () => {
    data.numberOfRounds = -1;
    function number() {
      new League(data);
    }
    expect(() => number()).toThrowError('number of rounds is incorrect.');
  });

  test('should return an undefined country id exception', () => {
    data.countryId = undefined;
    const sut = new League(data);
    expect(sut).toBeInstanceOf(League);
  });
});
