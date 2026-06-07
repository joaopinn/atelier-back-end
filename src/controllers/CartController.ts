import { Request, Response } from 'express';
import CartService from '../services/CartService';

class CartController {
  async getCartByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      if (!userId || Array.isArray(userId)) return res.status(400).json({ error: 'userId inválido' });
      const cart = await CartService.getCartByUser(userId);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      if (!userId || Array.isArray(userId)) return res.status(400).json({ error: 'userId inválido' });
      const data = { ...req.body, userId };
      const cart = await CartService.addItem(data);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      if (!userId || Array.isArray(userId) || !productId || Array.isArray(productId)) return res.status(400).json({ error: 'Parâmetros inválidos' });
      const { tamanho } = req.query;
      const cart = await CartService.removeItem(userId, productId, typeof tamanho === 'string' ? tamanho : undefined);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      if (!userId || Array.isArray(userId)) return res.status(400).json({ error: 'userId inválido' });
      await CartService.clearCart(userId);
      return res.status(200).json({ message: 'Carrinho limpo' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CartController();
