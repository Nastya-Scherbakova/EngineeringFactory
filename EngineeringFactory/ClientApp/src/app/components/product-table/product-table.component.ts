import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.sass']
})
export class ProductTableComponent implements OnInit {

  displayedColumns: string[] = ['code', 'title', 'price', 'action'];
  dataSource = Array<Product>();
  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.api.getProducts().subscribe(data => {
      this.dataSource = data;
    });
  }

  admin(el: Product) {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: el
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'ok') {
        this.api.updateProduct(result.data).subscribe(() => this.refreshData());
      } else if (result && result.action === 'delete') {
        this.api.deleteProduct(el).subscribe(() => this.refreshData());
      }
    });
  }

  add() {
    const obj = new Product();
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'ok') {
        this.api.addProduct(result.data).subscribe(() => this.refreshData());
      }
    });
  }

}
