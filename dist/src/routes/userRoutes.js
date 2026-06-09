"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = (0, express_1.Router)();
// Nova rota de Login
router.post('/login', (req, res) => UserController_1.default.login(req, res));
// Rotas existentes
router.post('/', (req, res) => UserController_1.default.criarUsuario(req, res));
router.get('/', (req, res) => UserController_1.default.listarUsuarios(req, res));
router.get('/:id', (req, res) => UserController_1.default.buscarPorID(req, res));
router.put('/:id', (req, res) => UserController_1.default.atualizarUsuario(req, res));
router.delete('/:id', (req, res) => UserController_1.default.deletarUsuario(req, res));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map