import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './src/routes/productRoutes';
import userRoutes from './src/routes/userRoutes';
import cartRoutes from './src/routes/cartRoutes';
import { connectDB } from './src/database';
import { errorHandler } from './src/midllewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// rotas
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/carts', cartRoutes);

// rota health
app.get('/', (_req, res) => res.send('Atelier API'));

// error handler
app.use(errorHandler);

// conectar ao DB se variável estiver definida
connectDB(process.env.MONGO_URI || '');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});