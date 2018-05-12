
const userCollection = require('../services/user-service');


module.exports = (socket) => {
    socket.on('register-user', (userDetails) => {

        userCollection
        .create(userDetails)
        .then((response) => {
            console.log(response);
            socket.emit('user-redistered', {
                success: true,
                response: response
            });
        })
        .catch((err) => {
            console.log(err);
            socket.emit('user-redistered', {
                success: true,
                response: err
            });
        });
    });

    socket.on('login-attempt', (userDetails) => {
        socket.emit('login-attempt-response', userObject)
    }); // emailID and password will be sent



};