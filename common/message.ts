export enum MessageEnum {
    listenTo,
    listenOnce
}

export interface IMessage {
    type : MessageEnum;
    payload : string;
}

export class Message implements IMessage {
    public type:MessageEnum;
    public payload:string = '';
    constructor( _type:MessageEnum, _payload: string) {
        this.type = _type;
        this.payload = _payload;
    }

    public static createMessageFromJSON(jsonMessage:string):Message {
        let parsed:Message = JSON.parse(jsonMessage);

        let validType:boolean;
        switch (parsed.type) {
            case MessageEnum.listenTo:
            case MessageEnum.listenOnce:
                validType = true;
                break;
            default:
                validType = false;
        }

        if ( validType && typeof parsed.payload === 'string' ) {
            return new Message(parsed.type, parsed.payload);
        }

        return null;
    }
}