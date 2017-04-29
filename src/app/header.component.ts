import { Component } from '@angular/core';

export const title = 'Projects Lite';

@Component({
  selector: 'axl-header',
  template: `
    <div class="header" fxFlex>
      <md-toolbar>
        <div fxFlex="20"></div>
        <div class="home-link" [routerLink]="['/']" fxFlex="60">
          <img src="assets/axial-logo_color.png"/>
          <h2>{{title}}</h2>
        </div>
      </md-toolbar>
    </div>`,
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent {
  readonly title = title;
}
