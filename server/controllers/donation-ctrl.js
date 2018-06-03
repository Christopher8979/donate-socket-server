const donationCollection = require('../services/donation-service');


module.exports = (socket) => {

    socket.on('create-donation', (donationDetails) => {

        donationCollection.insert(donationDetails, (err, response) => {
            if (err) {
                socket.emit('new-donation-added', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('new-donation-added', {
                    success: true,
                    data: response
                });
            }
        });
    });

    socket.on('fetch-all-donations', (PostID) => {
        donationCollection.fetchPostDonations(PostID, (err, response) => {
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