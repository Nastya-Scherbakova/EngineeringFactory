import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Forecast } from 'src/app/models/forecast.model';
import { MatDialog } from '@angular/material';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';

@Component({
  selector: 'app-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.sass']
})
export class ForecastTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'demand', 'productCode', 'dateMonth', 'dateYear', 'action'];
  dataSource = Array<Forecast>();
  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.api.getForecasts().subscribe(data => {
      this.dataSource = data;
    });
  }

  admin(el: Forecast) {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: el
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'ok') {
        this.api.updateForecast(result.data).subscribe(() => this.refreshData());
      } else if (result && result.action === 'delete') {
        this.api.deleteForecast(el).subscribe(() => this.refreshData());
      }
    });
  }

  add() {
    const obj = new Forecast();
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'ok') {
        this.api.addForecast(result.data).subscribe(() => this.refreshData());
      }
    });
  }

}
