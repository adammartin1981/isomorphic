// import * as admin from 'firebase-admin';
var admin = require("firebase-admin");
import {SERVICE_ACCOUNT} from '../node-firebase-adminkey';
// import * as firebase from 'firebase';
// import Database firebase.database.Database;

export class FireBaseAdapter {

    private db:any;

    constructor() {
        console.log('FIREBASE ADAPTER ENABLED');

        admin.initializeApp({
            credential:admin.credential.cert(SERVICE_ACCOUNT),
            databaseURL : 'https://node-firebase-697eb.firebaseio.com'
        });

        this.init();
    }

    private init() {
        this.db = admin.database();

        var ref = this.db.ref('values');

        // ref.subscribe((data) => {
        //     console.log('DATA', data);
        // })
        ref.on('value', function(snapshot) {
            console.log('VALUE', snapshot.val());
        });
        // ref.once("value", function(snapshot) {
        //     console.log('VALUE', snapshot.val());
        // });
    }


    public listenTo(path:string, cb:Function):void {
        let ref = this.db.ref(path);

        ref.on('value', (snapshot) => {
            cb(snapshot.val());
        });
    }
}