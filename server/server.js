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

const UserController = require('./controllers/user-controller.js');
const PostController = require('./controllers/post-controller.js');

const userDisconnected = () => {
    console.log("user Disconnected");
};

const onUserConnected = socket => {
    
    UserController(socket);
    PostController(socket);

    socket.on('disconnect', userDisconnected);

};


const server = new Server;

module.exports = server;