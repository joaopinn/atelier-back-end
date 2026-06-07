import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  async criarUsuario(req: Request, res: Response) {
    try {
      const user = await UserService.criarUsuario(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarUsuarios(_req: Request, res: Response) {
    try {
      const users = await UserService.listarUsuarios();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarPorID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.buscarPorID(id);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async atualizarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const atualizado = await UserService.atualizarUsuario(id, req.body);
      return res.status(200).json(atualizado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deletarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletado = await UserService.deletarUsuario(id);
      return res.status(200).json(deletado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
