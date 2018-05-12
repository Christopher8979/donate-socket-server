
const userCollection = require('../services/user-service');

module.exports = (socket) => {
    socket.on('register-user', (userDetails) => {

        userCollection
        .create(userDetails)
        .then((response) => {
            socket.emit('user-redistered', {
                success: true,
                response: response
            });
        })
        .catch((err) => {
            socket.emit('user-redistered', {
                success: false,
                response: err
            });
        });
    });

    socket.on('login-attempt', (userDetails) => {

        userCollection.findWithDetails(userDetails)
        .then((response) => {
            socket.emit('login-attempt-response', {
                success: true,
                response: response
            });
        })
        .catch((err) => {
            socket.emit('login-attempt-response', {
                success: false,
                response: err
            });
        });
    });
};