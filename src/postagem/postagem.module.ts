import { Module } from "@nestjs/common";
import { Postagem } from "./entities/postagem.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controllers";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    controllers: [PostagemController],
    providers: [PostagemService],
})
export class PostagemModule { }

//Instancia o módulo de Postagem, importando o TypeOrmModule para a entidade Postagem, e registrando o controlador e serviço de postagem.