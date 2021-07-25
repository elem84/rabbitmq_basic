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

        var exchange = 'direct_ex_app';
        var queue1 = 'direct_epub_app';
        var queue2 = 'direct_mobi_app';
        var queue3 = 'direct_pdf_app';
        var msg = JSON.stringify({
            'id': '145'
        });

        channel.assertExchange(exchange, 'direct', {
            durable: true
        });

        channel.assertQueue(queue1, {durable: true}, function(err2) {

            if (err2)
            {
                throw err2;
            }

            channel.bindQueue(queue1, exchange, 'download_epub');

            channel.assertQueue(queue2, {durable: true}, function(err2) {

                if (err2)
                {
                    throw err2;
                }

                channel.bindQueue(queue2, exchange, 'download_mobi');

                channel.assertQueue(queue3, {durable: true}, function(err2) {

                    if (err2)
                    {
                        throw err2;
                    }

                    channel.bindQueue(queue3, exchange, 'download_pdf');

                    channel.publish(exchange, 'download_epub', Buffer.from(msg));

                    console.log("[x] Sent %s", msg);
                });
            });
        });
    });
});