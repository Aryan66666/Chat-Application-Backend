import { Schema, model, Types } from 'mongoose';

const messageSchema = new Schema({
  chatId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Chat' 
  },
  sender: {
    type: Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  content: {
    type: String,
    required: false, 
    default: ''
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'audio', 'video', 'sticker'], 
    default: 'text',
    required: true
  },
  mediaUrl: {
    type: String,
    required: false 
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  }
}, {
  timestamps: true 
});

const Message = model('Message', messageSchema);

export default Message;
