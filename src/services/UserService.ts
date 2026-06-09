import { UserModel } from '../models/User';
import type { UserType } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface CriarUserDTO {
  nome: string;
  email: string;
  senha: string;
  role?: 'admin' | 'customer';
}

export class UserService {
  // 1. CHAVE SECRETA DO JWT (Em produção, coloque isso no arquivo .env)
  private jwtSecret = process.env.JWT_SECRET || 'chave-secreta-do-atelier-123';

  async criarUsuario(data: CriarUserDTO) {
    try {
      const existente = await UserModel.findOne({ email: data.email });
      if (existente) throw new Error('Email já cadastrado');

      // Criptografando a senha antes de salvar no banco
      const salt = await bcrypt.genSalt(10);
      const senhaCriptografada = await bcrypt.hash(data.senha, salt);

      const novo = await UserModel.create({ 
        nome: data.nome, 
        email: data.email, 
        senha: senhaCriptografada,
        role: data.role || 'customer'
      });

      // Retornar sem a senha por segurança
      const userLimpo = novo.toObject();
      delete (userLimpo as any).senha;
      
      return userLimpo;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar usuário');
    }
  }

  // 2. NOVA FUNÇÃO DE LOGIN
  async login(email: string, senhaAberta: string) {
    try {
      // Busca o usuário
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error('Email ou senha incorretos');

      // Compara a senha digitada com a criptografada no banco
      const senhaValida = await bcrypt.compare(senhaAberta, user.senha);
      if (!senhaValida) throw new Error('Email ou senha incorretos');

      // Gera o Token de acesso (JWT) contendo o ID e a Role do usuário
      const token = jwt.sign(
        { id: user._id, role: user.role }, 
        this.jwtSecret, 
        { expiresIn: '1d' } // Expira em 1 dia
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
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  }

  async listarUsuarios(): Promise<UserType[]> {
    try {
      return await UserModel.find().select('-senha'); // Oculta a senha na listagem
    } catch (error) {
      throw new Error('Erro ao listar usuários');
    }
  }

  async buscarPorID(id: string): Promise<UserType> {
    try {
      const user = await UserModel.findById(id).select('-senha');
      if (!user) throw new Error('Usuário não encontrado');
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar usuário');
    }
  }

  // ... (manter os outros métodos atualizarUsuario e deletarUsuario iguais)
  async atualizarUsuario(id: string, dados: Partial<UserType>): Promise<UserType | null> {
    try {
      if (dados.senha) {
        const salt = await bcrypt.genSalt(10);
        dados.senha = await bcrypt.hash(dados.senha, salt);
      }
      const atualizado = await UserModel.findByIdAndUpdate(id, dados, { new: true }).select('-senha');
      if (!atualizado) throw new Error('Usuário não foi atualizado');
      return atualizado;
    } catch (error) {
      throw new Error('Erro ao atualizar usuário');
    }
  }

  async deletarUsuario(id: string) {
    try {
      const deletado = await UserModel.findByIdAndDelete(id);
      if (!deletado) throw new Error('Usuário não foi deletado');
      return { mensagem: 'Usuário deletado com sucesso' };
    } catch (error) {
      throw new Error('Erro ao deletar usuário');
    }
  }

  async atualizarSenha(id: string, senhaAtual: string, novaSenha: string) {
    const usuario = await UserModel.findById(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // 1. Verifica se a senha atual digitada bate com o hash do banco
    const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaCorreta) {
      throw new Error("A senha atual está incorreta.");
    }

    // 2. Cria o Hash para a NOVA senha
    const salt = await bcrypt.genSalt(10);
    const novoHash = await bcrypt.hash(novaSenha, salt);

    // 3. Atualiza no banco
    usuario.senha = novoHash;
    await usuario.save();

    return { message: "Senha atualizada com sucesso!" };
  }
}

export default new UserService();