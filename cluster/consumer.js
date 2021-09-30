let amqp = require('amqp-connection-manager');
let q = 'tasks_app';

let main = async () => {

    var connection = amqp.connect([
        'amqp://localhost:5673',
        'amqp://localhost:5674',
        'amqp://localhost:5675',
    ]);

    var channelWrapper = connection.createChannel({
        json: true,
        setup: function(channel) {
            return channel.assertQueue(q, { durable: true });
        }
    });

    channelWrapper.addSetup(function(channel) {
        return Promise.all([
            channel.consume(q, (msg) => {
                console.log(msg.content.toString())
            }, {noAck: true , exclusive: false })
        ])
    });
}

main()