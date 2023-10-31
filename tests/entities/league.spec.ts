import { test, expect, describe, beforeEach } from 'vitest';
import { League } from '../../src/entities';

describe('League entity', () => {
  let data: League;
  let sut: League;
  beforeEach(() => {
    data = {
      name: 'Brasileiro Série A',
      logo: 'brasileirao.png',
      type: 'cup',
      season: '2023/2023',
      numberOfRounds: 3,
      rounds: ['1', '2', '3'],
      countryId: '1',
    };
    sut = new League(
      data.name,
      data.type,
      data.logo,
      data.season,
      data.numberOfRounds,
      data.rounds,
      data.countryId
    );
  });

  test('should create only with league data', () => {
    expect(sut).toEqual(data);
  });

  test('should return an empty name exception', () => {
    function name() {
      new League(
        '',
        data.type,
        data.logo,
        data.season,
        data.numberOfRounds,
        data.rounds,
        data.countryId
      );
    }
    expect(() => name()).toThrowError('Name is incorrect.');
  });

  test('should return an incorrect type exception', () => {
    data.type = 'copa' as any;
    function type() {
      new League(
        data.name,
        data.type,
        data.logo,
        data.season,
        data.numberOfRounds,
        data.rounds,
        data.countryId
      );
    }
    expect(() => type()).toThrowError('Type is incorrect.');
  });

  test('should return an empty logo exception', () => {
    function logo() {
      new League(
        data.name,
        data.type,
        '',
        data.season,
        data.numberOfRounds,
        data.rounds,
        data.countryId
      );
    }
    expect(() => logo()).toThrowError('Logo is incorrect.');
  });

  test('should return an empty season exception', () => {
    function season() {
      new League(
        data.name,
        data.type,
        data.logo,
        '',
        data.numberOfRounds,
        data.rounds,
        data.countryId
      );
    }
    expect(() => season()).toThrowError('Season is incorrect.');
  });

  test('should return an empty number of rounds exception', () => {
    function number() {
      new League(
        data.name,
        data.type,
        data.logo,
        data.season,
        -1,
        data.rounds,
        data.countryId
      );
    }
    expect(() => number()).toThrowError('number of rounds is incorrect.');
  });

  test('should return an undefined country id exception', () => {
    const sut = new League(
      data.name,
      data.type,
      data.logo,
      data.season,
      data.numberOfRounds,
      data.rounds
    );
    expect(sut.countryId).toBe(null);
  });
});
