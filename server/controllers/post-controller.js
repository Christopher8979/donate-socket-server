
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

    socket.on('update-post', (postDetails) => {

        postCollection
        .fetchAndUpdate(postDetails)
        .then((response) => {
            socket.emit('post-updated', {
                success: true,
                data: response
            });
        })
        .catch((err) => {
            socket.emit('post-updated', {
                success: false,
                data: err
            });
        });
    });

    socket.on('fetch-latest-posts', () => {
        postCollection
        .getLimitedResults()
        .then((response) => {
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

    socket.on('search-post', (filterData) => {
        postCollection
        .getLimitedResults()
        .then((response) => {
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