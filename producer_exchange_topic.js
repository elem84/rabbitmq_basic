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

        var exchange = 'topic_ex_app';
        var queueInfo = 'topic_info_app';
        var queueError = 'topic_error_app';
        var queueAll = 'topic_all_app';
        var msg = JSON.stringify({
            'id': '145'
        });

        channel.assertExchange(exchange, 'topic', {
            durable: true
        });

        channel.assertQueue(queueInfo, {durable: true}, function(err2) {

            if (err2)
            {
                throw err2;
            }

            channel.bindQueue(queueInfo, exchange, 'info.*');

            channel.assertQueue(queueError, {durable: true}, function(err2) {

                if (err2)
                {
                    throw err2;
                }

                channel.bindQueue(queueError, exchange, 'error.*');

                channel.assertQueue(queueAll, {durable: true}, function(err2) {

                    if (err2)
                    {
                        throw err2;
                    }

                    channel.bindQueue(queueAll, exchange, '*.log');

                    console.log("Ready");

                    // channel.publish(exchange, 'info.log', Buffer.from(msg));
                    // console.log("[x] Sent %s", msg);
                });
            });
        });
    });
});