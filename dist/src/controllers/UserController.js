"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    async criarUsuario(req, res) {
        try {
            const user = await UserService_1.default.criarUsuario(req.body);
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async listarUsuarios(_req, res) {
        try {
            const users = await UserService_1.default.listarUsuarios();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async buscarPorID(req, res) {
        try {
            const id = req.params.id;
            if (!id || Array.isArray(id))
                return res.status(400).json({ error: 'ID inválido' });
            const user = await UserService_1.default.buscarPorID(id);
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async atualizarUsuario(req, res) {
        try {
            const id = req.params.id;
            if (!id || Array.isArray(id))
                return res.status(400).json({ error: 'ID inválido' });
            const atualizado = await UserService_1.default.atualizarUsuario(id, req.body);
            return res.status(200).json(atualizado);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deletarUsuario(req, res) {
        try {
            const id = req.params.id;
            if (!id || Array.isArray(id))
                return res.status(400).json({ error: 'ID inválido' });
            const deletado = await UserService_1.default.deletarUsuario(id);
            return res.status(200).json(deletado);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map