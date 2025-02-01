import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogComponent } from './dialog/view-dialog/view-dialog.component';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],

})
export class CustomersComponent {

  columns: string[] = ['firstName','lastName','email','contactNumber', 'id'];
  customers: Customer[] = []
  constructor(
    private cs:CustomersService, 
    private router: Router,
    public  dialog: MatDialog,
  ){}

  openDelete(customerId:any){
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{customerId:customerId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed delete');
      } else {
        console.log('User canceled the delete');
      }
    });
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
      this.customers = c;
    })
  }
}
