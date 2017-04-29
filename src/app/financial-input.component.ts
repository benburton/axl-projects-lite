import * as _ from 'lodash';
import { Component, Input, OnInit } from '@angular/core';

import { Range } from './range';
import { RangeFormattingService } from './range-formatting.service';

export const errorMessages = {
  undefined: (field): string => `${field} value is undefined`,
  invalidNumber: (field, string): string => `${field} value "${string}" is not a valid number`,
  minGreaterThanMax: `The minimum value is greater than the maximum value`
};

@Component({
  selector: 'axl-financial-input',
  template: `
    <div class="financial-input">
      <div div fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxFlex>
        <div fxFlex="60%">
          <label>{{label}}:</label>
          <md-input-container>
            <input mdInput [(ngModel)]="min" placeholder="Minimum" (keyup)="onMinChange()"/>
          </md-input-container>
          <md-input-container>
            <input mdInput [(ngModel)]="max" placeholder="Maximum" (keyup)="onMaxChange()"/>
          </md-input-container>
        </div>
        <div fxFlex>
          <div *ngIf="error" class="error">{{error}}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [ 'financial-input.component.css' ]
})
export class FinancialInputComponent implements OnInit {
  @Input() range: Range;
  @Input() label: string;

  readonly errors = errorMessages;

  private rangeFormattingService: RangeFormattingService;

  private min: string;
  private max: string;
  private error: string;

  constructor(rangeFormattingService: RangeFormattingService) {
    this.rangeFormattingService = rangeFormattingService;
  }

  ngOnInit(): void {
    const { range, rangeFormattingService } = this;
    if (range !== undefined) {
      this.min = rangeFormattingService.formatNumber(range.minimum !== undefined ? range.minimum.toString() : undefined);
      this.max = rangeFormattingService.formatNumber(range.maximum !== undefined ? range.maximum.toString() : undefined);
    }
  }

  onMinChange(): void {
    const { min, rangeFormattingService } = this;
    this.min = rangeFormattingService.formatNumber(min);
    this.error = this.getError();
  }

  onMaxChange(): void {
    const { max, rangeFormattingService } = this;
    this.max = rangeFormattingService.formatNumber(max);
    this.error = this.getError();
  }

  /**
   * Returns an error message if there are problems with the range provided.
   */
  getError() {
    const { min, max, rangeFormattingService, errors } = this;

    if (_.isEmpty(min) && _.isEmpty(max)) {
      return undefined;
    }

    if (min === undefined) {
      return errors.undefined('Minimum');
    } else if (max === undefined) {
      return errors.undefined('Maximum');
    }

    const minValue = rangeFormattingService.getNumber(min);
    const maxValue = rangeFormattingService.getNumber(max);

    if (isNaN(minValue)) {
      return errors.invalidNumber('Minimum', min);
    }
    if (isNaN(maxValue)) {
      return errors.invalidNumber('Maximum', max);
    }
    if (minValue > maxValue) {
      return errors.minGreaterThanMax;
    }
  }

  hasErrors() {
    this.error = this.getError();
    return this.error !== undefined;
  }

  getRange(): Range {
    const { min, max, rangeFormattingService } = this;
    if (_.isEmpty(min) && _.isEmpty(max)) {
      return undefined;
    }
    return new Range(rangeFormattingService.getNumber(min), rangeFormattingService.getNumber(max));
  }

}
