import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@/orders/entities/order.entity';
import { OrdersController } from '@/orders/orders.controller';
import { OrdersService } from '@/orders/orders.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    exports: [OrdersService],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
