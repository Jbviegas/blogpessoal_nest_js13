import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";


@Injectable()//Define a classe de serviço para as postagens, responsável por lidar com a lógica de negócios relacionada às postagens.
export class PostagemService{
  

    constructor(
          //Injeta o repositório de postagem, permitindo que as operações de banco de dados sejam realizadas através do TypeORM.
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,//Esse repository é basicamente uma classe pronta com métodos
        // (find(), findOne(), save(), delete(), update(), createQueryBuilder()) para executar operações SQL automáticas no banco de dados.
    ) {}

    async findAll(): Promise<Postagem[]> {
        // Lógica para buscar todas as postagens / Select * from tb_postagens
        return this.postagemRepository.find();
    }
}

//O TypeORM cria um objeto assim: Repository<Postagem>

//Esse repository é basicamente uma classe pronta com métodos como:
/*

find()
findOne()
save()
delete()
update()
createQueryBuilder()


Quando você faz: this.postagemRepository.find()

O TypeORM traduz isso para um comando SQL: SELECT * FROM tb_postagens

Internamente o TypeORM utiliza um driver específico para o banco de dados (como mysql2 para MySQL) para se comunicar com o banco
 e executar as operações SQL necessárias, como a consulta para buscar todas as postagens.


📌 Resumo do TypeORM

Entity → Define tabela
Repository → Executa SQL automático
Driver (mysql2) → Fala com banco
Banco → Executa SQL

Ele é um ORM → Object Relational Mapper

Ele traduz:

Objeto TypeScript ↔ Tabela SQL
*/