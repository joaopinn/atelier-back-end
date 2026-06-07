import { Schema, model, Types } from 'mongoose';

export interface CartItem {
  product: Types.ObjectId;
  quantidade: number;
  tamanho?: string;
}

export interface CartType {
  user: Types.ObjectId;
  items: CartItem[];
}

const cartSchema = new Schema<CartType>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantidade: { type: Number, required: true, default: 1 },
      tamanho: { type: String }
    }
  ]
});

export const CartModel = model<CartType>('Cart', cartSchema);
