import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],

})
export class CustomersComponent {

  columns: string[] = ['firstName','lastName','email','contactNumber', 'id'];
  customers: Customer[] = []
  constructor(private cs:CustomersService, private router: Router){}


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
