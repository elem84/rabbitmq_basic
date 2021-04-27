var amqp = require('amqplib/callback_api');

amqp.connect('amqp://app_full:app_full@localhost/app_1', function(error0, connection) {

    if (error0)
    {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {

        if (error1)
        {
            throw error1;
        }

        var exchange = 'fanout_ex_app';
        var msg = JSON.stringify({
            'text': 'Hello world'
        });

        // tworzy centralę wiadomości
        // channel.assertExchange(exchange, 'fanout', {
        //     durable: false
        // });

        channel.publish(exchange, '', Buffer.from(msg));

        console.log("[x] Sent %s", msg);
    });
});