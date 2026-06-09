export interface UserType {
    nome: string;
    email: string;
    senha: string;
    role: 'admin' | 'customer';
}
export declare const UserModel: import("mongoose").Model<UserType, {}, {}, {}, import("mongoose").Document<unknown, {}, UserType, {}, import("mongoose").DefaultSchemaOptions> & UserType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, UserType>;
//# sourceMappingURL=User.d.ts.map