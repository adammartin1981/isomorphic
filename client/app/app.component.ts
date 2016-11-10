import {Component} from '@angular/core';
import {Observable, Subject, ReplaySubject} from 'rxjs';
import {MessageEnum, Message} from '../../common/message';
// import * as WebSocket from 'ws';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title: string = 'app works!';

    public user$:Observable<Array<string>>;
    public message$:ReplaySubject<any>;

    private ws:WebSocket;

    constructor() {
        this.user$ = Observable.of([
            'User 1', 'User 2'
        ]);

        this.message$ = new ReplaySubject<any>();

        console.log('CREATING WEBSOCKET');

        this.ws = new WebSocket('ws://localhost:8180');
        this.ws.addEventListener('message', (msg) => {
            console.log('ISOMORPHISM HERE WE COME: ', msg);
            this.message$.next(msg.data);
        });

    }

    public register(type:string):void {
        let message:Message = new Message(MessageEnum.listenTo, type);

        let stringMessage:string = JSON.stringify(message);

        this.ws.send(stringMessage);
        // this.ws.send('TESTING 2');
    }
}
