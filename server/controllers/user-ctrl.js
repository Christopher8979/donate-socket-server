const userCollection = require('../services/user-service');

module.exports = (socket) => {
    socket.on('register-user', (userDetails) => {
        if (userDetails && (
            !userDetails.name ||
            !userDetails.type ||
            !userDetails.password ||
            !userDetails.emailID ||
            !userDetails.mobile
        )) {
            return socket.emit('user-registered', {
                success: false,
                data: {
                    "message": 'Required fields not present. Check your payload'
                }
            });
        }

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

        if (userDetails && (
            !userDetails.password ||
            !userDetails.emailID
        )) {
            return socket.emit('login-attempt-response', {
                success: false,
                data: {
                    "message": 'Required fields not present. Check your payload'
                }
            });
        }


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