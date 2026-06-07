import type { UserType } from '../models/User';
interface CriarUserDTO {
    nome: string;
    email: string;
    senha: string;
}
export declare class UserService {
    criarUsuario(data: CriarUserDTO): Promise<UserType>;
    listarUsuarios(): Promise<UserType[]>;
    buscarPorID(id: string): Promise<UserType>;
    buscarPorEmail(email: string): Promise<UserType | null>;
    atualizarUsuario(id: string, dados: Partial<UserType>): Promise<UserType | null>;
    deletarUsuario(id: string): Promise<UserType>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=UserService.d.ts.map