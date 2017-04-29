
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RangeFormattingService } from './range-formatting.service';
import 'hammerjs';

import { errorMessages, FinancialInputComponent } from './financial-input.component';

describe('FinancialInputComponent', () => {

  const component = FinancialInputComponent;
  let fixture: ComponentFixture<FinancialInputComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  const getNumber = (string: string): number => {
    return parseInt(string, 10);
  };

  const mockRangeFormattingService = {
    formatNumber: (numberInput: string): string => {
      return numberInput;
    },
    getNumber: getNumber
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule.forRoot()
      ],
      declarations: [
        FinancialInputComponent
      ],
      providers: [
        {
          provide: RangeFormattingService, useValue: mockRangeFormattingService
        }
      ]
    });

    fixture = TestBed.createComponent(FinancialInputComponent);

  });

  describe('label', () => {

    beforeEach(() => {
      debugElement = fixture.debugElement.query(By.css('label'));
      element = debugElement.nativeElement;
    });

    it('should contain the label attribute with a ":" at the end', () => {
      const label = 'Financial value';
      fixture.componentInstance.label = label;
      fixture.detectChanges();
      expect(element.textContent).toBe(`${label}:`);
    });

  });

  describe('getError', () => {

    describe('when no min or max are defined', () => {

      it('returns undefined', () => {
        fixture.detectChanges();
        expect(fixture.componentInstance.getError()).toBeUndefined();
      });

    });

    describe('when min is defined but max is not defined', () => {

      it('returns an error for the maximum being undefined', () => {
        fixture.componentInstance.range = {minimum: 0, maximum: undefined};
        fixture.detectChanges();
        expect(fixture.componentInstance.getError()).toEqual(errorMessages.undefined('Maximum'));
      });

    });

    describe('when max is defined but min is not defined', () => {

      it('returns an error for the minimum being undefined', () => {
        fixture.componentInstance.range = {minimum: undefined, maximum: 300};
        fixture.detectChanges();
        expect(fixture.componentInstance.getError()).toEqual(errorMessages.undefined('Minimum'));
      });

    });

    describe('when min is greater than max', () => {
      it('returns an error that the min is greater than the max', () => {
        fixture.componentInstance.range = {minimum: 5, maximum: 2};
        fixture.detectChanges();
        expect(fixture.componentInstance.getError()).toEqual(errorMessages.minGreaterThanMax);
      });
    });

  });

});
