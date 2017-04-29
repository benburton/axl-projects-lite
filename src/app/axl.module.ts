import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { AxlComponent } from './axl.component';
import { AxlRoutingModule } from './axl-routing.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { DialogService } from './dialog.service';
import { FinancialInputComponent } from './financial-input.component';
import { HeaderComponent } from './header.component';
import { InMemoryDataService } from './in-memory-data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from './project.service';
import { RangeFormattingService } from './range-formatting.service';

@NgModule({
  imports: [
    AxlRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MaterialModule.forRoot()
  ],
  declarations: [
    AxlComponent,
    ConfirmDialogComponent,
    FinancialInputComponent,
    HeaderComponent,
    ProjectComponent,
    ProjectListComponent,
  ],
  providers: [
    DialogService,
    ProjectService,
    RangeFormattingService
  ],
  bootstrap: [
    AxlComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class AxlModule {
}
