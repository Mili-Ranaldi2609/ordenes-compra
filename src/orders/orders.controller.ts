import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.interface';


@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }
    //get all de todas las ordenes 
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
    //endpoint que llama al service de la creacion de la orden compra
    @Post()
    async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }
}
