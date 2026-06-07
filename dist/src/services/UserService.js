"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
class UserService {
    async criarUsuario(data) {
        try {
            const existente = await User_1.UserModel.findOne({ email: data.email });
            if (existente)
                throw new Error('Email já cadastrado');
            const novo = await User_1.UserModel.create({ nome: data.nome, email: data.email, senha: data.senha });
            return novo;
        }
        catch (error) {
            throw new Error(error.message || 'Erro ao criar usuário');
        }
    }
    async listarUsuarios() {
        try {
            return await User_1.UserModel.find();
        }
        catch (error) {
            throw new Error('Erro ao listar usuários');
        }
    }
    async buscarPorID(id) {
        try {
            const user = await User_1.UserModel.findById(id);
            if (!user)
                throw new Error('Usuário não encontrado');
            return user;
        }
        catch (error) {
            throw new Error(error.message || 'Erro ao buscar usuário');
        }
    }
    async buscarPorEmail(email) {
        try {
            return await User_1.UserModel.findOne({ email });
        }
        catch (error) {
            throw new Error('Erro ao buscar usuário por email');
        }
    }
    async atualizarUsuario(id, dados) {
        try {
            const atualizado = await User_1.UserModel.findByIdAndUpdate(id, dados, { new: true });
            if (!atualizado)
                throw new Error('Usuário não foi atualizado');
            return atualizado;
        }
        catch (error) {
            throw new Error('Erro ao atualizar usuário');
        }
    }
    async deletarUsuario(id) {
        try {
            const deletado = await User_1.UserModel.findByIdAndDelete(id);
            if (!deletado)
                throw new Error('Usuário não foi deletado');
            return deletado;
        }
        catch (error) {
            throw new Error('Erro ao deletar usuário');
        }
    }
}
exports.UserService = UserService;
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map