import {Server} from 'ws';
import * as WebSocket from 'ws';
import {FireBaseAdapter} from './firebase-adapter';
import {NodeWebSocket} from './node-ws-websocket';



export class NodeWSServer {
    private wssServer:Server;
    private sockets:Array<NodeWebSocket> = [];

    constructor(
        private port:number,
        private dbAdaptor:FireBaseAdapter
    ) {
        console.log('NEW WS SERVER');
        this.wssServer = new Server({
            port : this.port
        });

        console.log(`RUNNING ON ${this.port}`);
        this.init();
    }

    private init() {
        this.wssServer.on('connection', (ws:WebSocket) => { this.onConnection(ws) });
    }

    private onConnection(ws:WebSocket):void {
        let wsSocket = new NodeWebSocket(ws, this);
        this.sockets.push(wsSocket);
    }

    public closeConnection(ws:NodeWebSocket):void {
        this.sockets.splice(this.sockets.indexOf(ws), 1);
    }

    public listenTo(nodeType:string, cb:Function) {
        this.dbAdaptor.listenTo(nodeType, cb);
    }
}

