import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-data-dialog',
  templateUrl: './data-dialog.component.html',
  styleUrls: ['./data-dialog.component.sass']
})
export class DataDialogComponent {
  fields = new Array<any>();
  data: any;
  returnObject = {
    data: {},
    action: ''
  };
  constructor(public dialogRef: MatDialogRef<DataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) inputdata: any) {
      this.data = inputdata;
      for (const key in inputdata) {
        if (typeof key !== 'object') {
          this.fields.push({
            name: key,
            type: typeof key
          });
        }
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
