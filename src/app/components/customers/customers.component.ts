import { Component } from '@angular/core';
import { Customer } from 'src/app/interface/customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],

})
export class CustomersComponent {
  columns: string[] = ['First Name','Last Name','Email','Contact No.'];
  customers: Customer[] = []
  constructor(private cs:CustomersService){}


  ngOnInit(){
    this.loadCustomers();
  }

  loadCustomers(){
    this.cs.getCustomers().subscribe((c)=>{
      this.customers = c;
    })
  }
}
