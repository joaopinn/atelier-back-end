import type { ProductType } from '../models/Product';
interface CriarProdutoDTO {
    name: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    sizes: string[];
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