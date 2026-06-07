import { Request, Response } from 'express';
export declare class ProductController {
    criarProduto(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listarProdutos(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscarPorID(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscarPorNome(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscarPorTamanho(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    atualizarProduto(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletarProduto(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: ProductController;
export default _default;
//# sourceMappingURL=ProductController.d.ts.map