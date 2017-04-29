import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'project/:id', component: ProjectComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AxlRoutingModule {}
