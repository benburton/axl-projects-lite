import { Range } from './range';
import { RangeFormattingService } from './range-formatting.service';

describe('RangeFormattingService', () => {

  const service = new RangeFormattingService();

  describe('formatNumber', () => {

    describe('with leading zeroes', () => {

      it ('removes leading zeroes', () => {
        expect(service.formatNumber('00')).toEqual('0');
      });

    });

    describe('values greater than 1000', () => {

      it('adds commas', () => {
        expect(service.formatNumber('1000')).toEqual('1,000');
        expect(service.formatNumber('2000000')).toEqual('2,000,000');
      });

    });

    describe('values ending in "k"', () => {

      it('expands to thousands', () => {
        expect(service.formatNumber('2k')).toEqual('2,000');
        expect(service.formatNumber('2K')).toEqual('2,000');
      });

    });

    describe('values ending in "m"', () => {

      it('expands to millions', () => {
        expect(service.formatNumber('3m')).toEqual('3,000,000');
        expect(service.formatNumber('3M')).toEqual('3,000,000');
      });

    });

    describe('value with invalid number', () => {

      it('returns numeric equivalent', () => {
        const incorrectInput = '3f';
        expect(service.formatNumber(incorrectInput)).toEqual('3');
      });

    });

    describe('value with incorrect comma placement', () => {

      it('returns correct comma placement', () => {
        expect(service.formatNumber('20,00')).toEqual('2,000');
      });

    });

  });

  describe('getNumber', () => {

    describe('value with commas', () => {

      it('returns numeric value without commas', () => {
        expect(service.getNumber('3,000')).toEqual(3000);
      });

    });

    describe('value ending in "k"', () => {

      it('returns numeric value with expanded thousands', () => {
        expect(service.getNumber('3k')).toEqual(3000);
      });

    });

    describe('value ending in "m"', () => {

      it('returns numeric value with expanded millions', () => {
        expect(service.getNumber('3m')).toEqual(3000000);
      });

    });

    describe('value with invalid number', () => {

      it('returns NaN', () => {
        expect(service.getNumber('3f')).toBeNaN();
      });

    });

  });

  describe('formatRange', () => {

    describe('range containing minimum and maximum', () => {

      it('displays range with comma separated amounts, prefixed by dollar sizes, separated by "-"', () => {
        expect(service.format({minimum: 0, maximum: 1000})).toEqual('$0 - $1,000');
      });

    });

    describe('range without minimum', () => {

      it('returns undefined', () => {
        expect(service.format({minimum: undefined, maximum: 1000})).toBeUndefined();
      });

    });

    describe('range without maximum', () => {

      it('returns undefined', () => {
        expect(service.format({minimum: 0, maximum: undefined})).toBeUndefined();
      });

    });

  });

});
