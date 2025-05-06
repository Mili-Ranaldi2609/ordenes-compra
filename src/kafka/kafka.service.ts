import { Injectable, OnModuleInit } from '@nestjs/common';
import { EachMessagePayload, Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
    private kafka = new Kafka({
        clientId: 'ordenes-app',
        brokers: ['localhost:9092'],
    });

    private producer = this.kafka.producer();
    private consumer = this.kafka.consumer({ groupId: 'ordenes-group' });
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

    async publish(topic: string, message: any) {
        await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
    }
}
