import { Controller, Get, HttpStatus, ParseIntPipe, Param, HttpCode, Post, Body, Delete, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth-guard";
import { UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


//Define a rota base para as postagens, permitindo que as requisições sejam direcionadas para este controlador
@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller("/postagens")
@ApiBearerAuth()
export class PostagemController {//Define a classe de controlador para as postagens, responsável por lidar com as requisições HTTP relacionadas 
// às postagens.


    //Construtor do tipo associação, onde a classe de serviço de postagem(PostagemService) é injetada no controlador,
    //  permitindo que as operações relacionadas às postagens sejam realizadas através do serviço(PostagemService).
    constructor(private readonly postagemService: PostagemService) {}
    // Injeta o serviço de postagem no controlador, permitindo que as operações relacionadas às postagens sejam realizadas através do serviço.

    @Get()//Define um manipulador de rota para requisições GET na rota base (/postagens), que é usada para buscar todas as postagens disponíveis
    //  no banco de dados.
    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    findAll(): Promise<Postagem[]> {//O método findAll() é um método que retorna uma Promise contendo um array de objetos do tipo Postagem.
    //  Ele é usado para buscar todas as postagens disponíveis no banco de dados.

        return this.postagemService.findAll();
        // O método findAll() do serviço de postagem é chamado para buscar todas as postagens disponíveis no banco de dados,
        //  e o resultado é retornado como resposta da rota.
    }




     @Get("/:id")
  @HttpCode(HttpStatus.OK)
  findById(@Param("id", ParseIntPipe) id: number): Promise<Postagem>{
    return this.postagemService.findById(id);
  }



  @Get("/titulo/:titulo")
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param("titulo") titulo: string): Promise<Postagem[]>{
    return this.postagemService.findAllByTitulo(titulo);
  }



  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemService.create(postagem);
  }



  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemService.update(postagem);
  }



  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param("id", ParseIntPipe) id: number){
    return this.postagemService.delete(id);
  }

}
