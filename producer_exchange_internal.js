var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err0, connection) {

    if (err0) {
        throw err0;
    }

    connection.createChannel(function(err1, channel) {

        if (err1) {
            throw err1;
        }

        var exchange = 'internal_ex_app';
        var msg = JSON.stringify({
            'id': '145'
        });

        channel.assertExchange(exchange, 'fanout', {
            internal: true
        });

        channel.assertQueue('tmp_app', {durable: true}, function(err2) {

            if (err2) {
                throw err2;
            }

            channel.bindQueue('tmp_app', exchange, 'test');

            channel.publish(exchange, 'test', Buffer.from(msg));

            console.log("[x] Sent %s", msg);
        });
    });
});