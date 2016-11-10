import {NodeWSServer} from './server/node-ws-server';

export class Server {
    private _server:NodeWSServer;
    constructor() {
        console.log('SERVER CREATED');
    }

    public init(nwServer:NodeWSServer) {
        console.log('INIT');
        this._server = nwServer;
    }
}

let server = new Server();

server.init( new NodeWSServer());

