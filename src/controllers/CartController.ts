import { Request, Response } from 'express';
import CartService from '../services/CartService';

class CartController {
  async getCartByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const cart = await CartService.getCartByUser(userId);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const data = { ...req.body, userId: req.params.userId };
      const cart = await CartService.addItem(data);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const { userId, productId } = req.params;
      const { tamanho } = req.query;
      const cart = await CartService.removeItem(userId, productId, typeof tamanho === 'string' ? tamanho : undefined);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      await CartService.clearCart(userId);
      return res.status(200).json({ message: 'Carrinho limpo' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CartController();
