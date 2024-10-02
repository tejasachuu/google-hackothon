import mongoose, { Schema, Document } from 'mongoose';

// Extend the Document interface to include createdAt
interface IChatMessage extends Document {
  user: string;
  message: string;
  createdAt: Date; // Add createdAt property here
}

const ChatMessageSchema: Schema<IChatMessage> = new Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default to the current date
  },
});

// Use `models.ChatMessage` if available, otherwise create a new model.
const ChatMessage = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);

export default ChatMessage;
