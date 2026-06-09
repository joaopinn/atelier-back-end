import { Router } from 'express';
import userController from '../controllers/UserController';

const router = Router();

// Nova rota de Login
router.post('/login', (req, res) => userController.login(req, res));

// Rotas existentes
router.post('/', (req, res) => userController.criarUsuario(req, res));
router.get('/', (req, res) => userController.listarUsuarios(req, res));
router.get('/:id', (req, res) => userController.buscarPorID(req, res));
router.put('/:id', (req, res) => userController.atualizarUsuario(req, res));
router.delete('/:id', (req, res) => userController.deletarUsuario(req, res));

export default router;