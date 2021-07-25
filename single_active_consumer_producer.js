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

        var queue = 'q_single_active_consumer_app';

        for (var i = 0; i < 10; i++)
        {
            var msg = JSON.stringify({
                'text': 'Message ' + i
            });

            console.log(" [x] Sent %s", msg);

            channel.sendToQueue(queue, Buffer.from(msg));
        }

        console.info('OK');
    });
});