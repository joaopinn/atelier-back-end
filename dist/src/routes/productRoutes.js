"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => ProductController_1.default.criarProduto(req, res));
router.get('/', (req, res) => ProductController_1.default.listarProdutos(req, res));
router.get('/id/:id', (req, res) => ProductController_1.default.buscarPorID(req, res));
router.get('/name/:nome', (req, res) => ProductController_1.default.buscarPorNome(req, res));
router.get('/size/:tamanho', (req, res) => ProductController_1.default.buscarPorTamanho(req, res));
router.put('/:id', (req, res) => ProductController_1.default.atualizarProduto(req, res));
router.delete('/:id', (req, res) => ProductController_1.default.deletarProduto(req, res));
exports.default = router;
//# sourceMappingURL=productRoutes.js.map