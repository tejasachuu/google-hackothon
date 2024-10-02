// models/User.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the User interface that extends Document
interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // Specify _id as ObjectId
  username: string;
  email: string;
  password: string;
}

// Create the User schema
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true }); // This adds createdAt and updatedAt fields

// Create the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
