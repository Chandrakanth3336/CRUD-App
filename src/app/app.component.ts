import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { EmployesService } from './services/employes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _employesService: EmployesService
  ) {}
  ngOnInit(): void {
    this.getEmployees();
  }

  openAddEdit() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe(
      (data:any)=>{
        if(data){
          this.getEmployees();
        }
      })
  }

  openEditForm(data:any) {
    const dialogRef= this._dialog.open(EmpAddEditComponent,{
      data
     });
     dialogRef.afterClosed().subscribe(
      (data:any)=>{
        if(data){
          this.getEmployees();
        }
      })
  }


  getEmployees() {
    this._employesService.getEmployees().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err: any) => {
        alert('Internal Server error');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployes(id: number) {
    this._employesService.deleteEmployee(id).subscribe(
      (res:any)=>{
        alert('Deleted Successfully')
        this.getEmployees();
      },
      (err:any)=>{
        alert('delete Failed')
      }
    );
  }
}
