import { UserModel } from '../models/User';
import type { UserType } from '../models/User';

interface CriarUserDTO {
  nome: string;
  email: string;
  senha: string;
}

export class UserService {
  async criarUsuario(data: CriarUserDTO): Promise<UserType> {
    try {
      const existente = await UserModel.findOne({ email: data.email });
      if (existente) throw new Error('Email já cadastrado');
      const novo = await UserModel.create({ nome: data.nome, email: data.email, senha: data.senha });
      return novo;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar usuário');
    }
  }

  async listarUsuarios(): Promise<UserType[]> {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error('Erro ao listar usuários');
    }
  }

  async buscarPorID(id: string): Promise<UserType> {
    try {
      const user = await UserModel.findById(id);
      if (!user) throw new Error('Usuário não encontrado');
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar usuário');
    }
  }

  async buscarPorEmail(email: string): Promise<UserType | null> {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error('Erro ao buscar usuário por email');
    }
  }

  async atualizarUsuario(id: string, dados: Partial<UserType>): Promise<UserType | null> {
    try {
      const atualizado = await UserModel.findByIdAndUpdate(id, dados, { new: true });
      if (!atualizado) throw new Error('Usuário não foi atualizado');
      return atualizado;
    } catch (error) {
      throw new Error('Erro ao atualizar usuário');
    }
  }

  async deletarUsuario(id: string): Promise<UserType> {
    try {
      const deletado = await UserModel.findByIdAndDelete(id);
      if (!deletado) throw new Error('Usuário não foi deletado');
      return deletado;
    } catch (error) {
      throw new Error('Erro ao deletar usuário');
    }
  }
}

export default new UserService();
