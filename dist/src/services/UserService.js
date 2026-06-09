"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    // 1. CHAVE SECRETA DO JWT (Em produção, coloque isso no arquivo .env)
    jwtSecret = process.env.JWT_SECRET || 'chave-secreta-do-atelier-123';
    async criarUsuario(data) {
        try {
            const existente = await User_1.UserModel.findOne({ email: data.email });
            if (existente)
                throw new Error('Email já cadastrado');
            // Criptografando a senha antes de salvar no banco
            const salt = await bcryptjs_1.default.genSalt(10);
            const senhaCriptografada = await bcryptjs_1.default.hash(data.senha, salt);
            const novo = await User_1.UserModel.create({
                nome: data.nome,
                email: data.email,
                senha: senhaCriptografada,
                role: data.role || 'customer'
            });
            // Retornar sem a senha por segurança
            const userLimpo = novo.toObject();
            delete userLimpo.senha;
            return userLimpo;
        }
        catch (error) {
            throw new Error(error.message || 'Erro ao criar usuário');
        }
    }
    // 2. NOVA FUNÇÃO DE LOGIN
    async login(email, senhaAberta) {
        try {
            // Busca o usuário
            const user = await User_1.UserModel.findOne({ email });
            if (!user)
                throw new Error('Email ou senha incorretos');
            // Compara a senha digitada com a criptografada no banco
            const senhaValida = await bcryptjs_1.default.compare(senhaAberta, user.senha);
            if (!senhaValida)
                throw new Error('Email ou senha incorretos');
            // Gera o Token de acesso (JWT) contendo o ID e a Role do usuário
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, this.jwtSecret, { expiresIn: '1d' } // Expira em 1 dia
            );
            return {
                token,
                user: {
                    id: user._id,
                    nome: user.nome,
                    email: user.email,
                    role: user.role
                }
            };
        }
        catch (error) {
            throw new Error(error.message || 'Erro ao fazer login');
        }
    }
    async listarUsuarios() {
        try {
            return await User_1.UserModel.find().select('-senha'); // Oculta a senha na listagem
        }
        catch (error) {
            throw new Error('Erro ao listar usuários');
        }
    }
    async buscarPorID(id) {
        try {
            const user = await User_1.UserModel.findById(id).select('-senha');
            if (!user)
                throw new Error('Usuário não encontrado');
            return user;
        }
        catch (error) {
            throw new Error(error.message || 'Erro ao buscar usuário');
        }
    }
    // ... (manter os outros métodos atualizarUsuario e deletarUsuario iguais)
    async atualizarUsuario(id, dados) {
        try {
            if (dados.senha) {
                const salt = await bcryptjs_1.default.genSalt(10);
                dados.senha = await bcryptjs_1.default.hash(dados.senha, salt);
            }
            const atualizado = await User_1.UserModel.findByIdAndUpdate(id, dados, { new: true }).select('-senha');
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
            return { mensagem: 'Usuário deletado com sucesso' };
        }
        catch (error) {
            throw new Error('Erro ao deletar usuário');
        }
    }
    async atualizarSenha(id, senhaAtual, novaSenha) {
        const usuario = await User_1.UserModel.findById(id);
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
        // 1. Verifica se a senha atual digitada bate com o hash do banco
        const senhaCorreta = await bcryptjs_1.default.compare(senhaAtual, usuario.senha);
        if (!senhaCorreta) {
            throw new Error("A senha atual está incorreta.");
        }
        // 2. Cria o Hash para a NOVA senha
        const salt = await bcryptjs_1.default.genSalt(10);
        const novoHash = await bcryptjs_1.default.hash(novaSenha, salt);
        // 3. Atualiza no banco
        usuario.senha = novoHash;
        await usuario.save();
        return { message: "Senha atualizada com sucesso!" };
    }
}
exports.UserService = UserService;
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map