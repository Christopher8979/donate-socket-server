const userCollection = require('../services/user-service');

module.exports = (socket) => {
    socket.on('register-user', (userDetails) => {

        userCollection.insert(userDetails, (err, response) => {

            console.log('getting response');
            console.log(err, response);
            if (err) {
                socket.emit('user-registered', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('user-registered', {
                    success: true,
                    data: response
                });
            }
        })
    });

    socket.on('login-attempt', (userDetails) => {

        userCollection.findWithDetails(userDetails)
        .then((response) => {
            socket.emit('login-attempt-response', {
                success: true,
                data: response
            });
        })
        .catch((err) => {
            socket.emit('login-attempt-response', {
                success: false,
                data: err
            });
        });
    });
};