import { ActivatedRoute, Params } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { FinancialInputComponent } from './financial-input.component';
import { Project } from './project';
import { ProjectService } from './project.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'axl-project',
  template: `
    <div *ngIf="project">
      <div fxFlex>
        <div fxFlex="20"></div>
        <div fxFlex="60">
          <h3>Edit {{project.header}}</h3>
          <md-input-container class="input-full-width">
            <input mdInput [(ngModel)]="project.header" placeholder="Header" />
          </md-input-container>
          <axl-financial-input #checkSize [range]="project.checkSize" [label]="checkSizeString"></axl-financial-input>
          <axl-financial-input #revenue [range]="project.revenue" [label]="revenueString"></axl-financial-input>
          <axl-financial-input #ebitda [range]="project.ebitda" [label]="ebitdaString"></axl-financial-input>
          <button md-raised-button (click)="save()">Save</button>
          <button md-raised-button (click)="cancel()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: [ './project.component.css' ]
})
export class ProjectComponent implements OnInit {
  @Input() private project: Project;

  // these should be inlined
  readonly checkSizeString = 'Check Size';
  readonly revenueString = 'Revenue';
  readonly ebitdaString = 'EBITDA';

  @ViewChild('checkSize') checkSizeInput: FinancialInputComponent;
  @ViewChild('revenue') revenueInput: FinancialInputComponent;
  @ViewChild('ebitda') ebitdaInput: FinancialInputComponent;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.projectService.getProject(+params['id']))
      .subscribe(project => this.project = project);
  }

  private save(): void {
    const { checkSizeInput, revenueInput, ebitdaInput } = this;
    const hasErrors = [checkSizeInput, revenueInput, ebitdaInput].map((input) => input.hasErrors()).indexOf(true) >= 0;
    if (!hasErrors) {
      this.project.checkSize = checkSizeInput.getRange();
      this.project.revenue = revenueInput.getRange();
      this.project.ebitda = ebitdaInput.getRange();
      this.projectService.update(this.project)
        .then(() => this.location.back());
    }
  }

  private cancel(): void {
    this.location.back();
  }

}
