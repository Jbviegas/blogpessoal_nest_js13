import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";



@Injectable()//Define a classe de serviço para os temas, responsável por lidar com a lógica de negócios relacionada aos temas.
export class TemaService {//O serviço é uma classe que contém métodos para realizar operações relacionadas aos temas, como criar, buscar,
  // atualizar e excluir temas. Ele atua como uma camada intermediária entre o controlador (que lida com as requisições HTTP) 
  // e o repositório (que lida com a persistência de dados no banco de dados).
  
  constructor(
   
    @InjectRepository(Tema) //Injeta o repositório de tema, permitindo que as operações de banco de dados sejam realizadas através do:
    //TypeORM(que é um ORM - Object-Relational Mapping - que facilita a interação com o banco de dados,
    //  convertendo objetos JavaScript em comandos SQL). 
   

    private temaRepository: Repository<Tema>//Esse repository é basicamente uma classe pronta com métodos
    // (find(), findOne(), save(), delete(), update(), createQueryBuilder()) para executar operações SQL automáticas no banco de dados.
  ) { }


  //Métodos


  //async é uma palavra-chave usada para definir uma função assíncrona, que é uma função que pode conter operações assíncronas,
  //  como chamadas de banco de dados ou requisições HTTP.
  async findAll(): Promise<Tema[]> {//O método findAll() é um método assíncrono que retorna uma Promise
    //contendo um array de objetos do tipo Tema. Ele é usado para buscar todos os temas disponíveis no banco de dados.
    // Select * from tb_temas

    return this.temaRepository.find();
    //O método find() do TypeORM é usado para buscar todos os registros da tabela de temas no banco de dados e retornar um array de objetos
    //do tipo Tema.

    //temaRepository é uma variavel privada que contém o repositório do tema, que é injetado(o Tema) através do construtor da classe.
    //temaRepository é a variável que contém o repositório(Repository) que contém em si o método find para fazer a busca de todos os registros
    //temaRepository instancia(chama) o método find para buscar todos os temas disponíveis no banco de dados.
  }

  async findById(id: number): Promise<Tema> {
    // O método findById() é um método assíncrono que recebe um ID do tipo number como parâmetro e retorna uma Promise
    // contendo um objeto do tipo Tema. Ele é usado para buscar um tema específico no banco de dados com base no ID fornecido.
    // Lógica para buscar um tema por ID / Select * from tb_temas where id = ?

    const tema = await this.temaRepository.findOne({
      //O método findOne() do TypeORM é usado para buscar um único registro no banco de dados com base em uma condição específica.

      //A propriedade where é usada para especificar a condição de busca, 
      // indicando que o campo id deve ser igual ao valor do parâmetro id fornecido.
      where: { id }
    });

    if (!tema) {//Se o tema não for encontrado (ou seja, se a variável tema for nula ou indefinida), uma exceção HTTP é lançada com a mensagem 
      // 'Tema não encontrado' e o status HTTP 404 (Not Found).

      throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);
    }
    return tema;//Se o tema for encontrado, ele é retornado como resultado do método.
  }

  async findAllByDescricao(descricao: string): Promise<Tema[]> {
    // O método findAllByDescricao() é um método assíncrono que recebe uma descrição do tipo string como parâmetro e retorna uma Promise
    // contendo um array de objetos do tipo Tema. Ele é usado para buscar temas no banco de dados
    // com base em uma correspondência parcial da descrição fornecida.

    // Lógica para buscar temas por descrição / Select * from tb_temas where descricao like '%descricao%'

    return this.temaRepository.find({
      //O método find() do TypeORM é usado para buscar registros no banco de dados com base em uma condição específica.

      //A propriedade where é usada para especificar a condição de busca, 
      // indicando que o campo descricao deve conter a string fornecida no parâmetro descricao.
      where: {
        descricao: ILike(`%${descricao}%`) //O operador ILike é usado para realizar uma busca case-insensitive, 
        // permitindo que a correspondência seja feita independentemente de maiúsculas ou minúsculas.
      }
    });
  }

  async create(tema: Tema): Promise<Tema> {
    // O método create() é um método assíncrono que recebe um objeto do tipo Tema como parâmetro e retorna uma Promise
    // contendo o objeto do tipo Tema criado. Ele é usado para criar um novo tema no banco de dados.
    // Lógica para criar um novo tema / Insert into tb_temas (descricao) values (?) 

    return this.temaRepository.save(tema);
    // O método save() do TypeORM é usado para salvar uma entidade no banco de dados. Ele pode ser usado tanto para criar uma nova  
    // entidade quanto para atualizar uma entidade existente, dependendo se a entidade já possui um ID ou não.
    
    
    //temaRepository é uma variavel privada que contém o repositório do tema, que é injetado(o Tema) através do construtor da classe.
    //temaRepository é a variável que contém o repositório(Repository) que contém em si o método create para criar um novo tema
    //  e o método save para salvar o tema criado no banco de dados.
  }

  async update(tema: Tema): Promise<Tema> {
    // O método update() é um método assíncrono que recebe um objeto do tipo Tema como parâmetro e retorna uma Promise
    // contendo o objeto do tipo Tema atualizado. Ele é usado para atualizar um tema existente no banco de dados.
    // Lógica para atualizar um tema / Update tb_temas set descricao = ? where id = ?

    return this.temaRepository.save(tema);
    // O método save() do TypeORM é usado para salvar uma entidade no banco de dados. Ele atualiza a entidade se ela já possui um ID.

    //temaRepository é uma variavel privada que contém o repositório do tema, que é injetado(o Tema) através do construtor da classe.
    //temaRepository é a variável que contém o repositório(Repository) que contém em si o método save para atualizar o tema existente
    //no banco de dados.
  }

  async delete(id: number): Promise<DeleteResult> {
    // O método delete() é um método assíncrono que recebe um ID do tipo number como parâmetro e retorna uma Promise
    // contendo void (sem valor). Ele é usado para excluir um tema existente no banco de dados com base no ID fornecido.
    // Lógica para excluir um tema / Delete from tb_temas where id = ?

    await this.findById(id);//Verificando se o tema existe antes de tentar excluir, para evitar erros de exclusão em temas inexistentes.
   
    return this.temaRepository.delete(id);
    
    // O método delete() do TypeORM é usado para excluir um registro do banco de dados com base no ID fornecido.  
    //temaRepository é uma variavel privada que contém o repositório do tema, que é injetado(o Tema) através do construtor da classe.
    //temaRepository é a variável que contém o repositório(Repository) que contém em si o método delete para excluir o tema existente
    //no banco de dados.
  }
    // O método delete() do TypeORM é usado para excluir um registro do banco de dados com base no ID fornecido.  
}
