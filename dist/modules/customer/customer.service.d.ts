import { CustomerPurchaseDetail, CustomerStats } from './customer.entity';
export declare class CustomerService {
    private readonly dataPath;
    private getCustomers;
    private getProducts;
    private getPurchases;
    findAll(sortBy?: 'asc' | 'desc', name?: string): Promise<CustomerStats[]>;
    findPurchasesByCustomerId(customerId: number): Promise<CustomerPurchaseDetail[]>;
}
