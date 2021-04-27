var amqp = require('amqplib/callback_api');

amqp.connect('amqp://app_full:app_full@localhost/app_1', function(err1, connection) {

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

        channel.consume('q_single_active_consumer_app', function(msg) {

            setTimeout(function () {
                console.log(msg.content.toString());
                channel.ack(msg);
            }, 1000);
        });

        console.info('OK');
    });
});