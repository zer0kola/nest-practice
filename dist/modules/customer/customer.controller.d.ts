import { CustomerService } from './customer.service';
import { CustomerPurchaseDetail, CustomerStats } from './customer.entity';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getCustomers(sortBy?: 'asc' | 'desc', name?: string): Promise<CustomerStats[]>;
    getCustomerPurchases(id: number): Promise<CustomerPurchaseDetail[]>;
}
