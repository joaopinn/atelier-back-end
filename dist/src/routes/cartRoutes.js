"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = __importDefault(require("../controllers/CartController"));
const router = (0, express_1.Router)();
router.get('/:userId', (req, res) => CartController_1.default.getCartByUser(req, res));
router.post('/:userId/items', (req, res) => CartController_1.default.addItem(req, res));
router.delete('/:userId/items/:productId', (req, res) => CartController_1.default.removeItem(req, res));
router.delete('/:userId', (req, res) => CartController_1.default.clearCart(req, res));
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map