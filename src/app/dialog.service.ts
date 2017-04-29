import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Injectable } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) {
  }

  public confirm(title: string, message: string): Observable<boolean> {
    let dialogRef: MdDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

}
