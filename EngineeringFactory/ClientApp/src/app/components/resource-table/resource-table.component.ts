import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/models/resource.model';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.sass']
})
export class ResourceTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'action'];
  dataSource = new Array<Resource>();
  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.api.getResources().subscribe(data => {
      this.dataSource = data;
    });
  }

  admin(el: Resource) {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: el
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'ok') {
        this.api.updateResource(result.data).subscribe(() => this.refreshData());
      } else if (result && result.action === 'delete') {
        this.api.deleteResource(el).subscribe(() => this.refreshData());
      }
    });
  }

  add() {
    const obj = new Resource();
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'ok') {
        this.api.addResource(result.data).subscribe(() => this.refreshData());
      }
    });
  }
}
