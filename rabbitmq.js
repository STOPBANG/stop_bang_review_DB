const amqp = require('amqplib');
const reviewModel = require('./models/reviewModel.js');

if (!process.env.RABBITMQ_HOST) {
    throw new Error("Please specify the name of the RabbitMQ host using environment variable RABBIT");
}

module.exports = {
    receiveConnection: async () => {
        amqp.connect({
            protocol: 'amqp',
            hostname: process.env.RABBITMQ_HOST,
            username: process.env.RABBITMQ_ID,
            password: process.env.RABBITMQ_PASSWORD,
            port: process.env.RABBITMQ_PORT,
        }).then(connection => {
        connection.createChannel().then(messageChannel => {
            const queue = 'reviewQueue';

            messageChannel.assertQueue(queue, {}).then(()=>{
                messageChannel.consume(queue, consumeMessage);            
            })

            function consumeMessage(msg) {
                console.log("Consume 'review' Queue message");

                const parsedMsg = JSON.parse(msg.content);

                reviewModel.create(parsedMsg).then(()=>{
                    console.log("Acknowledging message was handled in review-api.");
                    messageChannel.ack(msg);
                })
            }
        })
    });
    }
}