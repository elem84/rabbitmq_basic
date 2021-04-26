var amqp = require('amqplib/callback_api');

function errorCallback(msg) {

    return function(err) {

        if (err)
        {
            return console.log('Message: ' + msg + ' - NOT confirm');
        }

        console.log(msg + ' - confirm');
    };
}

amqp.connect('amqp://app_full:app_full@localhost/app_1', function(err1, connection) {

    if (err1)
    {
        return console.error(err1);
    }

    console.info('Connected');

    connection.createConfirmChannel(function(err2, channel) {

        if (err2)
        {
            throw err2;
        }

        console.info('Channel created');

        var queue = 'q_1';

        for (var i = 0; i < 10; i++)
        {
            var msg = JSON.stringify({
                'text': 'Message ' + i
            });

            console.log(" [x] Sent %s", msg);

            channel.sendToQueue(queue, Buffer.from(msg), {}, errorCallback(msg));
        }

        channel.waitForConfirms(function(err) {

            if (err)
            {
                return console.log('Not confirm all message');
            }

            console.log('All messages confirm');
        });
    });
});