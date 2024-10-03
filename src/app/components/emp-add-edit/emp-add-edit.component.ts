import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployesService } from 'src/app/services/employes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  employeeForm: FormGroup;
  education: string[] = [
    'SSC',
    'Diploma/Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private _employeService: EmployesService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this._employeService.updateEmployee(this.data.id,this.employeeForm.value).subscribe(
          (data:any)=>{
            alert('Employee Details Updated');
            this._dialogRef.close(true);
          },
          (error: any) => {
            alert('Updation failed');
          }
        )
      }
       else {
        this._employeService.createEmployee(this.employeeForm.value).subscribe(
          (data: any) => {
            alert('Employee Details Added');
            this._dialogRef.close(true);
          },
          (error: any) => {
            alert('Creation failed');
          }
        );
      }
    }
  }
}
