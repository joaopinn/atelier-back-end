import type { CartType } from '../models/Cart';
interface AddItemDTO {
    userId: string;
    productId: string;
    quantidade?: number;
    tamanho?: string;
}
export declare class CartService {
    getCartByUser(userId: string): Promise<CartType | null>;
    addItem(data: AddItemDTO): Promise<CartType>;
    removeItem(userId: string, productId: string, tamanho?: string): Promise<CartType | null>;
    clearCart(userId: string): Promise<void>;
}
declare const _default: CartService;
export default _default;
//# sourceMappingURL=CartService.d.ts.map