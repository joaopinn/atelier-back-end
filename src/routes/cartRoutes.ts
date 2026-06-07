import { Router } from 'express';
import cartController from '../controllers/CartController';

const router = Router();

router.get('/:userId', (req, res) => cartController.getCartByUser(req, res));
router.post('/:userId/items', (req, res) => cartController.addItem(req, res));
router.delete('/:userId/items/:productId', (req, res) => cartController.removeItem(req, res));
router.delete('/:userId', (req, res) => cartController.clearCart(req, res));

export default router;
