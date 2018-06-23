const ImageCollection = require('../services/image-service');

module.exports = (socket) => {

    socket.on('delete-image-reference', (imageID) => {

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