import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

const productService = new ProductService();

export class ProductController {
	async criarProduto(req: Request, res: Response) {
		try {
			const novo = await productService.criarProduto(req.body);
			return res.status(201).json(novo);
		} catch (error: any) {
			const msg = error.message || 'Erro ao criar produto';
			const status = /preço|estoque|válid/i.test(msg) ? 400 : 500;
			return res.status(status).json({ error: msg });
		}
	}

	async listarProdutos(_req: Request, res: Response) {
		try {
			const produtos = await productService.listarProdutos();
			return res.status(200).json(produtos);
		} catch (error: any) {
			return res.status(500).json({ error: error.message || 'Erro ao listar produtos' });
		}
	}

	async buscarPorID(req: Request, res: Response) {
		try {
			const idParam = req.params.id;
			if (!idParam || Array.isArray(idParam)) {
				return res.status(400).json({ error: 'ID inválido' });
			}
			const produto = await productService.buscarPorID(idParam);
			return res.status(200).json(produto);
		} catch (error: any) {
			const msg = error.message || 'Erro ao buscar produto';
			const status = /não encontrado|not found/i.test(msg) ? 404 : 500;
			return res.status(status).json({ error: msg });
		}
	}

	async buscarPorNome(req: Request, res: Response) {
		try {
			const nomeParam = req.params.nome;
			if (!nomeParam || Array.isArray(nomeParam)) {
				return res.status(400).json({ error: 'Nome inválido' });
			}
			const produto = await productService.buscarPorNome(nomeParam);
			return res.status(200).json(produto);
		} catch (error: any) {
			const msg = error.message || 'Erro ao buscar produto por nome';
			const status = /não encontrado|not found/i.test(msg) ? 404 : 500;
			return res.status(status).json({ error: msg });
		}
	}

	async buscarPorTamanho(req: Request, res: Response) {
		try {
			const tamanhoParam = req.params.tamanho;
			if (!tamanhoParam || Array.isArray(tamanhoParam)) {
				return res.status(400).json({ error: 'Tamanho inválido' });
			}
			const produtos = await productService.buscarPorTamanho(tamanhoParam);
			return res.status(200).json(produtos);
		} catch (error: any) {
			const msg = error.message || 'Erro ao buscar produto por tamanho';
			const status = /nenhum produto encontrado|não encontrado|not found/i.test(msg) ? 404 : 500;
			return res.status(status).json({ error: msg });
		}
	}

	async atualizarProduto(req: Request, res: Response) {
		try {
			const idParam = req.params.id;
			if (!idParam || Array.isArray(idParam)) {
				return res.status(400).json({ error: 'ID inválido' });
			}
			const atualizado = await productService.atualizarProduto(idParam, req.body);
			return res.status(200).json(atualizado);
		} catch (error: any) {
			const msg = error.message || 'Erro ao atualizar produto';
			const status = /não foi atualizado|não encontrado|not found/i.test(msg) ? 404 : 500;
			return res.status(status).json({ error: msg });
		}
	}

	async deletarProduto(req: Request, res: Response) {
		try {
			const idParam = req.params.id;
			if (!idParam || Array.isArray(idParam)) {
				return res.status(400).json({ error: 'ID inválido' });
			}
			const deletado = await productService.deletarProduto(idParam);
			return res.status(200).json(deletado);
		} catch (error: any) {
			const msg = error.message || 'Erro ao deletar produto';
			const status = /não foi deletado|não encontrado|not found/i.test(msg) ? 404 : 500;
			return res.status(status).json({ error: msg });
		}
	}
}

export default new ProductController();

