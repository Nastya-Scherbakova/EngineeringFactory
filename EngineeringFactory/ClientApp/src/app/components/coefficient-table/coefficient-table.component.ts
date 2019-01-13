import { Component, OnInit } from '@angular/core';
import { Coefficient } from 'src/app/models/coefficient.model';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';

@Component({
  selector: 'app-coefficient-table',
  templateUrl: './coefficient-table.component.html',
  styleUrls: ['./coefficient-table.component.sass']
})
export class CoefficientTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'amount', 'productCode', 'resourceId', 'action'];
  dataSource = new Array<Coefficient>();
  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.api.getCoefficients().subscribe(data => {
      this.dataSource = data;
    });
  }

  admin(el: Coefficient) {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: el
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'ok') {
        this.api.updateCoefficient(result.data).subscribe(() => this.refreshData());
      } else if (result && result.action === 'delete') {
        this.api.deleteCoefficient(el).subscribe(() => this.refreshData());
      }
    });
  }

  add() {
    const obj = new Coefficient();
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'ok') {
        this.api.addCoefficient(result.data).subscribe(() => this.refreshData());
      }
    });
  }

}
