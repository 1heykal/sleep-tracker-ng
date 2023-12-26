import { Component, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sleep-tracker';

  constructor(private dialog: MatDialog, private api: ApiService) {

  }

  ngOnInit(): void {
    // this.getRecords();
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if(val == 'save')
       console.log('ayyyyyo')
    });

  }

}
