
const userCollection = require('../services/user-service');

module.exports = (socket) => {
    socket.on('register-user', (userDetails) => {

        userCollection
        .create(userDetails)
        .then((response) => {
            socket.emit('user-registered', {
                success: true,
                data: response
            });
        })
        .catch((err) => {
            socket.emit('user-registered', {
                success: false,
                data: err
            });
        });
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