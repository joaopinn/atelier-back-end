import { Request, Response } from 'express';
declare class CartController {
    getCartByUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    addItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    removeItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    clearCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: CartController;
export default _default;
//# sourceMappingURL=CartController.d.ts.map