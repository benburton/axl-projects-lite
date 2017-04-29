import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import 'hammerjs';

import { DialogService } from './dialog.service';
import { ProjectListComponent, zeroStateMessage } from './project-list.component';
import { ProjectService } from './project.service';
import { RangeFormattingService } from './range-formatting.service';

describe('ProjectListComponent', () => {

  const component = ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  let projects = [];

  class MockDialogService {
    confirm(title: string, message: string) {
      // dialog
    }
  }

  class MockProjectService {
    getProjects() {
      return Promise.resolve(projects);
    }
  }

  let formattedRange;

  class MockRangeFormattingService {
    format(range) {
      return formattedRange;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule.forRoot()
      ],
      declarations: [
        ProjectListComponent
      ],
      providers: [
        { provide: DialogService, useClass: MockDialogService },
        { provide: ProjectService, useClass: MockProjectService },
        { provide: RangeFormattingService, useClass: MockRangeFormattingService }
      ]
    });

    fixture = TestBed.createComponent(ProjectListComponent);

  });

  describe('no projects returned from ProjectService', () => {

    it('renders zero state', fakeAsync(() => {
      fixture.componentInstance.getProjects();
      tick();
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.zero-state').textContent.trim()).toEqual(zeroStateMessage);
    }));

  });

  describe('projects are returned from ProjectService', () => {

    const project = {
      header: 'My great project',
      checkSize: {
        minimum: 0,
        maximum: 300
      }
    };

    beforeEach(() => {
      projects = [project];
      formattedRange = '$0 - $1000';
    });

    const afterCompile = (block) => fakeAsync(() => {
      fixture.componentInstance.getProjects();
      tick();
      fixture.detectChanges();
      block(fixture.debugElement.nativeElement);
    });

    it('does not render zero state', afterCompile((compiled) => {
      expect(compiled.querySelector('.zero-state')).toBeNull();
    }));

    it('renders project header', afterCompile((compiled) => {
      expect(compiled.querySelector('.project-header').textContent).toEqual(project.header);
    }));

  });

});
