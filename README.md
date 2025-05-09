# 🛒 Sistema de Gestión de Órdenes de Compra – Backend NestJS

Este proyecto es una API RESTful desarrollada con **NestJS**, **MongoDB Atlas** y **Kafka**, diseñada para gestionar órdenes de compra de forma eficiente y escalable.

---

## 🚀 Tecnologías utilizadas

- **NestJS (TypeScript)** – Framework principal del backend
- **MongoDB Atlas** – Base de datos en la nube
- **Kafka (vía Docker)** – Sistema de mensajería para eventos asincrónicos
- **KafkaJS** – Cliente para interactuar con Kafka desde Node.js
- **class-validator / class-transformer** – Validaciones DTO
- **Postman / Compass** – Para testing y visualización

---

## 📦 Instalación y ejecución

### 1. Clonar el repositorio
    git clone https://github.com/tu-usuario/ordenes-backend.git
    cd ordenes-backend
### 2. Instalar dependencias
      npm install
### 3. Crear archivo .env
      MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/ordenes_db?retryWrites=true&w=majority
### 4. Levantar Kafka (requiere Docker)
      docker-compose up -d
### 5. Iniciar la aplicación
      npm run start:dev
---

## 📮 Endpoints
🔹 Crear una orden
    - POST /orders:
                   
    {
      "id_usuario": "usuario3442",
      "items": [
    { "id_producto": "prod3", "cantidad": 3, "precio_unitario": 670 },
    { "id_producto": "prod2", "cantidad": 1, "precio_unitario": 1000 }
      ]
🔹 Respuesta esperada:
    <pre> { "_id": "6654f2347e4c1a...", 
    "id_usuario": "usuario3442", 
    "items": [ { "id_producto": "prod3", "cantidad": 3, "precio_unitario": 670, "_id": "..." } ], 
    "total": 2010, 
    "fecha_creacion": "2025-05-06T16:22:29.275Z", "__v": 0 } </pre>
🔹 Obtener todas las órdenes
    - GET /orders

🔹 Query Params:

| Parámetro   | Tipo     | Opcional | Descripción                             |
|-------------|----------|----------|-----------------------------------------|
| page        | number   | Sí       | Número de página (default: 1)           |
| limit       | number   | Sí       | Cantidad de elementos por página (10)   |
| id_usuario  | string   | Sí       | Filtrar órdenes por ID de usuario       |


🔹 Ejemplo:GET 
    
    /orders?page=1&limit=5&id_usuario=usuario3442
## 🔁 Kafka: integración de eventos
Al crear una orden, se publica automáticamente un evento en el tópico:
- ordenes_creadas
---
🔹 Mensaje publicado (ejemplo):
    <pre>{
  "_id": "...",
  "id_usuario": "usuario3442",
  "items": [...],
  "total": 3010,
  "fecha_creacion": "2025-05-06T..."}</pre>
  
🔹 Consumidor:

--- 
El sistema incluye un consumidor embebido que imprime en consola cualquier mensaje recibido en el tópico ordenes_creadas.

## 📂 Estructura del proyecto
<pre>
    /src
  /orders
    orders.controller.ts
    orders.service.ts
    orders.module.ts
    dto/
    schema/
  /kafka
    kafka.service.ts
.env
docker-compose.yml
README.md
</pre>
## ✅ Funcionalidad implementada
- Crear órdenes con validaciones
- Listado paginado con filtros
- Conexión a MongoDB Atlas
- Publicación de mensajes en Kafka
- Consumidor que escucha eventos
## 📝 Notas
- Para probar los mensajes, hay que asegurarse de tener Kafka corriendo (docker-compose up -d).
- MongoDB Compass puede ayudar a visualizar las órdenes guardadas.

