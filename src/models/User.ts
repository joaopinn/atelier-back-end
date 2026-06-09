import { Schema, model } from 'mongoose';

export interface UserType {
  nome: string;
  email: string;
  senha: string;
  role: 'admin' | 'customer'; // Definindo os tipos de acesso
}

const userSchema = new Schema<UserType>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' } // Padrão é cliente
});

export const UserModel = model<UserType>('User', userSchema);