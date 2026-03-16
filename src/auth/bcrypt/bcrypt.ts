import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
 
@Injectable()//A anotação @Injectable() é usada para marcar a classe Bcrypt como um provedor de serviço que pode ser injetado em outras partes 
// da aplicação. 
// Isso permite que a classe seja facilmente reutilizada e testada em diferentes contextos, promovendo a modularidade e a organização do código.
export class Bcrypt{
 
    async criptografarSenha(senha: string): Promise<string> {
 
        let saltos: number = 10;
        return await bcrypt.hash(senha, saltos)
 
    }
 
    async compararSenhas(senhaDigitada: string, senhaBanco: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhaBanco);
    }
 
}