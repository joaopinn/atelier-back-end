"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
// 2. Schema do Mongoose atualizado
const productSchema = new mongoose_1.Schema({
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
    transform: function (doc, ret) {
        ret.id = ret._id; // O Frontend pede 'id', o Mongo usa '_id'
        delete ret._id;
    }
});
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=Product.js.map