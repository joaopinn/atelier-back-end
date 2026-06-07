import { Schema, model } from 'mongoose';

export interface UserType {
  nome: string;
  email: string;
  senha: string;
}

const userSchema = new Schema<UserType>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

export const UserModel = model<UserType>('User', userSchema);
