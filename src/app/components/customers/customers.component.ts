import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';



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
        // Proceed with delete action
      } else {
        console.log('User canceled the delete');
        // Handle cancel action
      }
    });
  }

  ngOnInit(){
    this.loadCustomers();
  }
  viewCustomer(id:number){
    this.router.navigate(['/view',id])
  }
  loadCustomers(){
    this.cs.getCustomers().subscribe((c)=>{
      this.customers = c;
    })
  }
}
