import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogComponent } from './dialog/view-dialog/view-dialog.component';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],

})
export class CustomersComponent {

  columns: string[] = ['firstName','lastName','email','contactNumber', 'id'];
  customers: MatTableDataSource<Customer>;
  constructor(
    private cs:CustomersService, 
    private router: Router,
    public  dialog: MatDialog,
  ){

    const initialData: Customer[] = [];

    this.customers = new MatTableDataSource(initialData);
  }

  openDelete(customerId:any){
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{customerId:customerId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.resetTable();
      this.loadCustomers();
    });
  }

  resetTable(): void {
    this.customers.data = [];
  }

  ngOnInit(){
    this.loadCustomers();
  }
  editCustomer(id:number){
    this.router.navigate(['/edit',id])
  }
  viewCustomer(id:number){
    this.cs.getCustomerById(id).subscribe((response)=>{
      const dialogRef = this.dialog.open(ViewDialogComponent,{
        data:response
      });

      dialogRef.afterClosed().subscribe(result => {
        
      });
    })
  }
  loadCustomers(){
    this.cs.getCustomers().subscribe((c)=>{
      this.customers.data = c;
    })
  }
}
