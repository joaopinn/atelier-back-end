export interface ProductType {
    name: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    sizes: string[];
}
export declare const ProductModel: import("mongoose").Model<ProductType, {}, {}, {}, import("mongoose").Document<unknown, {}, ProductType, {}, import("mongoose").DefaultSchemaOptions> & ProductType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ProductType>;
//# sourceMappingURL=Product.d.ts.map