"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_1 = require("../models/Product");
class ProductService {
    async criarProduto(data) {
        // Regras de negócio
        if (data.price <= 0) {
            throw new Error("O preço do produto não pode ser menor ou igual a 0!");
        }
        if (data.stock < 0) {
            throw new Error("O estoque do produto não pode ser menor que 0!");
        }
        try {
            // 2. Aqui os campos agora batem com o seu Model (name, price, etc)
            const novoProduto = await Product_1.ProductModel.create({
                name: data.name,
                price: data.price,
                category: data.category,
                image: data.image,
                stock: data.stock,
                sizes: data.sizes
            });
            return novoProduto;
        }
        catch (error) {
            // 3. Importante: logar o erro real aqui para você nunca mais ficar no escuro
            console.error("Erro real do Mongoose:", error);
            throw new Error("Erro ao criar o produto no banco de dados: " + error.message);
        }
    }
    async listarProdutos() {
        try {
            const produtos = await Product_1.ProductModel.find();
            return produtos;
        }
        catch (error) {
            throw new Error("Erro ao listar os produtos");
        }
    }
    async buscarPorID(id) {
        try {
            const produtoBuscado = await Product_1.ProductModel.findById(id);
            if (!produtoBuscado)
                throw new Error("Produto não encontrado");
            return produtoBuscado;
        }
        catch (error) {
            throw new Error(error.message || "Erro ao buscar produto");
        }
    }
    async buscarPorNome(nome) {
        try {
            // Ajustado para 'name' (conforme seu novo model)
            const produtoBuscadoPeloNome = await Product_1.ProductModel.findOne({ name: nome });
            if (!produtoBuscadoPeloNome)
                throw new Error("Produto não encontrado");
            return produtoBuscadoPeloNome;
        }
        catch (error) {
            throw new Error(error.message || "Erro ao buscar o produto");
        }
    }
    async buscarPorTamanho(tamanhoDoProduto) {
        try {
            // Ajustado para 'sizes' (conforme seu novo model)
            const produtoBuscadoPeloTamanho = await Product_1.ProductModel.find({ sizes: tamanhoDoProduto });
            if (produtoBuscadoPeloTamanho.length === 0) {
                throw new Error("Nenhum produto encontrado com este tamanho");
            }
            return produtoBuscadoPeloTamanho;
        }
        catch (error) {
            throw new Error(error.message || "Erro ao buscar o produto");
        }
    }
    async atualizarProduto(id, dadosAtualizados) {
        try {
            const produtoAtualizado = await Product_1.ProductModel.findByIdAndUpdate(id, dadosAtualizados, { new: true });
            if (!produtoAtualizado)
                throw new Error("Produto não encontrado");
            return produtoAtualizado;
        }
        catch (error) {
            throw new Error("Erro ao atualizar o produto: " + error.message);
        }
    }
    async deletarProduto(id) {
        try {
            const produtoDeletado = await Product_1.ProductModel.findByIdAndDelete(id);
            if (!produtoDeletado)
                throw new Error("Produto não encontrado");
            return produtoDeletado;
        }
        catch (error) {
            throw new Error("Erro ao deletar o produto: " + error.message);
        }
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map