import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  displayedColumns: string[] = ['name', 'status', 'duration', 'startTime', 'endTime', 'sleepQuality', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private dialog: MatDialog, private api: ApiService) {

  }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.api.getRecord().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
       alert("error while fetching the records" + err.message);
      }
    }

    );
  }

  editRecord(row: any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val == "update")
        this.getRecords();
    })
  }

  deleteRecord(id: number){
    this.api.deleteRecord(id).subscribe({
      next: (res) => {
        alert("record deleted successfully"),
        this.getRecords();
      },
      error: (err) => {
        alert("error has occured updating the record" + err.message);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}


