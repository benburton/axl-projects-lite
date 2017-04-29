import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'axl-confirm-dialog',
  template: `
    <h3 class="title">{{ title }}</h3>
    <p class="message">{{ message }}</p>
    <button md-raised-button (click)="dialogRef.close(true)">Ok</button>
    <button md-raised-button (click)="dialogRef.close()">Cancel</button>
  `,
  styleUrls: [ 'confirm-dialog.component.css' ]
})
export class ConfirmDialogComponent {
  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {
  }

}
