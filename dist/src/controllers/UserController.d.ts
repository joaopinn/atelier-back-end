import { Request, Response } from 'express';
declare class UserController {
    criarUsuario(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listarUsuarios(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    buscarPorID(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    atualizarUsuario(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletarUsuario(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=UserController.d.ts.map