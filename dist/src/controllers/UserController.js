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
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }
            const dadosLogin = await UserService_1.default.login(email, senha);
            return res.status(200).json(dadosLogin);
        }
        catch (error) {
            // Retornar 401 (Unauthorized) para falhas de login
            return res.status(401).json({ error: error.message });
        }
    }
    // Adicione dentro do seu UserController
    async atualizarSenha(req, res) {
        try {
            const { id } = req.params;
            const { senhaAtual, novaSenha } = req.body;
            if (!id || Array.isArray(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }
            if (!senhaAtual || !novaSenha) {
                return res.status(400).json({ error: "Preencha a senha atual e a nova senha." });
            }
            const resultado = await UserService_1.default.atualizarSenha(id, senhaAtual, novaSenha);
            return res.status(200).json(resultado);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map