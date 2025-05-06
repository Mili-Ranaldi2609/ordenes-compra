import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.interface';


@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }
    // Endpoint: GET /orders
    // Lista órdenes existentes con paginación y filtro opcional
    @Get()
    async findAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('id_usuario') id_usuario?: string,
    ) {
        const p = Number(page) || 1;
        const l = Number(limit) || 10;
        return this.ordersService.findAll(p, l, id_usuario);
    }
    // Endpoint: POST /orders
    // Crea una orden de compra con los datos recibidos en el body
    @Post()
    async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }
}
