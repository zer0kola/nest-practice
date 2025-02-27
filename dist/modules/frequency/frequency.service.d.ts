import { FrequencyStats } from './frequency.entity';
export declare class FrequencyService {
    private readonly dataPath;
    private readonly priceRanges;
    private getProducts;
    private getPurchases;
    getPurchaseFrequency(from?: string, to?: string): Promise<FrequencyStats[]>;
}
