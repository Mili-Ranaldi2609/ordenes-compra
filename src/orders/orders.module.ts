import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderSchema } from './orders.schema';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, KafkaService]
})
export class OrdersModule { }
