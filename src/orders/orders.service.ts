import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.interface';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly kafkaService: KafkaService,
  ) { }

  // Método para listar órdenes con paginación y filtro opcional por id_usuario
  async findAll(page = 1, limit = 10, id_usuario?: string): Promise<Order[]> {
    const skip = (page - 1) * limit;

    const filtro: any = {};
    if (id_usuario) {
      filtro.id_usuario = id_usuario;
    }

    return this.orderModel
      .find(filtro)
      .skip(skip)
      .limit(limit)
      .sort({ fecha_creacion: -1 })
      .exec();
  }

  // Método asincrónico para crear una nueva orden de compra
  // Calcula el total, valida que haya ítems y guarda en MongoDB
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Validación: la orden debe tener al menos un ítem
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('La orden debe contener al menos un ítem.');
    }
    // Cálculo del total: suma de (cantidad * precio_unitario)
    const total = createOrderDto.items.reduce(
      (acc, item) => acc + item.cantidad * item.precio_unitario,
      0,
    );

    const createdOrder = new this.orderModel({
      ...createOrderDto,
      total,
      fecha_creacion: new Date(),
    });

    const savedOrder = await createdOrder.save();
    //Publicar en Kafka
    await this.kafkaService.publish('ordenes_creadas', savedOrder);
    console.log('Orden publicada en Kafka:', savedOrder._id);
    return savedOrder;
  }
}
