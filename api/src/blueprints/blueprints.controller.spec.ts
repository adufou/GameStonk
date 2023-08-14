import {
    Test,
    TestingModule,
} from '@nestjs/testing';
import { BlueprintsController } from '@/blueprints/blueprints.controller';
import { BlueprintsService } from '@/blueprints/blueprints.service';

describe('BlueprintsController', () => {
    let controller: BlueprintsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BlueprintsController],
            providers: [BlueprintsService],
        }).compile();

        controller = module.get<BlueprintsController>(BlueprintsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
