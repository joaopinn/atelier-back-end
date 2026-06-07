"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantidade: { type: Number, required: true, default: 1 },
            tamanho: { type: String }
        }
    ]
});
exports.CartModel = (0, mongoose_1.model)('Cart', cartSchema);
//# sourceMappingURL=Cart.js.map