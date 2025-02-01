import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { ViewComponent } from './components/customers/forms/view/view.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'add', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
