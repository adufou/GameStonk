import { Injectable } from '@nestjs/common';
import { CreateItemPriceDto } from './dto/create-item-price.dto';
import { UpdateItemPriceDto } from './dto/update-item-price.dto';

@Injectable()
export class ItemPricesService {
    create(createItemPriceDto: CreateItemPriceDto) {
        return 'This action adds a new itemPrice';
    }

    findAll() {
        return 'This action returns all itemPrices';
    }

    findOne(id: number) {
        return `This action returns a #${ id } itemPrice`;
    }

    update(id: number, updateItemPriceDto: UpdateItemPriceDto) {
        return `This action updates a #${ id } itemPrice`;
    }

    remove(id: number) {
        return `This action removes a #${ id } itemPrice`;
    }
}
