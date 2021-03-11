import { Customer } from "./customer";

export interface RequestApi {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: Customer[]
}
