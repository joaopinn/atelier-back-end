import { ProductModel } from '../models/Product';
import type { ProductType } from '../models/Product';

// 1. O DTO agora reflete exatamente o que vem do Front-end
interface CriarProdutoDTO {
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  sizes: string[];
}

export class ProductService {

  async criarProduto(data: CriarProdutoDTO): Promise<ProductType>{
    // Regras de negócio
    if(data.price <= 0) {
      throw new Error("O preço do produto não pode ser menor ou igual a 0!");
    }
    
    if(data.stock < 0) {
      throw new Error("O estoque do produto não pode ser menor que 0!");
    }

    try {
      // 2. Aqui os campos agora batem com o seu Model (name, price, etc)
      const novoProduto = await ProductModel.create ({
        name: data.name,
        price: data.price,
        category: data.category,
        image: data.image,
        stock: data.stock,
        sizes: data.sizes
      });
      return novoProduto;
    } catch (error: any) {
      // 3. Importante: logar o erro real aqui para você nunca mais ficar no escuro
      console.error("Erro real do Mongoose:", error); 
      throw new Error("Erro ao criar o produto no banco de dados: " + error.message);
    }
  }

  async listarProdutos(): Promise<ProductType[]> {
    try {
      const produtos = await ProductModel.find();
      return produtos;
    } catch (error) {
      throw new Error("Erro ao listar os produtos");
    }
  }

  async buscarPorID(id: string): Promise<ProductType> {
    try {
      const produtoBuscado = await ProductModel.findById(id);
      if(!produtoBuscado) throw new Error("Produto não encontrado");
      return produtoBuscado;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar produto");
    }
  }

  async buscarPorNome(nome: string): Promise<ProductType> {
    try {
      // Ajustado para 'name' (conforme seu novo model)
      const produtoBuscadoPeloNome = await ProductModel.findOne({ name: nome })
      if(!produtoBuscadoPeloNome) throw new Error("Produto não encontrado");
      return produtoBuscadoPeloNome;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar o produto")
    }
  }

  async buscarPorTamanho(tamanhoDoProduto: string): Promise<ProductType[]> {
    try {
      // Ajustado para 'sizes' (conforme seu novo model)
      const produtoBuscadoPeloTamanho = await ProductModel.find({ sizes: tamanhoDoProduto })
      if (produtoBuscadoPeloTamanho.length === 0) {
        throw new Error("Nenhum produto encontrado com este tamanho");
      }
      return produtoBuscadoPeloTamanho;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar o produto")
    }
  }

  async atualizarProduto(id: string, dadosAtualizados: Partial<ProductType>): Promise<ProductType | null> {
    try {
      const produtoAtualizado = await ProductModel.findByIdAndUpdate(
        id,
        dadosAtualizados,
        { new: true }
      );
      if(!produtoAtualizado) throw new Error("Produto não encontrado");
      return produtoAtualizado;
    } catch (error: any) {
      throw new Error("Erro ao atualizar o produto: " + error.message)
    }
  }

  async deletarProduto(id: string): Promise<ProductType> {
    try {
      const produtoDeletado = await ProductModel.findByIdAndDelete(id)
      if(!produtoDeletado) throw new Error("Produto não encontrado")
      return produtoDeletado;
    } catch (error: any) {
      throw new Error("Erro ao deletar o produto: " + error.message)
    }
  }
}