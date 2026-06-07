export interface ProductType {
    nomeDoProduto: string;
    preco: number;
    estoque: number;
    tamanho: string[];
}
export declare const ProductModel: import("mongoose").Model<ProductType, {}, {}, {}, import("mongoose").Document<unknown, {}, ProductType, {}, import("mongoose").DefaultSchemaOptions> & ProductType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ProductType>;
//# sourceMappingURL=Product.d.ts.map