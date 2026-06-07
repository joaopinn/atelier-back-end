import { Types } from 'mongoose';
export interface CartItem {
    product: Types.ObjectId;
    quantidade: number;
    tamanho?: string;
}
export interface CartType {
    user: Types.ObjectId;
    items: CartItem[];
}
export declare const CartModel: import("mongoose").Model<CartType, {}, {}, {}, import("mongoose").Document<unknown, {}, CartType, {}, import("mongoose").DefaultSchemaOptions> & CartType & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, CartType>;
//# sourceMappingURL=Cart.d.ts.map