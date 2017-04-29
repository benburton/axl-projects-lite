import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from './dialog.service';
import { Project } from './project';
import { ProjectService } from './project.service';
import { Range } from './range';
import { RangeFormattingService } from './range-formatting.service';

export const zeroStateMessage = `Oops! There are no projects. Add one by clicking 'Add Project' below.`;

@Component({
  selector: 'axl-project-list',
  template: `
    <div fxFlex>
      <div fxFlex="20"></div>
      <div class="project-list" fxFlex="60">
        <ul class="projects">
          <li class="project" *ngFor="let project of projects">
            <h3 class="project-header">{{project.header}}</h3>
            <ul class="project-ranges" *ngIf="hasRanges(project)">
              <li class="range" *ngIf="rangeString(project.checkSize)">Check Size: {{rangeString(project.checkSize)}}</li>
              <li class="range" *ngIf="rangeString(project.revenue)">Revenue: {{rangeString(project.revenue)}}</li>
              <li class="range" *ngIf="rangeString(project.ebitda)">EBIDTA: {{rangeString(project.ebitda)}}</li>
            </ul>
            <button md-raised-button [routerLink]="['/project', project.id]">Edit</button>
            <button md-raised-button (click)="delete(project)">Delete</button>
          </li>
        </ul>
        <div *ngIf="projects !== undefined && projects.length === 0" class="zero-state">
          {{zeroStateMessage}}
        </div>
        <button md-raised-button (click)="add()">Add Project</button>
      </div>
    </div>
  `,
  styleUrls: [ 'project-list.component.css' ]
})
export class ProjectListComponent implements OnInit {
  private projects: Project[];

  readonly zeroStateMessage = zeroStateMessage;

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private projectService: ProjectService,
    private rangeFormattingService: RangeFormattingService
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().then(projects => this.projects = projects);
  }

  private rangeString(range: Range): string {
    return range ? this.rangeFormattingService.format(range) : undefined;
  }

  private hasRanges(project: Project) {
    const { checkSize, revenue, ebitda } = project;
    const isValid = (range: Range) => {
      if (range === undefined) {
        return false;
      }
      const { minimum, maximum } = range;
      return minimum !== undefined && maximum !== undefined;
    };
    return [checkSize, revenue, ebitda].find((range) => isValid(range)) !== undefined;
  }

  delete(project: Project): void {
    this.dialogService
      .confirm(`Delete Project`, `Are you sure you want to delete the project "${project.header}"?`)
      .subscribe(result => {
        if (result === true) {
          this.projectService.delete(project.id).then(() => {
            this.projects = this.projects.filter(p => p !== project);
          });
        }
      });
  }

  add(): void {
    this.projectService.create().then(project => {
      this.projects.push(project);
    });
  }

}
