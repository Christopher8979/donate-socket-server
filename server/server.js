class Server {

    constructor() {
        this._io = null;
    }

    set io(io) {
        this._io = io;
        this.init();
    }

    get io() {
        return this._io;
    }

    init() {
        this.io.on('connection', onUserConnected);

    }

}

const userCtrl = require('./controllers/user-ctrl');
const postCtrl = require('./controllers/post-ctrl');
const imageCtrl = require('./controllers/image-ctrl');
const commentCtrl = require('./controllers/comment-ctrl');
const donationCtrl = require('./controllers/donation-ctrl');

const userDisconnected = () => {
    console.log("user Disconnected");
};

const onUserConnected = socket => {
    userCtrl(socket);
    postCtrl(socket);
    imageCtrl(socket);
    commentCtrl(socket);
    donationCtrl(socket);


    socket.on('disconnect', userDisconnected);

};


const server = new Server;

module.exports = server;