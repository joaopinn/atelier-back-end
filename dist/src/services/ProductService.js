"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_1 = require("../models/Product");
class ProductService {
    async criarProduto(data) {
        // Regras de negócios
        if (data.preco <= 0) {
            throw new Error("O preço do produto não pode ser menor ou gual a 0!");
        }
        if (data.estoque < 0) {
            throw new Error("O estoque do produto não pode ser menor que 0!");
        }
        try {
            const novoProduto = await Product_1.ProductModel.create({
                nomeDoProduto: data.nomeDoProduto,
                preco: data.preco,
                tamanho: data.tamanho,
                estoque: data.estoque
            });
            return novoProduto;
        }
        catch (error) {
            throw new Error("Erro ao criar o produto");
        }
    }
    async listarProdutos() {
        try {
            const produtos = await Product_1.ProductModel.find();
            if (!produtos) {
                throw new Error("Produtos não encontrado");
            }
            return produtos;
        }
        catch (error) {
            throw new Error("Erro ao listar os produtos");
        }
    }
    async buscarPorID(id) {
        try {
            const produtoBuscado = await Product_1.ProductModel.findById(id);
            if (!produtoBuscado) {
                throw new Error("Produto não encontrado");
            }
            return produtoBuscado;
        }
        catch (error) {
            // Repassa a mensagem original que você criou no 'try'
            throw new Error(error.message || "Erro ao fazer a operação");
        }
    }
    // filtros
    // filtrar por nome
    async buscarPorNome(nome) {
        try {
            const produtoBuscadoPeloNome = await Product_1.ProductModel.findOne({ nomeDoProduto: nome });
            if (!produtoBuscadoPeloNome) {
                throw new Error("Produto não encontrado");
            }
            return produtoBuscadoPeloNome;
        }
        catch (error) {
            throw new Error("Erro ao buscar o produto");
        }
    }
    // filtrar por tamanho
    async buscarPorTamanho(tamanhoDoProduto) {
        try {
            const produtoBuscadoPeloTamanho = await Product_1.ProductModel.find({ tamanho: tamanhoDoProduto });
            if (produtoBuscadoPeloTamanho.length === 0) {
                throw new Error("Nenhum produto encontrado com este tamanho");
            }
            return produtoBuscadoPeloTamanho;
        }
        catch (error) {
            throw new Error("Erro ao buscar o produto");
        }
    }
    // atualizar
    async atualizarProduto(id, dadosAtualizados) {
        try {
            const produtoAtualizado = await Product_1.ProductModel.findByIdAndUpdate(id, dadosAtualizados, { new: true });
            if (!produtoAtualizado) {
                throw new Error("Produto não foi atualizado com sucesso");
            }
            return produtoAtualizado;
        }
        catch (error) {
            throw new Error("Erro ao atualizar o produto");
        }
    }
    // deletar
    async deletarProduto(id) {
        try {
            const produtoDeletado = await Product_1.ProductModel.findByIdAndDelete(id);
            if (!produtoDeletado) {
                throw new Error("Produto não foi deletado com sucesso");
            }
            return produtoDeletado;
        }
        catch (error) {
            throw new Error("Erro ao deletar o produto");
        }
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map