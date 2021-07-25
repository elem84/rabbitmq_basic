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

        var exchange = 'headers_ex_app';
        var queueError = 'headers_log_error_app';
        var queueInfo = 'headers_log_info_app';
        var queueAll = 'headers_log_all_app';
        var msg = JSON.stringify({
            'id': '145'
        });

        channel.assertExchange(exchange, 'headers', {
            durable: true
        });

        channel.assertQueue(queueError, {durable: true}, function(err2) {

            if (err2)
            {
                throw err2;
            }

            channel.bindQueue(queueError, exchange, '', {
                'log_error': '1'
            });

            channel.assertQueue(queueInfo, {durable: true}, function(err2) {

                if (err2)
                {
                    throw err2;
                }

                channel.bindQueue(queueInfo, exchange, '', {
                    'log_info': '1'
                });

                channel.assertQueue(queueAll, {durable: true}, function(err2) {

                    if (err2)
                    {
                        throw err2;
                    }

                    channel.bindQueue(queueAll, exchange, '', {
                        'log_info': '1',
                        'log_error': '1'
                    });

                    channel.publish(exchange, '', Buffer.from(msg), {
                        'headers': {
                            'log_error': '1'
                        }
                    });

                    console.log("[x] Sent %s", msg);
                });
            });
        });
    });
});