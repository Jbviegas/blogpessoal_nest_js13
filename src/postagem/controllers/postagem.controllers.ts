import { Controller, Get, HttpStatus, ParseIntPipe, Param, HttpCode, Post, Body, HttpException, Delete, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult } from "typeorm";



@Controller("/postagens")//Define a rota base para as postagens, permitindo que as requisições sejam direcionadas para este controlador.
export class PostagemController {
    postagemRepository: any;

    constructor(
        private readonly postagemService: PostagemService,
        /*  Injeta o serviço de postagem no controlador, permitindo que as operações relacionadas às postagens sejam realizadas através do
             serviço. */
    ) { }

    

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        //Define um endpoint GET para buscar todas as postagens, retornando um array de objetos Postagem.
        return this.postagemService.findAll();// Lógica para buscar todas as postagens / Select * from tb_postagens
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
