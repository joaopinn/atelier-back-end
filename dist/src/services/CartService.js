"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const Cart_1 = require("../models/Cart");
const mongoose_1 = require("mongoose");
class CartService {
    async getCartByUser(userId) {
        return await Cart_1.CartModel.findOne({ user: new mongoose_1.Types.ObjectId(userId) }).populate('items.product');
    }
    async addItem(data) {
        const userObjId = new mongoose_1.Types.ObjectId(data.userId);
        let cart = await Cart_1.CartModel.findOne({ user: userObjId });
        if (!cart) {
            cart = await Cart_1.CartModel.create({ user: userObjId, items: [] });
        }
        // verificar se produto já existe no carrinho (mesmo produto e tamanho)
        const existing = cart.items.find((i) => i.product.toString() === data.productId && (i.tamanho || '') === (data.tamanho || ''));
        if (existing) {
            existing.quantidade += data.quantidade || 1;
        }
        else {
            const newItem = { product: new mongoose_1.Types.ObjectId(data.productId), quantidade: data.quantidade || 1 };
            if (data.tamanho)
                newItem.tamanho = data.tamanho;
            cart.items.push(newItem);
        }
        await cart.save();
        return cart;
    }
    async removeItem(userId, productId, tamanho) {
        const cart = await Cart_1.CartModel.findOne({ user: new mongoose_1.Types.ObjectId(userId) });
        if (!cart)
            throw new Error('Carrinho não encontrado');
        cart.items = cart.items.filter((i) => !(i.product.toString() === productId && (tamanho || '') === (i.tamanho || '')));
        await cart.save();
        return cart;
    }
    async clearCart(userId) {
        await Cart_1.CartModel.findOneAndDelete({ user: new mongoose_1.Types.ObjectId(userId) });
    }
}
exports.CartService = CartService;
exports.default = new CartService();
//# sourceMappingURL=CartService.js.map