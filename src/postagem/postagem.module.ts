import { Module } from "@nestjs/common";
import { Postagem } from "./entities/postagem.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaModule } from "../tema/tema.module";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    controllers: [PostagemController],
    providers: [PostagemService],
})
export class PostagemModule { }

//Instancia o módulo de Postagem, importando o TypeOrmModule para a entidade Postagem e o módulo de Tema, e registrando o controlador
//  e serviço de postagem.

//O módulo de Postagem é responsável por gerenciar as operações relacionadas às postagens do blog, como criação, leitura, atualização e exclusão.
//  Ele importa o TypeOrmModule para a entidade Postagem, permitindo a interação com o banco de dados, e também importa o TemaModule para associar
//  as postagens aos temas. O controlador e serviço de postagem são registrados para lidar com as requisições HTTP e a lógica de negócios 
// relacionada às postagens.

//O módulo de Postagem é uma parte fundamental do sistema, pois é responsável por gerenciar as postagens do blog e garantir que elas
//  estejam associadas aos temas corretos. 

// Ele também facilita a comunicação entre o banco de dados e as camadas de serviço e controlador,
// permitindo a manipulação eficiente das postagens.