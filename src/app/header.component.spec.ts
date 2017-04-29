import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { title, HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const component = HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  class MockRouter {
    navigateByUrl(url: string) { return url; }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule.forRoot()
      ],
      declarations: [
        HeaderComponent
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);

  });

  describe('Axial logo', () => {

    beforeEach(() => {
      de = fixture.debugElement.query(By.css('img'));
      element = de.nativeElement;
    });

    it('should be rendered', () => {
      expect(element).toBeDefined();
      expect(element.getAttribute('src')).toEqual('assets/axial-logo_color.png');
    });

  });

  describe('page header text', () => {

    beforeEach(() => {
      de = fixture.debugElement.query(By.css('.header'));
      element = de.nativeElement;
    });

    it('should contain title', () => {
      fixture.detectChanges();
      expect(element.textContent).toContain(title);
    });

  });

  describe('home link', () => {

    beforeEach(() => {
      de = fixture.debugElement.query(By.css('.home-link'));
      element = de.nativeElement;
    });

    it('should route to "/"', () => {
      fixture.detectChanges();
      const href = element.getAttribute('ng-reflect-router-link');
      expect(href).toEqual('/');
    });

  });

});
