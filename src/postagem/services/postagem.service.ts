import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository, ILike, DeleteResult } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";



@Injectable()//Define a classe de serviço para as postagens, responsável por lidar com a lógica de negócios relacionada às postagens.
export class PostagemService {

    constructor(
        //Injeta o repositório de postagem, permitindo que as operações de banco de dados sejam realizadas através do TypeORM.
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,//Esse repository é basicamente uma classe pronta com métodos
        // (find(), findOne(), save(), delete(), update(), createQueryBuilder()) para executar operações SQL automáticas no banco de dados.

        private readonly temaService: TemaService//Injeta o serviço de tema, permitindo que as operações relacionadas aos temas sejam realizadas através do serviço de tema.
    ) { }



    //Métodos

    async findAll(): Promise<Postagem[]> {//O método findAll() é um método assíncrono que retorna uma Promise
        //contendo um array de objetos do tipo Postagem. Ele é usado para buscar todas as postagens disponíveis no banco de dados.
        // Select * from tb_postagens
        return this.postagemRepository.find();
    }



    async findById(id: number): Promise<Postagem> {
        // Lógica para buscar uma postagem por ID / Select * from tb_postagens where id = ?

        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            }
        });
        if (!postagem) {
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
        }
        return postagem;
    }



    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        // Lógica para buscar postagens por título / Select * from tb_postagens where titulo like '%titulo%'
        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        });
    }



    async create(postagem: Postagem): Promise<Postagem> {
        // Lógica para criar uma nova postagem / Insert into tb_postagens (titulo, conteudo) values (?, ?)

        await this.temaService.findById(postagem.tema.id);
        // Verificando se o tema associado à postagem existe antes de criar a postagem, para evitar erros de criação
        //  em postagens com temas inexistentes.

        return this.postagemRepository.save(postagem);
    }// O método save() do TypeORM é usado para salvar uma entidade no banco de dados. Ele pode ser usado tanto para criar uma nova
    //  entidade quanto para atualizar uma entidade existente, dependendo se a entidade já possui um ID ou não.

    //--------------------------------------------------------------------------------------------------------------------------------//

    // UPDATE tb_postagens SET titulo = ?, 
    // texto = ? , 
    // data = CURRENT_TIMESTAMP()
    // WHERE id = ?;
    async update(postagem: Postagem): Promise<Postagem> {//INjetando o objeto postagem para atualizar a postagem existente
        // Lógica para atualizar uma postagem existente / Update tb_postagens set titulo = ?, conteudo = ? where id = ?
        if (!postagem.id || postagem.id <= 0)//Verificando se o ID da postagem é válido, ou seja, se ele existe e é um número positivo.

            throw new HttpException("O ID da postagem é inválido!", HttpStatus.BAD_REQUEST);
        // Se o ID for inválido, lança uma exceção HTTP com status 400 (Bad Request) e uma mensagem de erro indicando que o ID da
        //  postagem é inválido.

        await
            this.findById(postagem.id);//Verificando se a postagem existe antes de tentar atualizar, para evitar erros de atualização
        //  em postagens inexistentes.

        await this.temaService.findById(postagem.tema.id);//Verificando se o tema associado à postagem existe antes de atualizar a postagem, 
        // para evitar erros de atualização

        return this.postagemRepository.save(postagem);
        // O método save() do TypeORM é usado para salvar uma entidade no banco de dados. Ele pode ser usado tanto para criar uma nova
        //  entidade quanto para atualizar uma entidade existente, dependendo se a entidade já possui um ID ou não. Neste caso, como a postagem
        //  já possui um ID válido, o método save() irá atualizar a postagem existente no banco de dados com os novos valores fornecidos.
    }



    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        // DELETE tb_postagens FROM id = ?;
        return this.postagemRepository.delete(id);

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