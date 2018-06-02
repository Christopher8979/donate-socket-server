const postCollection = require('../services/post-service');

// userCollection.insert(userDetails, (err, response) => {
//     if (err) {
//         socket.emit('user-registered', {
//             success: false,
//             data: err
//         });
//     } else {
//         socket.emit('user-registered', {
//             success: true,
//             data: response
//         });
//     }
// });


module.exports = (socket) => {

    socket.on('create-post', (postDetails) => {

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

    socket.on('search-one-post', (postID) => {

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

    socket.on('filter-search', (filter) => {
        postCollection
        .cumulativeFilter(filter)
        .then((response) => {
            console.log(response);
            socket.emit('post-results-fetched', {
                success: true,
                data: response
            });
        })
        .catch((err) => {
            socket.emit('post-results-fetched', {
                success: false,
                data: err
            });
        });
    });

};