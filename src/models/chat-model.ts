/*

Users can  talk to each other (one to one) in private chatrooms

for private one to one talks users can just message each other and the room created will have the room id of that user with the guest id of the one messaged
*/

import { model, Schema } from "mongoose";

const chatSchema = new Schema({
    roomId: {type:String, required:true, unique:true},
    members:{type:[String], required:true},
    isPrivate: {type:Boolean, required:true},
},
    {
        timestamps:true,
        versionKey:true,
    }
)

const Chat = model('chat',chatSchema)

export default Chat;