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

const userCtrl  = require('./controllers/user-ctrl');
const postCtrl  = require('./controllers/post-ctrl');
const commentCtrl  = require('./controllers/comment-ctrl');

const userDisconnected = () => {
    console.log("user Disconnected");
};

const onUserConnected = socket => {
    userCtrl(socket);
    postCtrl(socket);
    commentCtrl(socket);


    socket.on('disconnect', userDisconnected);

};


const server = new Server;

module.exports = server;