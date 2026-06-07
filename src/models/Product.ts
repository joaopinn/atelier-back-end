import { Schema, model } from 'mongoose';

// 1. Criamos a interface para o TypeScript saber quais campos existem
export interface ProductType {
  nomeDoProduto: string;
  // brand: string;
  preco: number;
  estoque: number;
  tamanho: string[];
}

// 2. Criamos o Schema do Mongoose passando a interface <IProduct> 
// Isso liga o Mongoose ao TypeScript
const productSchema = new Schema<ProductType>({
  nomeDoProduto: { type: String, required: true },
  // brand: { type: String, required: true },
  preco: { type: Number, required: true },
  estoque: { type: Number, required: true, default: 0 },
  tamanho: { type: [String], required: true }
});

// 3. Exportamos o Modelo criado
export const ProductModel = model<ProductType>('Product', productSchema);