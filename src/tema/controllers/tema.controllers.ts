import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";

import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";

//Define a rota base para os temas, permitindo que as requisições sejam direcionadas para este controlador
@Controller('/temas')
export class TemaController {//Define a classe de controlador para os temas, responsável por lidar com as requisições HTTP relacionadas 
// às postagens.


    //Construtor do tipo associação, onde a classe de serviço de tema(TemaService) é injetada no controlador,
    //  permitindo que as operações relacionadas às postagens sejam realizadas através do serviço(TemaService).
    constructor(private readonly temaService: TemaService) {}
    // Injeta o serviço de tema no controlador, permitindo que as operações relacionadas aos temas sejam realizadas através do serviço.

    @Get()//Define um manipulador de rota para requisições GET na rota base (/temas), que é usada para buscar todos os temas disponíveis
    //  no banco de dados.
    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    findAll(): Promise<Tema[]> {//O método findAll() é um método que retorna uma Promise contendo um array de objetos do tipo Tema.
    //  Ele é usado para buscar todos os temas disponíveis no banco de dados.

        return this.temaService.findAll();
        // O método findAll() do serviço de tema é chamado para buscar todos os temas disponíveis no banco de dados,
        //  e o resultado é retornado como resposta da rota.
    }

    @Get("/:id")//Define um manipulador de rota para requisições GET na rota /temas/:id, onde :id é um parâmetro de rota que representa o ID
    //  do tema a ser buscado.

    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    findById(@Param("id", ParseIntPipe) id: number): Promise<Tema>{
    //O método findById() é um método que recebe um ID do tipo number como parâmetro e retorna uma Promise contendo um objeto do tipo Tema.
    //  Ele é usado para buscar um tema específico no banco de dados com base no ID fornecido.
    
    //Param("id", ParseIntPipe) é um decorador usado para extrair o valor do parâmetro de rota "id" e convertê-lo para um número inteiro
    //  usando o ParseIntPipe.

        return this.temaService.findById(id);
        // O método findById() do serviço de tema é chamado para buscar um tema específico no banco de dados com base no ID fornecido,
        //  e o resultado é retornado como resposta da rota.
    }
    
    @Get("/descricao/:descricao")//Define um manipulador de rota para requisições GET na rota /temas/descricao/:descricao, onde :descricao é um parâmetro de rota que representa a descrição
    //  do tema a ser buscado.
    
    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    findAllByDescricao(@Param("descricao") descricao: string): Promise<Tema[]>{
    //O método findAllByDescricao() é um método que recebe uma descrição do tipo string como parâmetro e retorna uma Promise contendo um array 
    // de objetos do tipo Tema.
    //  Ele é usado para buscar todos os temas disponíveis no banco de dados que correspondam à descrição fornecida.
    
    //Param("descricao") é um decorador usado para extrair o valor do parâmetro de rota "descricao" e usá-lo como argumento
    //  para a busca dos temas.

        return this.temaService.findAllByDescricao(descricao);
        // O método findAllByDescricao() do serviço de tema é chamado para buscar todos os temas disponíveis no banco de dados que correspondam à descrição fornecida,
        //  e o resultado é retornado como resposta da rota.
    }   


    @Post()//Define um manipulador de rota para requisições POST na rota base (/temas), que é usada para criar um novo tema no banco de dados.

    @HttpCode(HttpStatus.CREATED)//Define o código de status HTTP 201 (Created) para a resposta dessa rota, indicando que um novo recurso
    //  foi criado com sucesso.

    create(@Body() tema: Tema): Promise<Tema>{
    //O método create() é um método que recebe um objeto do tipo Tema como parâmetro e retorna uma Promise contendo um objeto do tipo Tema.
    //  Ele é usado para criar um novo tema no banco de dados com base nos dados fornecidos no corpo da requisição.

    //Body() é um decorador usado para extrair os dados do corpo da requisição e usá-los como argumento para a criação do novo tema.

        return this.temaService.create(tema);
        // O método create() do serviço de tema é chamado para criar um novo tema no banco de dados com base nos dados fornecidos
        //  no corpo da requisição, e o resultado é retornado como resposta da rota.
    }  

    @Put()//Define um manipulador de rota para requisições PUT na rota base (/temas), que é usada para atualizar um tema existente no banco de dados.
    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    update(@Body() tema: Tema): Promise<Tema>{
    //O método update() é um método que recebe um objeto do tipo Tema como parâmetro e retorna uma Promise contendo um objeto do tipo Tema.
    //  Ele é usado para atualizar um tema existente no banco de dados com base nos dados fornecidos no corpo da requisição.    
    //Body() é um decorador usado para extrair os dados do corpo da requisição e usá-los como argumento para a atualização do tema existente.

        return this.temaService.update(tema);
        // O método update() do serviço de tema é chamado para atualizar um tema existente no banco de dados com base nos dados fornecidos
        //  no corpo da requisição, e o resultado é retornado como resposta da rota.
    }

    @Delete("/:id")//Define um manipulador de rota para requisições DELETE na rota /temas/:id, onde :id é um parâmetro de rota 
    // que representa o ID do tema a ser deletado.  

    @HttpCode(HttpStatus.NO_CONTENT)//Define o código de status HTTP 204 (No Content) para a resposta dessa rota, indicando 
    // que a requisição foi bem-sucedida e que o recurso foi deletado com sucesso.

    delete(@Param("id", ParseIntPipe) id: number){
    //O método delete() é um método que recebe um ID do tipo number como parâmetro e não retorna nenhum valor.
    //  Ele é usado para deletar um tema específico no banco de dados com base no ID fornecido.    
    //Param("id", ParseIntPipe) é um decorador usado para extrair o valor do parâmetro de rota "id" e convertê-lo para um número inteiro
    //  usando o ParseIntPipe. 

        return this.temaService.delete(id);
        // O método delete() do serviço de tema é chamado para deletar um tema específico no banco de dados com base no ID fornecido,
        //  e o resultado é retornado como resposta da rota.
}  
}
