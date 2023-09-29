import { Country } from '../../src/entities';

describe('Country entity', () => {
  const countryData: Country = {
    name: 'Uruguai',
    code: 'URU',
    flag: 'uruguai.png',
  };

  it('should create with country data only', () => {
    const result = new Country(
      countryData.name,
      countryData.code,
      countryData.flag
    );
    expect(result).toEqual(countryData);
  });
});
