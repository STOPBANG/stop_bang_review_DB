const amqp = require('amqplib');
const reviewModel = require('./models/reviewModel.js');

module.exports = {
    receiveConnection: async () => {
        amqp.connect(process.env.RABBIT).then(connection => {
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