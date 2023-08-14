import {
    Test,
    TestingModule,
} from '@nestjs/testing';
import { ItemPricesController } from './item-prices.controller';
import { ItemPricesService } from './item-prices.service';

describe('ItemPricesController', () => {
    let controller: ItemPricesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemPricesController],
            providers: [ItemPricesService],
        }).compile();

        controller = module.get<ItemPricesController>(ItemPricesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
