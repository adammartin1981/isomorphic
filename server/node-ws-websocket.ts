import {NodeWSServer} from './node-ws-server';
import * as WebSocket from 'ws';
import {Message, MessageEnum} from '../common/message';

export class NodeWebSocket {
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


        let _msg:Message = Message.createMessageFromJSON(msg);

        console.log(_msg);

        if ( _msg.type === MessageEnum.listenTo ) {
            this.listenTo(_msg.payload);
        }

        // this.ws.send('RECEIVED:' + _msg.payload);



    }

    private onClose(code, message) {
        console.log('CLOSE - NEED TO TIDY UP');
        this.wss.closeConnection(this);
    }

    private listenTo(nodeType:string):void {
        console.log('ABOUT TO LISTEN TO', nodeType);
        // Return unsub method
        this.wss.listenTo(nodeType, (val) => {
            console.log('FROM THE WEBSOCKET', val);
            this.ws.send('FROM THE WEBSOCKET: ' +  JSON.stringify(val));
        })
    }
}