"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let CustomerService = class CustomerService {
    constructor() {
        this.dataPath = (0, path_1.join)(__dirname, '..', '..', '..', 'src', 'data');
    }
    getCustomers() {
        return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(this.dataPath, 'customers.json'), 'utf-8'));
    }
    getProducts() {
        return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(this.dataPath, 'products.json'), 'utf-8'));
    }
    getPurchases() {
        return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(this.dataPath, 'purchases.json'), 'utf-8'));
    }
    async findAll(sortBy, name) {
        const purchases = this.getPurchases();
        const customers = this.getCustomers();
        const products = this.getProducts();
        const customerStats = {};
        purchases.forEach((purchase) => {
            if (!customerStats[purchase.customerId]) {
                customerStats[purchase.customerId] = { count: 0, totalAmount: 0 };
            }
            const product = products.find((p) => p.id === purchase.productId);
            if (product) {
                customerStats[purchase.customerId].count += purchase.quantity;
                customerStats[purchase.customerId].totalAmount +=
                    purchase.quantity * product.price;
            }
        });
        let topCustomers = Object.keys(customerStats).map((id) => {
            const customer = customers.find((c) => c.id === Number(id));
            return {
                id: Number(id),
                name: customer ? customer.name : 'Unknown',
                ...customerStats[Number(id)],
            };
        });
        if (name) {
            topCustomers = topCustomers.filter((customer) => customer.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (sortBy) {
            topCustomers.sort((a, b) => {
                const comparison = b.totalAmount - a.totalAmount;
                return sortBy === 'asc' ? -comparison : comparison;
            });
        }
        else {
            topCustomers.sort((a, b) => a.id - b.id);
        }
        return topCustomers;
    }
    async findPurchasesByCustomerId(customerId) {
        const customers = this.getCustomers();
        const customerExists = customers.some((customer) => customer.id === customerId);
        if (!customerExists) {
            throw new Error('Customer not found');
        }
        const purchases = this.getPurchases();
        const products = this.getProducts();
        const customerPurchases = purchases.filter((purchase) => purchase.customerId === customerId);
        return customerPurchases.map((purchase) => {
            const product = products.find((p) => p.id === purchase.productId);
            return {
                date: purchase.date,
                quantity: purchase.quantity,
                product: product ? product.name : 'Unknown',
                price: product ? product.price * purchase.quantity : 0,
                imgSrc: product ? product.imgSrc : '',
            };
        });
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)()
], CustomerService);
//# sourceMappingURL=customer.service.js.map