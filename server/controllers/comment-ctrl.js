const commentCollection = require('../services/comment-service');


module.exports = (socket) => {

    socket.on('create-comment', (commentDetails) => {

        commentCollection.insert(commentDetails, (err, response) => {
            if (err) {
                socket.emit('new-comment-added', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('new-comment-added', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('update-comment', (commentDetails) => {

        commentCollection.update(commentDetails, (err, response) => {
            if (err) {
                socket.emit('comment-updated', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('comment-updated', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('delete-comment', (commentDetails) => {

        commentCollection.delete(commentDetails, (err, response) => {
            if (err) {
                socket.emit('comment-delete', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('comment-delete', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('fetch-all-comments', (PostID) => {
        commentCollection.fetchPostComments(PostID, (err, response) => {
            if (err) {
                socket.emit('comments-fetched', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('comments-fetched', {
                    success: true,
                    data: response
                });
            }
        });
    });

};