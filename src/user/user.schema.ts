import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  username: string;
  firstname: string;
  password: string;
  role: 'agent' | 'admin' | 'superadmin';
  refreshToken?: string;
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['agent', 'admin', 'superadmin'],
    default: 'agent' as const,
  },
  refreshToken: { type: String },
});
