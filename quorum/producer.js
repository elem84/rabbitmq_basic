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

amqp.connect('amqp://localhost', function(err1, connection) {

    if (err1){
        return console.error(err1);
    }

    console.info('Connected');

    connection.createConfirmChannel(function(err2, channel) {

        if (err2){
            throw err2;
        }

        console.info('Channel created');

        var queue = 'quorum_q1';

        var msg = JSON.stringify({
            'text': 'Message 1'
        });

        console.log(" [x] Sent %s", msg);

        channel.sendToQueue(queue, Buffer.from(msg), {}, errorCallback(msg));

        channel.waitForConfirms(function(err3) {

            if (err3) {
                return console.log('Not confirm all message');
            }

            console.log('All messages confirm');
        });
    });
});