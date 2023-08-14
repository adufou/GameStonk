import {
    Test,
    TestingModule,
} from '@nestjs/testing';
import { ItemPricesService } from './item-prices.service';

describe('ItemPricesService', () => {
    let service: ItemPricesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [ItemPricesService] }).compile();

        service = module.get<ItemPricesService>(ItemPricesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
