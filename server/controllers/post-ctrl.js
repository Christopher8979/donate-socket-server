const postCollection = require('../services/post-service');

module.exports = (socket) => {

    socket.on('create-post', (postDetails) => {

        if (postDetails && (
            !postDetails.description ||
            !postDetails.quantityRequired ||
            !postDetails.ageOfProduct ||
            !postDetails.category ||
            !postDetails.postedBy ||
            !postDetails.title
        )) {
            return socket.emit('new-post-done', {
                success: false,
                data: {
                    "message": 'Required fields not present. Check your payload'
                }
            });
        }

        postCollection.insert(postDetails, (err, response) => {
            if (err) {
                socket.emit('new-post-done', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('new-post-done', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('update-post', (postDetails) => {

        if (postDetails && (
            !postDetails._id
        )) {
            return socket.emit('post-updated', {
                success: false,
                data: {
                    "message": 'Required fields not present. Check your payload'
                }
            });
        }

        postCollection.update(postDetails, (err, response) => {
            if (err) {
                socket.emit('post-updated', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('post-updated', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('fetch-all-posts', () => {

        postCollection.getAll((err, response) => {
            if (err) {
                socket.emit('post-results-fetcheded', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('post-results-fetched', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('search-one-post', (postID) => {

        if (!postID) {
            return socket.emit('post-in-detail', {
                success: false,
                data: {
                    "message": 'Send Post ID get post in detail'
                }
            });
        }

        postCollection.get(postID, (err, response) => {
            if (err) {
                socket.emit('post-in-detail', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('post-in-detail', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('fetch-latest-posts', () => {

        postCollection.getLimitedResults((err, response) => {
            if (err) {
                socket.emit('feed-fetched', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('feed-fetched', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('filter-search', (filter) => {

        postCollection.cumulativeFilter(filter, (err, response) => {
            if (err) {
                socket.emit('post-results-fetched', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('post-results-fetched', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('my-posts', (userID) => {

        if (!userID) {
            return socket.emit('post-results-fetched', {
                success: false,
                data: {
                    "message": 'Send User ID get user related post'
                }
            });
        }

        postCollection.userPosts(userID, (err, response) => {
            if (err) {
                socket.emit('post-results-fetched', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('post-results-fetched', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('delete-post', (postID) => {
        if (!postID) {
            return socket.emit('post-deleted', {
                success: false,
                data: {
                    "message": 'Send Post ID to delete the post'
                }
            });
        }
        postCollection.delete(postID, (err, response) => {
            if (err) {
                socket.emit('post-deleted', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('post-deleted', {
                    success: true,
                    data: response
                });
            }
        })
    });

};