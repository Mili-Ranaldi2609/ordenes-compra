import { Injectable, OnModuleInit } from '@nestjs/common';
import { EachMessagePayload, Kafka } from 'kafkajs';
// Servicio de Kafka que actúa como productor y consumidor
// Publica eventos en el tópico 'ordenes_creadas' y los escucha
@Injectable()
export class KafkaService implements OnModuleInit {
    private kafka = new Kafka({
        clientId: 'ordenes-app',
        brokers: ['localhost:9092'],
    });

    private producer = this.kafka.producer();
    private consumer = this.kafka.consumer({ groupId: 'ordenes-group' });
    // Conexión e inicialización del productor y consumidor
    async onModuleInit() {
        await this.producer.connect();
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'ordenes_creadas', fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                console.log(`Mensaje recibido en Kafka [${topic}]:`);
                console.log(message.value?.toString());
            },
        });
    }

    // Publica un mensaje en un tópico Kafka específico
    async publish(topic: string, message: any) {
        await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
    }
}
