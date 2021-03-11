import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, forkJoin } from "rxjs";

import { Customer } from '../interfaces/customer';
import { RequestApi } from '../interfaces/request';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string = 'https://reqres.in/api/';

  constructor(private http: HttpClient) { }

  async getCustomers(): Promise<Customer[]>{
    let page1: Observable<RequestApi> = this.http.get<RequestApi>(this.baseUrl+'users?page=1');
    let page2: Observable<RequestApi> = this.http.get<RequestApi>(this.baseUrl+'users?page=2');
    let customers: Customer[] = [];

    await forkJoin([page1, page2]).toPromise().then(
      (results: RequestApi[]) => {
        results.forEach( (req: RequestApi) => {
          req.data.forEach( (customer: Customer) => {
            customers.push(customer);
          })
        })
       }
    );

    return customers;
  }

  getCustomerById(id: number): Observable<Customer>{
    return this.http.get<Customer>(this.baseUrl+'users/'+id);
  }

  createCustomer(customer: Customer): Observable<Customer>{
    const url = this.baseUrl + '/users';
    const header = new HttpHeaders().set('Content-Type', 'application/json');

    const body = 'name=' + customer.name +
                  '&job' + customer.job;

    return this.http.post<Customer>(url, body, {headers: header});
  }

  updateCustomer(customer: Customer): Observable<Customer>{
    const url = this.baseUrl + '/users/' +customer.id;
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const body = 'name=' + customer.name +
                  '&job' + customer.job;

    return this.http.put<Customer>(url, body, {headers:header});
  }
}
