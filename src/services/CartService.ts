import { CartModel } from '../models/Cart';
import type { CartType } from '../models/Cart';
import { Types } from 'mongoose';

interface AddItemDTO {
  userId: string;
  productId: string;
  quantidade?: number;
  tamanho?: string;
}

export class CartService {
  async getCartByUser(userId: string): Promise<CartType | null> {
    return await CartModel.findOne({ user: new Types.ObjectId(userId) }).populate('items.product');
  }

  async addItem(data: AddItemDTO): Promise<CartType> {
    const userObjId = new Types.ObjectId(data.userId);
    let cart = await CartModel.findOne({ user: userObjId });
    if (!cart) {
      cart = await CartModel.create({ user: userObjId, items: [] });
    }

    // verificar se produto já existe no carrinho (mesmo produto e tamanho)
    const existing = cart.items.find(
      (i) => i.product.toString() === data.productId && (i.tamanho || '') === (data.tamanho || '')
    );

    if (existing) {
      existing.quantidade += data.quantidade || 1;
    } else {
      cart.items.push({ product: new Types.ObjectId(data.productId), quantidade: data.quantidade || 1, tamanho: data.tamanho });
    }

    await cart.save();
    return cart;
  }

  async removeItem(userId: string, productId: string, tamanho?: string): Promise<CartType | null> {
    const cart = await CartModel.findOne({ user: new Types.ObjectId(userId) });
    if (!cart) throw new Error('Carrinho não encontrado');

    cart.items = cart.items.filter((i) => !(i.product.toString() === productId && (tamanho || '') === (i.tamanho || '')));
    await cart.save();
    return cart;
  }

  async clearCart(userId: string): Promise<void> {
    await CartModel.findOneAndDelete({ user: new Types.ObjectId(userId) });
  }
}

export default new CartService();
