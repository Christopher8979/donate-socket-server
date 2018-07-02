const donationCollection = require('../services/donation-service');


module.exports = (socket) => {

    socket.on('create-donation', (donationDetails) => {
        if (donationDetails && (!donationDetails.quantityOffered || !donationDetails.scheduledOn || !donationDetails.post || !donationDetails.donationBy)) {
            return socket.emit('new-donation-added', {
                success: false,
                data: {
                    "message": 'Required fields not present. Check your payload'
                }
            });
        }

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
        if (!PostID) {
            return socket.emit('donations-fetched', {
                success: false,
                data: {
                    "message": 'Send Post ID to fetch all donations'
                }
            });
        }

        donationCollection.fetchPostDonations(PostID, (err, response) => {
            if (err) {
                socket.emit('donations-fetched', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('donations-fetched', {
                    success: true,
                    data: response
                });
            }
        });
    });

};