import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from 'src/app/interface/customer';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  customerForm!: FormGroup;
  customerId: any;
  customerData: Customer = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  };
  currentRoute: string = "";
  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private customer: CustomersService, 
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url[0].path;
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

    if (this.currentRoute !== 'add') {
      this.route.paramMap.subscribe(params => {

        const id = params.get('id');

        if (id) this.customerId = +id;

        else this.customerId = null;

      });
      this.customer.getCustomerById(this.customerId).subscribe((response) => {
        this.customerForm.setValue({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          contactNumber: response.contactNumber,
        });
        
      })
      
    }
  }

  onSubmit(): void {
    if (this.currentRoute == "edit") {
      if (this.customerForm.valid) {
        this.customer.updateCustomer(this.customerId, this.customerForm.value).subscribe((response) => {
          this.router.navigate(['/'])
        })
      } else {
        console.log('Form Invalid');
      }
    }
    if (this.currentRoute == "add") {
      if (this.customerForm.valid) {
        this.customer.createCustomer(this.customerForm.value).subscribe((response) => {
          this.router.navigate(['/'])
        });
      } else {
        console.log('Form Invalid');
      }
    }

  }
}
