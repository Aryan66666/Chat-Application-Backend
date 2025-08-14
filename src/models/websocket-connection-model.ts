import {Schema, model,Types } from 'mongoose';
import User from './user-model';
const connectionSchema= new Schema({
    userId: {type:Types.ObjectId, required:true, ref: User},
    connectionId: {type:String, required:true,unique:true}
})
const WebSocketConnection = model('websocket-connection',connectionSchema);
export default WebSocketConnection;
