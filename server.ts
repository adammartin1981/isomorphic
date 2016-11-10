import {NodeWSServer} from './server/node-ws-server';
import {FireBaseAdapter} from './server/firebase-adapter';

const PORT:number = 8180;

let fbAdapter = new FireBaseAdapter();

fbAdapter.listenTo('adam', (val) => {
    console.log('HEARD FROM ADAM', val);
});

new NodeWSServer(PORT, fbAdapter);

console.log('NEW SERVER STARTED');

