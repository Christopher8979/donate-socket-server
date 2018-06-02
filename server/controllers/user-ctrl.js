const userCollection = require('../services/user-service');

module.exports = (socket) => {
    socket.on('register-user', (userDetails) => {

        userCollection.insert(userDetails, (err, response) => {

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
        });
    });

    socket.on('login-attempt', (userDetails) => {

        userCollection.login(userDetails, (err, response) => {

            if (err) {
                socket.emit('login-attempt-response', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('login-attempt-response', {
                    success: true,
                    data: response
                });
            }
        });
    });
};