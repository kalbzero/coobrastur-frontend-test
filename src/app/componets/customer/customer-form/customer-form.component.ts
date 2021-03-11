import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/interfaces/customer';
import { RequestApi } from 'src/app/interfaces/request';
import { RequestCustomer } from 'src/app/interfaces/requestCustomer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required])
  });

  currentAction: string = '';
  pageTitle: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();

  }

  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'add') {
      this.currentAction = 'add';
      this.pageTitle = 'Novo';
    } else {
      this.currentAction = 'edit';
      this.pageTitle = 'Editar';
    }

    this.loadPage();
  }

  private loadPage() {
    if(this.currentAction == 'edit') {
      this.customerService.getCustomerById(parseInt(this.route.snapshot.url[1].path)).subscribe(
        (customer: RequestCustomer) => {this.updateForm(customer.data); console.log(customer.data);}
      );
    }
  }

  private updateForm(customer: Customer){
    this.customerForm.patchValue({
      id: customer.id,
      name: customer.first_name +' '+customer.last_name,
      job: customer.job
    });
  }

  onSubmit() {
    if(this.customerForm.valid){
      if(this.currentAction == 'add'){
        this.customerService.createCustomer(this.customerForm.value).subscribe(
          (response) => {console.log(response); this.router.navigate(['']);},
          (error) => {console.log(error);}
        );
      } else {
        this.customerService.updateCustomer(this.customerForm.value).subscribe(
          (response) => {console.log(response); this.router.navigate(['']);},
          (error) => {console.log(error);}
        );
      }
    }
    
  }

  goBack() {
    this.location.back();
  }
}
