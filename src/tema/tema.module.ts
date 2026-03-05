import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';
import { TemaService } from './services/tema.service';
import { TemaController } from './controllers/tema.controllers';

//Decorador @Module é usado para definir um módulo no NestJS, que é uma forma de organizar o código em unidades coesas.
//  O módulo de tema é responsável por agrupar os componentes relacionados aos temas, como o serviço e o controlador.

@Module({//Configuração do módulo de tema, especificando as importações, controladores e provedores necessários para o funcionamento do módulo.


    //Importação de módulos necessários para o módulo de tema:

    imports: [TypeOrmModule.forFeature([Tema])],
    //Importa o TypeOrmModule para a entidade Tema, permitindo que o módulo de tema tenha acesso às operações de banco de dados relacionadas aos temas.



    //Registro de componentes do módulo do tema:

    controllers: [TemaController],
    //Registra o controlador de tema(TemaController), que é responsável por lidar com as requisições HTTP relacionadas aos temas.

    providers: [TemaService],
    //Registra o serviço de tema(TemaService), que é responsável por lidar com a lógica de negócios relacionada aos temas.

    exports: [TemaService]//Exporta o serviço de tema(TemaService), permitindo que ele seja usado em outros módulos, 
    // como o módulo principal da aplicação (AppModule).
})
export class TemaModule { }/*Exporta a classe do módulo de tema(TemaModule), tornando-a disponível para ser importada em outros módulos,
 como o módulo principal da aplicação (AppModule) */

