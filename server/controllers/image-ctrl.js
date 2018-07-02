const ImageCollection = require('../services/image-service');

module.exports = (socket) => {

    socket.on('delete-image-reference', (imageID) => {

        if (!imageID) {
            socket.emit('image-reference-deleted', {
                success: false,
                data: {
                    "message": 'Send Post ID to fetch all donations'
                }
            });
        }

        ImageCollection.delete(imageID, (err, response) => {
            if (err) {
                socket.emit('image-reference-deleted', {
                    success: false,
                    data: err
                });
            } else {
                socket.emit('image-reference-deleted', {
                    success: true,
                    data: response
                });
            }
        });
    });
};