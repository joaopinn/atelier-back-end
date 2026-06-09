import type { UserType } from '../models/User';
interface CriarUserDTO {
    nome: string;
    email: string;
    senha: string;
    role?: 'admin' | 'customer';
}
export declare class UserService {
    private jwtSecret;
    criarUsuario(data: CriarUserDTO): Promise<UserType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    login(email: string, senhaAberta: string): Promise<{
        token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            nome: string;
            email: string;
            role: "admin" | "customer";
        };
    }>;
    listarUsuarios(): Promise<UserType[]>;
    buscarPorID(id: string): Promise<UserType>;
    atualizarUsuario(id: string, dados: Partial<UserType>): Promise<UserType | null>;
    deletarUsuario(id: string): Promise<{
        mensagem: string;
    }>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=UserService.d.ts.map