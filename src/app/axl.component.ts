import { Component } from '@angular/core';

@Component({
  selector: 'axl-root',
  template: ` 
    <axl-header></axl-header>
    <router-outlet><router-outlet>
  `
})
export class AxlComponent {
}
