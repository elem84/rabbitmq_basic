var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err1, connection) {

    if (err1)
    {
        return console.error(err1);
    }

    console.info('Connected');

    connection.createChannel(function(err2, channel) {

        if (err2)
        {
            throw err2;
        }

        console.info('Channel created');

        var queue = 'q_1';
        var msg = JSON.stringify({
            'text': 'Hello world'
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
});