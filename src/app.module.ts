import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //as string asegura que la url que se esta pasando es un string
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    OrdersModule,

  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class AppModule { }
