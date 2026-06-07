import { ProductModel } from '../models/Product';
import type { ProductType } from '../models/Product';

interface CriarProdutoDTO {
  nomeDoProduto: string;
  preco: number;
  tamanho: string[];
  estoque: number;
}

export class ProductService {

            async criarProduto(data: CriarProdutoDTO): Promise<ProductType>{
                        
                        // Regras de negócios
                        if(data.preco <= 0) {
                                    throw new Error("O preço do produto não pode ser menor ou gual a 0!");
                        }
                        
                        if(data.estoque < 0) {
                                    throw new Error("O estoque do produto não pode ser menor que 0!");
                        }
                        try {
                        const novoProduto = await ProductModel.create ({
                                    nomeDoProduto: data.nomeDoProduto,
                                    preco: data.preco,
                                    tamanho: data.tamanho,
                                    estoque: data.estoque
                        });
                        return novoProduto;
                      } catch (error) {
                        throw new Error("Erro ao criar o produto" );
                      }
            }

            async listarProdutos(): Promise<ProductType[]> {

              try {
                const produtos = await ProductModel.find();
                if(!produtos){
                  throw new Error("Produtos não encontrado");
                }
                return produtos;

              } catch (error) {
                throw new Error("Erro ao listar os produtos");
              }

            }

            async buscarPorID(id: string): Promise<ProductType> {
              try {
                const produtoBuscado = await ProductModel.findById(id);
                if(!produtoBuscado) {
                  throw new Error("Produto não encontrado");
                }
                return produtoBuscado;
              } catch (error: any) {
                // Repassa a mensagem original que você criou no 'try'
                throw new Error(error.message || "Erro ao fazer a operação");
              }
            }

            // filtros

            // filtrar por nome
            async buscarPorNome(nome: string): Promise<ProductType> {
              try {
                const produtoBuscadoPeloNome = await ProductModel.findOne({ nomeDoProduto: nome})
                if(!produtoBuscadoPeloNome) {
                  throw new Error("Produto não encontrado");
                }
                return produtoBuscadoPeloNome;
              } catch (error) {
                throw new Error("Erro ao buscar o produto")
              }
            }

            // filtrar por tamanho
            async buscarPorTamanho(tamanhoDoProduto: string): Promise<ProductType[]> {
              try {
                const produtoBuscadoPeloTamanho = await ProductModel.find({ tamanho: tamanhoDoProduto})
                if (produtoBuscadoPeloTamanho.length === 0) {
                throw new Error("Nenhum produto encontrado com este tamanho");
              }
                return produtoBuscadoPeloTamanho;
              } catch (error) {
                throw new Error("Erro ao buscar o produto")
              }
            }

            // atualizar
            async atualizarProduto(id: string, dadosAtualizados: Partial<ProductType>): Promise<ProductType | null> {
              try {
                const produtoAtualizado = await ProductModel.findByIdAndUpdate(
                  id,
                  dadosAtualizados,
                  { new: true }
                );

                if(!produtoAtualizado){
                  throw new Error("Produto não foi atualizado com sucesso")
                }

                return produtoAtualizado;
              } catch (error) {
                throw new Error("Erro ao atualizar o produto")
              }
            }

            // deletar
            async deletarProduto(id: string): Promise<ProductType> {
              try {
                const produtoDeletado = await ProductModel.findByIdAndDelete(id)
              if(!produtoDeletado){
                  throw new Error("Produto não foi deletado com sucesso")
                }

                return produtoDeletado;
              } catch (error) {
                throw new Error("Erro ao deletar o produto")
              }
            }
}