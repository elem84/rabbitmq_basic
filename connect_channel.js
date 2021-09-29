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
            return console.error(err2);
        }

        console.info('Channel created');
    });

    connection.createConfirmChannel(function(err3, channel) {

        if (err3)
        {
            return console.error(err3);
        }

        console.info('Channel confirm created');
    });
});