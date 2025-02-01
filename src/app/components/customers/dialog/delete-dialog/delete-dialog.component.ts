import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    public deleteRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customerId:number },
    private customer: CustomersService,
    private router:Router,
  ) {}

  onClose(): void {
    this.deleteRef.close(false);
  }

  onConfirm(): void {
    this.customer.deleteCustomer(this.data.customerId).subscribe((response=>{
      this.deleteRef.close(true);
    }))
  }
}
