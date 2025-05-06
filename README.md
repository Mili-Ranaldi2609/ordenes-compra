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

    ```bash
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
-  Respuesta esperada:
    <pre> { "_id": "6654f2347e4c1a...", "id_usuario": "usuario3442", "items": [ { "id_producto": "prod3", "cantidad": 3, "precio_unitario": 670, "_id": "..." } ], "total": 2010, "fecha_creacion": "2025-05-06T16:22:29.275Z", "__v": 0 } </pre>
🔹 Obtener todas las órdenes
- GET /orders

- Query Params:

      page (opcional) – número de página (default: 1)
      limit (opcional) – límite por página (default: 10)
      id_usuario (opcional) – filtra por usuario

- Ejemplo:



