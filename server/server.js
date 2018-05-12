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

const DummyController = require('./services/dummy-service.js');
const UserController = require('./controllers/user-controller.js');

const userDisconnected = () => {
    console.log("user Disconnected");
};

const onUserConnected = socket => {
    
    UserController(socket);
    
    socket.on("fetch-items", function (userDetails) {

        // User details can be captured here
        DummyController.getAll()
        .then(docs => {
            socket.emit("sending-items", docs);
        })
        .catch(err => {
            socket.emit("sending-items", null);
        });      
        
    });

    socket.on('disconnect', userDisconnected);

    socket.on('create-entry', function (details) {
        
        DummyController.create(details)
        .then((doc) => {
            socket.emit('entry-created', doc);            
        })
        .catch(err => {
            socket.emit('entry-created', null);
        });
    });

    socket.on('delete-item', function (details) {
        
        DummyController.delete(details)
        .then((doc) => {
            
            DummyController.getAll()
            .then(docs => {
                console.log(docs)
                socket.emit('entry-deleted', docs);                    
            })
            .catch(err => {
                socket.emit('entry-deleted', null);
            });  
        })
        .catch(err => {
            socket.emit('entry-deleted', null);
        });
    });
};


const server = new Server;

module.exports = server;