import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string = 'https://reqres.in/api/';

  constructor() { }
}
