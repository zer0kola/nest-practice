"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrequencyService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let FrequencyService = class FrequencyService {
    constructor() {
        this.dataPath = (0, path_1.join)(__dirname, '..', '..', '..', 'src', 'data');
        this.priceRanges = [
            { min: 0, max: 20000 },
            { min: 20001, max: 30000 },
            { min: 30001, max: 40000 },
            { min: 40001, max: 50000 },
            { min: 50001, max: 60000 },
            { min: 60001, max: 70000 },
            { min: 70001, max: 80000 },
            { min: 80001, max: 90000 },
            { min: 90001, max: 100000 },
        ];
    }
    getProducts() {
        return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(this.dataPath, 'products.json'), 'utf-8'));
    }
    getPurchases() {
        return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(this.dataPath, 'purchases.json'), 'utf-8'));
    }
    async getPurchaseFrequency(from, to) {
        const purchases = this.getPurchases();
        const products = this.getProducts();
        const frequency = this.priceRanges.map((range) => ({
            range: `${range.min} - ${range.max}`,
            count: 0,
        }));
        purchases
            .filter((purchase) => {
            if (!from || !to)
                return true;
            const purchaseDate = new Date(purchase.date);
            const fromDate = new Date(from);
            const toDate = new Date(to);
            return purchaseDate >= fromDate && purchaseDate <= toDate;
        })
            .forEach((purchase) => {
            const product = products.find((p) => p.id === purchase.productId);
            if (product) {
                const productPrice = product.price;
                const range = this.priceRanges.find((r) => productPrice >= r.min && productPrice <= r.max);
                if (range) {
                    const rangeIndex = this.priceRanges.indexOf(range);
                    frequency[rangeIndex].count += purchase.quantity;
                }
            }
        });
        return frequency;
    }
};
exports.FrequencyService = FrequencyService;
exports.FrequencyService = FrequencyService = __decorate([
    (0, common_1.Injectable)()
], FrequencyService);
//# sourceMappingURL=frequency.service.js.map