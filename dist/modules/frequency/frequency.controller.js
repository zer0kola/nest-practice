"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrequencyController = void 0;
const common_1 = require("@nestjs/common");
const frequency_service_1 = require("./frequency.service");
let FrequencyController = class FrequencyController {
    constructor(frequencyService) {
        this.frequencyService = frequencyService;
    }
    async getPurchaseFrequency(from, to) {
        if ((from && !to) || (!from && to)) {
            throw new common_1.BadRequestException('Both from and to must be provided');
        }
        if (from && to) {
            if (isNaN(Date.parse(from)) || isNaN(Date.parse(to))) {
                throw new common_1.BadRequestException('Invalid date format. Dates must be in ISO 8601 format');
            }
            const fromDate = new Date(from);
            const toDate = new Date(to);
            if (fromDate > toDate) {
                throw new common_1.BadRequestException('From date must be before to date');
            }
        }
        return this.frequencyService.getPurchaseFrequency(from, to);
    }
};
exports.FrequencyController = FrequencyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FrequencyController.prototype, "getPurchaseFrequency", null);
exports.FrequencyController = FrequencyController = __decorate([
    (0, common_1.Controller)('api/purchase-frequency'),
    __metadata("design:paramtypes", [frequency_service_1.FrequencyService])
], FrequencyController);
//# sourceMappingURL=frequency.controller.js.map