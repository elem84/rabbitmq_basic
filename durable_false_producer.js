var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err1, connection) {

    if (err1) {
        return console.error(err1);
    }

    console.info('Connected');

    connection.createChannel(function (err2, channel) {

        if (err2) {
            throw err2;
        }

        console.info('Channel created');

        var queue = 'q_durable_fale_app';
        var msg = JSON.stringify({
            'text': 'Czy wiadomość przetrwa restart serwera ??'
        });

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));

        console.log("OK");
    });
});