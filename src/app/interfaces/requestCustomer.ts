import { Customer } from "./customer";

export interface RequestCustomer {
    data: Customer,
    suport: {text: string, url: string}
}