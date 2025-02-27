import { FrequencyService } from './frequency.service';
import { FrequencyStats } from './frequency.entity';
export declare class FrequencyController {
    private readonly frequencyService;
    constructor(frequencyService: FrequencyService);
    getPurchaseFrequency(from?: string, to?: string): Promise<FrequencyStats[]>;
}
