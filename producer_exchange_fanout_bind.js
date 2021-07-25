var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {

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
        var queue1 = 'fanout_q1_app';
        var queue2 = 'fanout_q2_app';
        var msg = JSON.stringify({
            'text': 'Hello world'
        });

        // tworzy centralę wiadomości
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        channel.assertQueue(queue1, {durable: true}, function(err2) {

            if (err2)
            {
                throw err2;
            }

            channel.bindQueue(queue1, exchange);

            channel.assertQueue(queue2, {durable: true}, function(err3) {

                if (err3)
                {
                    throw err3;
                }

                channel.bindQueue(queue2, exchange);

                channel.publish(exchange, '', Buffer.from(msg));

                console.log("[x] Sent %s", msg);
            });
        });
    });
});