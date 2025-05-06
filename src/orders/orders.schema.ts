import { Schema } from 'mongoose';
// Esquema de Mongoose para la entidad Orden
// Incluye campos: id_usuario, items[], fecha_creacion y totalF
export const OrderSchema = new Schema({
  id_usuario: { type: String, required: true },
  items: [{
    id_producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precio_unitario: { type: Number, required: true }
  }],
  fecha_creacion: { type: Date, default: Date.now },
  total: { type: Number, required: true },
});
