
const postCollection = require('../services/post-service');

module.exports = (socket) => {

    socket.on('create-post', (postDetails) => {

        postCollection
        .create(postDetails)
        .then((response) => {
            socket.emit('new-post-done', {
                success: true,
                data: response
            });
        })
        .catch((err) => {
            socket.emit('new-post-done', {
                success: false,
                data: err
            });
        });
    });

    socket.on('login-attempt', (userDetails) => {

        postCollection.findWithDetails(userDetails)
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