export interface Order extends Document {
    id_usuario: string
    items: {
        id_producto: string
        cantidad: number
        precio_unitario: number
    }[]
    fecha_creacion: Date
    total: number
}