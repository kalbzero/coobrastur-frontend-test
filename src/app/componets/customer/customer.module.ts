import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
  ]
})
export class CustomerModule { }
