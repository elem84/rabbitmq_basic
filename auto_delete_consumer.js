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

        channel.consume('q_auto_delete', function(msg) {

            console.log(msg);
        });

        console.info('OK');
    });
});