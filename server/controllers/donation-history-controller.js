
const donationHistoryCollection = require('../services/donation-history-service');

module.exports = (socket) => {

    socket.on('create-donation', (donationDetails) => {

        donationHistoryCollection
        .create(donationDetails)
        .then((response) => {
            socket.emit('new-donation-added', {
                success: true,
                data: response
            });
        })
        .catch((err) => {
            socket.emit('new-donation-added', {
                success: false,
                data: err
            });
        });
    });

    socket.on('update-comment', (commentDetails) => {

        donationHistoryCollection
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
        donationHistoryCollection
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