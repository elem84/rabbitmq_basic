var amqp = require('amqplib/callback_api');

amqp.connect('amqp://app_full:app_full@localhost/app_1', function(err1, connection) {

    if (err1) {
        return console.error(err1);
    }

    console.info('Connected');

    connection.createChannel(function (err2, channel) {

        if (err2) {
            throw err2;
        }

        console.info('Channel created');

        var queue = 'q_ttl_app';
        var msg = JSON.stringify({
            'text': 'TTL 15s.'
        });

        channel.assertQueue(queue, {
            messageTtl: 15000
        });

        channel.sendToQueue(queue, Buffer.from(msg));

        console.log("OK");
    });
});