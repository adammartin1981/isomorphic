import {Server} from 'ws';
import * as WebSocket from 'ws';

const PORT:number = 8180;

export class NodeWSServer {
    private wssServer:Server;
    private sockets:Array<NodeWebSocket> = [];

    constructor() {
        console.log('NEW WS SERVER');
        this.wssServer = new Server({
            port : PORT
        });

        console.log(`RUNNING ON ${PORT}`);
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
}

class NodeWebSocket {
    constructor(private ws:WebSocket, private wss:NodeWSServer) {
        this.init();
    }

    private init() {
        this.ws.on('message', (msg) => {
            this.onMessage(msg)
        });

        this.ws.on('close', (code, message) => {
            this.onClose(code, message);
        });
    }

    private onMessage(msg:any) {
        console.log('MESSAGE RECEIVED', msg);
        this.ws.send('RECEIVED:' + msg);
    }

    private onClose(code, message) {
        this.wss.closeConnection(this);
    }
}