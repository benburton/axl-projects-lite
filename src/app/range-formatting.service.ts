import { Injectable } from '@angular/core';
import { Range } from './range';

@Injectable()
export class RangeFormattingService {

  /**
   * Suffix values and their multipliers
   */
  readonly multipliers = {
    k: 1000,
    m: 1000000
  };

  /**
   * Formats a range prefixed with dollar signs, comma separated, separated by a '-'. Returns
   * undefined if either minimum or maximum on the Range are undefined, e.g.,
   *   {minimum: 0, maximum: 1000} returns "$0 - $1,000"
   *   {minimum: 0, maximum: undefined} returns undefined
   *   {minimum: undefined, maximum: 1000} returns undefined
   * @param range A Range value to render as a string
   */
  format(range: Range): string {
    if (range.minimum !== undefined && range.maximum !== undefined) {
      return `$${this.formatNumber(range.minimum.toString())} - $${this.formatNumber(range.maximum.toString())}`;
    }
    return undefined;
  }

  /**
   * Returns a string with commas in appropriate thousands-places. If the string ends in
   * a valid multipler value (e.g, 'k', 'm'), the value will be expanded to the approprate
   * value. If the string does not represent a valid number, it will remove invalid characters.
   *
   * @param numberInput A string (potentially) representing a number
   */
  formatNumber(numberInput: string): string {
    if (numberInput) {
      let numberString = numberInput.replace(/,/g , '');
      const multiplier = this.multipliers[numberString.slice(-1).toLowerCase()];
      if (multiplier) {
        numberString = numberString.substring(0, numberString.length - 1) + multiplier.toString().slice(1);
      }
      // coerce to int
      const intVal = parseInt(numberString.replace(/\D/g, ''), 10);
      numberString = intVal.toString();
      if (isNaN(intVal)) {
        return '';
      }
      return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return numberInput;
  }

  /**
   * A function which returns a numerical value of a string, allowing for formatting with
   * commas for thousands separators, ending with 'k' or 'm' for thosands or millions
   * multiplier values respectively. Returns NaN if the string does not represent a valid
   * numerical value in this format.
   *
   * @param string A string (potentially) representing a numerical value
   */
  getNumber(string: string): number {
    const valid = /^\d{1,3}(,?\d{3})*[k|m]?$/;
    if (valid.test(string)) {
      const withoutCommas = this.formatNumber(string).replace(/,/g, '');
      try {
        return parseInt(withoutCommas, 10);
      } catch (e) {
        return NaN;
      }
    } else {
      return NaN;
    }
  }

}
