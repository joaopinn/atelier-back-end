import { Router } from 'express';
import productController from '../controllers/ProductController';

const router = Router();

router.post('/', (req, res) => productController.criarProduto(req, res));
router.get('/', (req, res) => productController.listarProdutos(req, res));
router.get('/id/:id', (req, res) => productController.buscarPorID(req, res));
router.get('/name/:nome', (req, res) => productController.buscarPorNome(req, res));
router.get('/size/:tamanho', (req, res) => productController.buscarPorTamanho(req, res));
router.put('/:id', (req, res) => productController.atualizarProduto(req, res));
router.delete('/:id', (req, res) => productController.deletarProduto(req, res));

export default router;
