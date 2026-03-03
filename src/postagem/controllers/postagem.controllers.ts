import { Controller, Get } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";



@Controller("/postagens")//Define a rota base para as postagens, permitindo que as requisições sejam direcionadas para este controlador.
export class PostagemController {

    constructor(
        private readonly postagemService: PostagemService,
        /*  Injeta o serviço de postagem no controlador, permitindo que as operações relacionadas às postagens sejam realizadas através do
             serviço. */
    ) { }

    @Get()
    findAll(): Promise<Postagem[]> {
        //Define um endpoint GET para buscar todas as postagens, retornando um array de objetos Postagem.
        return this.postagemService.findAll();// Lógica para buscar todas as postagens / Select * from tb_postagens
    }
}