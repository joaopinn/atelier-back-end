"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
// 2. Criamos o Schema do Mongoose passando a interface <IProduct> 
// Isso liga o Mongoose ao TypeScript
const productSchema = new mongoose_1.Schema({
    nomeDoProduto: { type: String, required: true },
    // brand: { type: String, required: true },
    preco: { type: Number, required: true },
    estoque: { type: Number, required: true, default: 0 },
    tamanho: { type: [String], required: true }
});
// 3. Exportamos o Modelo criado
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=Product.js.map