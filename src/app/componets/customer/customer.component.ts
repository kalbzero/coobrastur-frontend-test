import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [];
  countCustomers: number = 0;
  sliceCustomers: Customer[] = [];
  initial: number = 0;
  final: number =  5;
  
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.customerService.getCustomers().then(
      (customers: Customer[]) => {
        this.customers = customers;
        this.countCustomers = customers.length;
        this.sliceCustomers = customers.slice(this.initial, this.final);
      }
    );
  }

  

  onEdit(id: number){
    this.router.navigateByUrl('edit/'+id);
  }

  onBefore(){
    if(this.initial >= 5){
      this.initial = this.initial - 5;
      this.final = this.final - 5;
      this.sliceCustomers = this.customers.slice(this.initial, this.final);
      
    } else if(this.initial < 5){
      this.initial = 0;
      this.final = 5;
      this.sliceCustomers = this.customers.slice(this.initial, this.final);
    }
    console.log("before: "+ this.initial);
  }

  onAfter(){
    if(this.final <= 5){
      this.final = this.final + 5;
      this.initial = this.initial + 5;
      this.sliceCustomers = this.customers.slice(this.initial, this.final);

    } else if(this.final <= this.countCustomers){
      this.final = this.final + 5 > this.countCustomers? this.final = this.countCustomers : this.final = this.final +5;
      this.initial = this.final + 5 > this.countCustomers? this.initial = this.countCustomers - 5 : this.initial = this.initial + 5;
      this.sliceCustomers = this.customers.slice(this.initial, this.final);
    }
    console.log("after: "+ this.final);
  }
}
