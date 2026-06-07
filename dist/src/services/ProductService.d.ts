import type { ProductType } from '../models/Product';
interface CriarProdutoDTO {
    nomeDoProduto: string;
    preco: number;
    tamanho: string[];
    estoque: number;
}
export declare class ProductService {
    criarProduto(data: CriarProdutoDTO): Promise<ProductType>;
    listarProdutos(): Promise<ProductType[]>;
    buscarPorID(id: string): Promise<ProductType>;
    buscarPorNome(nome: string): Promise<ProductType>;
    buscarPorTamanho(tamanhoDoProduto: string): Promise<ProductType[]>;
    atualizarProduto(id: string, dadosAtualizados: Partial<ProductType>): Promise<ProductType | null>;
    deletarProduto(id: string): Promise<ProductType>;
}
export {};
//# sourceMappingURL=ProductService.d.ts.map