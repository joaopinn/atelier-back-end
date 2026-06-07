import mongoose from 'mongoose';

export async function connectDB(uri: string) {
  if (!uri) {
    console.warn('MONGO_URI não definido — conexão com o banco não será estabelecida.');
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err);
    throw err;
  }
}
