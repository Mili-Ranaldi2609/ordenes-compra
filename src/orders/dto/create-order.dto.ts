import { IsArray, ArrayMinSize, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  //se valida  el tipo de variables que son 
  @IsString()
  id_producto: string;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precio_unitario: number;
}

export class CreateOrderDto {
  @IsString()
  id_usuario: string;
  //valida que sea un array 
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
