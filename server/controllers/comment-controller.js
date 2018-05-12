
const commentCollection = require('../services/comment-service');

module.exports = (socket) => {

    socket.on('create-comment', (commentDetails) => {

        commentCollection
        .create(commentDetails)
        .then((response) => {
            socket.emit('new-comment-added', {
                success: true,
                data: response
            });
        })
        .catch((err) => {
            socket.emit('new-comment-added', {
                success: false,
                data: err
            });
        });
    });

    socket.on('update-comment', (commentDetails) => {

        commentCollection
        .fetchAndUpdate(commentDetails)
        .then((response) => {
            socket.emit('comment-updated', {
                success: true,
                data: response
            });
        })
        .catch((err) => {
            socket.emit('comment-updated', {
                success: false,
                data: err
            });
        });
    });

    socket.on('fetch-all-comments', () => {
        commentCollection
        .getAll()
        .then((response) => {
            socket.emit('comments-fetched', {
                success: true,
                data: response
            });
        })
        .catch((err) => {
            socket.emit('comments-fetched', {
                success: false,
                data: err
            });
        });
    });

};