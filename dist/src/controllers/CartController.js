"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartService_1 = __importDefault(require("../services/CartService"));
class CartController {
    async getCartByUser(req, res) {
        try {
            const userId = req.params.userId;
            if (!userId || Array.isArray(userId))
                return res.status(400).json({ error: 'userId inválido' });
            const cart = await CartService_1.default.getCartByUser(userId);
            return res.status(200).json(cart);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async addItem(req, res) {
        try {
            const userId = req.params.userId;
            if (!userId || Array.isArray(userId))
                return res.status(400).json({ error: 'userId inválido' });
            const data = { ...req.body, userId };
            const cart = await CartService_1.default.addItem(data);
            return res.status(200).json(cart);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async removeItem(req, res) {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;
            if (!userId || Array.isArray(userId) || !productId || Array.isArray(productId))
                return res.status(400).json({ error: 'Parâmetros inválidos' });
            const { tamanho } = req.query;
            const cart = await CartService_1.default.removeItem(userId, productId, typeof tamanho === 'string' ? tamanho : undefined);
            return res.status(200).json(cart);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async clearCart(req, res) {
        try {
            const userId = req.params.userId;
            if (!userId || Array.isArray(userId))
                return res.status(400).json({ error: 'userId inválido' });
            await CartService_1.default.clearCart(userId);
            return res.status(200).json({ message: 'Carrinho limpo' });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new CartController();
//# sourceMappingURL=CartController.js.map