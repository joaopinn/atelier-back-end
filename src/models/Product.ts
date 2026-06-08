import { Schema, model } from 'mongoose';

// 1. Interface padronizada com o Frontend
export interface ProductType {
  name: string;        // Substitui nomeDoProduto
  price: number;       // Substitui preco
  category: string;    // Adicionado para o layout do frontend
  image: string;       // Adicionado para carregar a foto no card
  stock: number;       // Substitui estoque
  sizes: string[];     // Substitui tamanho
}

// 2. Schema do Mongoose atualizado
const productSchema = new Schema<ProductType>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, default: "Geral" }, // Default caso esqueça de enviar
  image: { type: String, required: true, default: "https://via.placeholder.com/300x400" }, // Fallback de imagem
  stock: { type: Number, required: true, default: 0 },
  sizes: { type: [String], required: true }
});

// 3. (Opcional, mas recomendado) Configuração para transformar _id em id automaticamente
productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret: Record<string, any>) {
    ret.id = ret._id; // O Frontend pede 'id', o Mongo usa '_id'
    delete ret._id;
  }
});

export const ProductModel = model<ProductType>('Product', productSchema);