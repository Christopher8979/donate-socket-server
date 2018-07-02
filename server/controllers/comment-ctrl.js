const commentCollection = require('../services/comment-service');


module.exports = (socket) => {

    socket.on('create-comment', (commentDetails) => {
        if (commentDetails && (!commentDetails.description || !commentDetails.postedBy || !commentDetails.post)) {
            return socket.emit('new-comment-added', {
                success: false,
                data: {
                    "message": 'Required fields not present. Check your payload'
                }
            });
        }
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

        if (commentDetails && (!commentDetails.description || !commentDetails._id)) {
            return socket.emit('comment-updated', {
                success: false,
                data: {
                    "message": 'Required fields not present. Check your payload'
                }
            });
        }

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

        if (commentDetails && (!commentDetails.postID || !commentDetails.id)) {
            return socket.emit('comment-delete', {
                success: false,
                data: {
                    "message": 'Required fields not present. Check your payload'
                }
            });
        }

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
        if (!PostID) {
            return socket.emit('comments-fetched', {
                success: false,
                data: {
                    "message": 'Send Post ID to fetch all comments'
                }
            });
        }
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