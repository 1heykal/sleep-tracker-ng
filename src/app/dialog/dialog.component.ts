import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  statusList = ["In Progress", "Done", "Not Yet"];
  recordForm !: FormGroup;
  actionBtn: string = 'Save';



  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {

  }

  ngOnInit(): void {
    this.recordForm = this.formBuilder.group({
      name: '',
      description: '',
      sleepQuality: '',
      duration: '',
      status: '',
      startTime: '',
      currentStartTime: '',
      currentEndTime: '',
      endTime: '', 
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.recordForm.controls['name'].setValue(this.editData.name);
      this.recordForm.controls['description'].setValue(this.editData.description);

      this.recordForm.controls['sleepQuality'].setValue(this.editData.sleepQuality);

      this.recordForm.controls['duration'].setValue(this.editData.duration);

      this.recordForm.controls['status'].setValue(this.editData.status);

      this.recordForm.controls['startTime'].setValue(this.editData.startTime);

      this.recordForm.controls['currentStartTime'].setValue(this.editData.currentStartTime);

      this.recordForm.controls['endTime'].setValue(this.editData.endTime);

      this.recordForm.controls['currentEndTime'].setValue(this.editData.currentEndTime);

    }
  }

  addRecord() {

    if (this.editData) {
      this.updateRecord();
    } else {
      if (this.recordForm.valid)
        this.api.postRecord(this.recordForm.value).subscribe(
          {
            next: (res) => {
              alert("Record Added Successfully");
              this.recordForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error has ocurred");
            }
          });
    }
  }

  updateRecord() {
    this.api.putRecord(this.recordForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("record updated successfuly");
        this.recordForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert("error has occured updating the record" + err.message);
      }
    });
  }

}
